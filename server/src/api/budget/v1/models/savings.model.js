import mongoose from "mongoose";

const savingsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    savings_amount: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const savingsModel = mongoose.model("Savings", savingsSchema);

export default savingsModel;
