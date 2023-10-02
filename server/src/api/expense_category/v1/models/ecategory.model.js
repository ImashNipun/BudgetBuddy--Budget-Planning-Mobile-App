import mongoose from "mongoose";

const expenseCategorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const expenseCategoryModel = mongoose.model(
  "ExpenseCategory",
  expenseCategorySchema
);

export default expenseCategoryModel;
