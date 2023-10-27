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

    const existBudget = await Budget.findOne({
      user_id: user_id,
      budget_expired: false,
    })
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

router.post(
  "/renew",
  asynchandler(async (req, res) => {
    const { user_id, next_budget_renew_date, amount, exces_amount } = req.body;

    const existBudget = await Budget.findOne({
      user_id: user_id,
      budget_expired: false,
    })
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

    if (exces_amount) {
      const savings_payload = {
        user_id: user_id,
        savings_amount: exces_amount,
      };
      const savings = await Savings.create(savings_payload);
    }

    let payload = {
      user_id,
      budget_amount: amount,
      budget_renew_date: existBudget.budget_renew_date,
      next_budget_renew_date,
    };

    function updateCategoryAmounts(categories, amount) {
      const updatedCategories = categories.map((category) => {
        const updatedCategory = {
          initial_amount: (amount * category.category_id.percentage) / 100,
          remaining_amount: (amount * category.category_id.percentage) / 100,
          category_id: category.category_id._id,
        };

        return updatedCategory;
      });

      return updatedCategories;
    }

    const updatedCategories = updateCategoryAmounts(
      existBudget.selected_categories,
      amount
    );

    payload = { ...payload, selected_categories: updatedCategories };

    let category_total_amount = 0;

    updatedCategories.map((cat) => {
      category_total_amount += cat.initial_amount;
    });

    const remaining_amount = amount - category_total_amount;

    if (remaining_amount > 0) {
      if (existBudget.custom_category) {
        const new_custom_cat = {
          user_id: existBudget.custom_category.user_id,
          category_name: existBudget.custom_category.category_name,
          description: existBudget.custom_category.description,
          icon: existBudget.custom_category.icon,
          initial_amount: remaining_amount,
          remaining_amount: remaining_amount,
        };

        const categoty = await CustomCategory.create(new_custom_cat);
        payload = { ...payload, custom_category: categoty._id };
      } else if (existBudget.savings) {
        const savings_payload = {
          user_id: user_id,
          savings_amount: remaining_amount,
        };
        const savings = await Savings.create(savings_payload);
        payload = { ...payload, savings: savings._id };
      }
    }

    existBudget.budget_expired = true;
    existBudget.save();

    const budget = await Budget.create(payload);

    res.status(200).json(payload);
  })
);

router.post(
  "/amount-share/:id",
  asynchandler(async (req, res) => {
    const user_id = req.params.id;
    const {
      category_share_to,
      share_amount,
      from_is_custom_category,
      category_share_from,
    } = req.body;

    const existBudget = await Budget.findOne({
      user_id: user_id,
      budget_expired: false,
    })
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

    if (from_is_custom_category) {
      const customCategory = await CustomCategory.findById(category_share_from);

      customCategory.remaining_amount -= share_amount;

      await customCategory.save();

      existBudget?.selected_categories.map((category) => {
        if (category.category_id._id.toString() == category_share_to) {
          category.remaining_amount += share_amount;
          category.initial_amount += share_amount;
        }
      });
    } else {
      if (existBudget.custom_category) {
        if (existBudget.custom_category._id.toString() == category_share_to) {
          const customCategory = await CustomCategory.findById(
            category_share_to
          );

          customCategory.remaining_amount += share_amount;
          customCategory.initial_amount += share_amount;

          existBudget?.selected_categories.map((category) => {
            if (category.category_id._id.toString() == category_share_from) {
              category.remaining_amount -= share_amount;
            }
          });

          await customCategory.save();
        } else {
          existBudget?.selected_categories.map((category) => {
            if (category.category_id._id.toString() == category_share_to) {
              category.remaining_amount += share_amount;
              category.initial_amount += share_amount;
             
            }
          });

          existBudget?.selected_categories.map((category) => {
            if (category.category_id._id.toString() == category_share_from) {
              category.remaining_amount -= share_amount;
              
            }
          });
        }
      }
    }

    await existBudget.save();

    return response({
      res,
      status: 200,
      message: "Budget updated Successfully!",
    });
  })
);

router.get(
  "/all-budgets/:id",
  asynchandler(async (req, res) => {
    const user_id = req.params.id;

    const existBudget = await Budget.find({
      user_id: user_id,
    })
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

    return response({
      res,
      status: 200,
      data: existBudget,
    });
  })
);

router.get(
  "/all-savings/:id",
  asynchandler(async (req, res) => {
    const user_id = req.params.id;

    const savings = await Savings.find({
      user_id: user_id,
    });

    return response({
      res,
      status: 200,
      data: savings,
    });
  })
);

export default router;
