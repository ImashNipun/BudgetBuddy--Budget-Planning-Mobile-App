import mongoose from "mongoose";

const customCategorySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
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
      default:
        "data:image/png;base64,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",
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
  { timestamps: true }
);

const customCategoryModel = mongoose.model(
  "CustomCategory",
  customCategorySchema
);

export default customCategoryModel;
