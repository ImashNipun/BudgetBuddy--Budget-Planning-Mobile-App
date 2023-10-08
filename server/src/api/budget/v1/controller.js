import express from "express";
import asynchandler from "express-async-handler";
import Budget from "./models/budget.model";
import CustomCategory from "../../expense_category/v1/models/customcategory.model";
import Savings from "./models/savings.model";
import { response } from "../../../utils";

const router = express.Router();

router.post(
  "/",
  asynchandler(async (req, res) => {
    let payload = req.body;

    const existBudget = await Budget.findOne({ user_id: payload.user_id });

    if (existBudget) {
      return response({
        res,
        status: 400,
        message: "Already budget is exist for this user",
      });
    }

    if (payload.selected_categories.length == 6) {
      const budget = await Budget.create(payload);

      return response({
        res,
        status: 201,
        message: "Budget create Successfully!",
        data: budget,
      });
    } else if (payload.savings || payload.custom_category) {
      if (payload.savings) {
        const savings_payload = {
          user_id: payload.user_id,
          savings_amount: payload.savings,
        };
        const savings = await Savings.create(savings_payload);
        payload = { ...payload, savings: savings._id };
      }

      if (payload.custom_category) {
        const { category_name, description, initial_amount, remaining_amount } =
          payload.custom_category;
        const custom_c_payload = {
          user_id: payload.user_id,
          category_name,
          description,
          initial_amount,
          remaining_amount,
        };
        const categoty = await CustomCategory.create(custom_c_payload);

        payload = { ...payload, custom_category: categoty._id };
      }

      const budget = await Budget.create(payload);

      return response({
        res,
        status: 201,
        message: "Budget create Successfully!",
        data: budget,
      });
    } else {
      return response({
        res,
        status: 400,
        message:
          "You must create savings or custom category from the excess amount.",
      });
    }
  })
);

router.get(
  "/:id",
  asynchandler(async (req, res) => {
    const user_id = req.params.id;

    const existBudget = await Budget.findOne({ user_id: user_id })
      .populate({
        path: "selected_categories.category_id",
      })
      .populate("user_id")
      .populate({
        path: "custom_category",
      })
      .populate({
        path: "savings",
      });

    if (!existBudget) {
      return response({
        res,
        status: 400,
        message: "No Budget available for this user.",
        data: null,
      });
    }

    return response({
      res,
      status: 200,
      data: existBudget,
    });
  })
);

export default router;
