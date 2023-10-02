import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    budget_amount: {
      type: Number,
      required: true,
    },
    selected_categories: [
      {
        category_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ExpenseCategory",
          required: true,
        },
        initial_amount: {
          type: Number,
          required: true,
        },
        remaining_amount: {
          type: Number,
          required: true,
        },
      },
    ],
    custom_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomCategory",
    },
    savings:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Savings",
    },
    budget_renew_date: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const budgetModel = mongoose.model("Budget", budgetSchema);

export default budgetModel;
