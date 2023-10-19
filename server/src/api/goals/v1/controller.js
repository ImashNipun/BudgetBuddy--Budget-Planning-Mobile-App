import express from "express";
import asynchandler from "express-async-handler";
import Goals from "./models/goals.model";
import GoalAmount from "./models/goalAmount.model";
import Savings from "../../budget/v1/models/savings.model";
import { response } from "../../../utils";

const router = express.Router();

router.post(
  "/add-goal",
  asynchandler(async (req, res) => {
    const payload = req.body;
    const user_id = payload.user_id;

    const existingGoalsCount = await Goals.countDocuments({
      user_id,
      goal_completed: false,
    });

    if (existingGoalsCount >= 3) {
      return response({
        res,
        status: 400,
        message: "User has reached the limit of 3 goals!",
      });
    }

    const goal = await Goals.create(payload);

    return response({
      res,
      status: 201,
      message: "Goal add successfully!",
    });
  })
);

router.post(
  "/add-goal-amount",
  asynchandler(async (req, res) => {
    const { userId, amount } = req.body;

    const incompleteGoals = await Goals.find({
      user_id: userId,
      goal_completed: false,
    });

    if (!incompleteGoals || incompleteGoals.length === 0) {
      await Savings.create({ user_id: userId, savings_amount: Number(amount) });
      res.json({ message: "Amount added to savings" });
      return;
    }

    let remainingAmount = amount;

    const equalShare = remainingAmount / incompleteGoals.length;

    for (const goal of incompleteGoals) {
      const allocatedAmounts = await GoalAmount.find({ goal_id: goal._id });
      const totalAllocatedAmount = allocatedAmounts.reduce(
        (acc, goalAmount) => acc + goalAmount.amount,
        0
      );

      const update_goal = await Goals.findById(goal._id);

      const necessaryAmount = goal.target_amount - totalAllocatedAmount;
      let amount_need_to_add = 0;

      if (necessaryAmount == 0) {
        update_goal.goal_completed = true;
      } else {
        if (necessaryAmount < equalShare) {
          amount_need_to_add = necessaryAmount;
          remainingAmount += equalShare - necessaryAmount;
        }

        amount_need_to_add = equalShare;
      }

      await GoalAmount.create({
        goal_id: goal._id,
        amount: amount_need_to_add,
      });

      const re_get_allocated_amount = await GoalAmount.find({
        goal_id: goal._id,
      });
      const re_totalAllocatedAmount = re_get_allocated_amount.reduce(
        (acc, goalAmount) => acc + goalAmount.amount,
        0
      );

      if (re_totalAllocatedAmount == goal.target_amount) {
        update_goal.goal_completed = true;
      }

      update_goal.save();

      remainingAmount -= amount_need_to_add;
    }

    if (remainingAmount != 0) {
      await Savings.create({
        user_id: userId,
        savings_amount: Number(remainingAmount),
      });
      res.json({ message: "Amount added to savings" });
      return;
    }
    return response({
      res,
      status: 200,
      message: "Goal amount add successfully",
    });
  })
);

router.get(
  "/:id",
  asynchandler(async (req, res) => {
    const user_id = req.params.id;

    const incompleteGoals = await Goals.find({
      user_id: user_id,
      goal_completed: false,
    });

    return response({
      res,
      status: 200,
      data: incompleteGoals,
    });
  })
);

router.get(
  "/goal-amount/:id",
  asynchandler(async (req, res) => {
    const goal_id = req.params.id;

    const goal_amount = await GoalAmount.find({
      goal_id,
    });

    return response({
      res,
      status: 200,
      data: goal_amount,
    });
  })
);

export default router;
