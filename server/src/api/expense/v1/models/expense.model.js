import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    expense_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExpenseCategory",
    },
    custom_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomCategory",
    },
    expense_name: {
      type: String,
      required: true,
    },
    expense_amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    custom_category: {
      type: Boolean,
      required: true,
    },
    bill_image: {
      type: String,
    },
    expense_date: {
      type: String,
      required: true,
    },
    expense_time: {
      type: String,
      required: true,
    },
    budget_extended: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const expenseModel = mongoose.model("Expenses", expenseSchema);

export default expenseModel;
