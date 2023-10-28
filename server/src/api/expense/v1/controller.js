import express from "express";
import asynchandler from "express-async-handler";
import Expense from "./models/expense.model";
import Budget from "../../budget/v1/models/budget.model";
import CustomCategory from "../../expense_category/v1/models/customcategory.model";
import ExpenseCategory from "../../expense_category/v1/models/ecategory.model";
import { response } from "../../../utils";

const router = express.Router();

router.post(
  "/",
  asynchandler(async (req, res) => {
    let payload = req.body;

    const existBudget = await Budget.findOne({
      user_id: payload.user_id,
      budget_expired: false,
    });

    if (!existBudget) {
      return response({
        res,
        status: 400,
        message: "Budget don't exist!",
      });
    }

    payload.budget_id = existBudget._id;

    if (!payload.expense_category) {
      return response({
        res,
        status: 400,
        message: "There is no expense category id available!",
      });
    }

    if (payload.custom_category) {
      payload.custom_category_id = payload.expense_category;
      delete payload.expense_category;
    }

    const expense = await Expense.create(payload);

    if (!payload.user_id) {
      return response({
        res,
        status: 400,
        message: "User id doesn't exist in the payload",
      });
    }

    if (payload.custom_category) {
      if (!existBudget.custom_category) {
        return response({
          res,
          status: 400,
          message: "Category not found in the budget.!",
        });
      }

      if (
        existBudget.custom_category.toString() !== payload.custom_category_id
      ) {
        return response({
          res,
          status: 400,
          message: "Category not found in the budget.!",
        });
      }

      const customCategory = await CustomCategory.findById(
        payload.custom_category_id
      );

      if (Number(payload.expense_amount) > customCategory.remaining_amount) {
        customCategory.remaining_amount = 0;
      } else {
        customCategory.remaining_amount -= Number(payload.expense_amount);
      }

      customCategory.save();
    } else {
      const selectedCategory = existBudget.selected_categories.find(
        (category) =>
          category.category_id.toString() === payload.expense_category
      );

      if (!selectedCategory) {
        return response({
          res,
          status: 400,
          message: "Category not found.!",
        });
      }

      if (Number(payload.expense_amount) > selectedCategory.remaining_amount) {
        selectedCategory.remaining_amount = 0;
      } else {
        selectedCategory.remaining_amount -= Number(payload.expense_amount);
      }
    }

    await existBudget.save();

    return response({
      res,
      status: 201,
      message: "Expense add successfully!",
    });
  })
);

router.get(
  "/user/:id",
  asynchandler(async (req, res) => {
    const user_id = req.params.id;

    const expenses = await Expense.find({ user_id: user_id })
      .populate({ path: "expense_category" })
      .populate({ path: "custom_category_id" });

    return response({
      res,
      status: 200,
      data: expenses,
    });
  })
);

router.get(
  "/single-category",
  asynchandler(async (req, res) => {
    const user_id = req.query.uid;
    const category_id = req.query.cid;
    const is_custom_category = req.query.is_custom_category;

    const existBudget = await Budget.findOne({
      user_id: user_id,
      budget_expired: false,
    });

    if (is_custom_category == "false") {
      console.log("gygy");
      const expenses = await Expense.find({
        user_id: user_id,
        expense_category: category_id,
        budget_id: existBudget._id,
      }).populate({ path: "expense_category" });

      return response({
        res,
        status: 200,
        data: expenses,
      });
    } else {
      const expenses = await Expense.find({
        user_id: user_id,
        custom_category_id: category_id,
        budget_id: existBudget._id,
      }).populate({ path: "custom_category_id" });

      return response({
        res,
        status: 200,
        data: expenses,
      });
    }
  })
);

export default router;
