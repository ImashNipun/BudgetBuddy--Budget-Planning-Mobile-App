import mongoose from "mongoose";

const goalAmountSchema = new mongoose.Schema(
  {
    goal_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goals",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const goalAmountModel = mongoose.model("GoalsAmount", goalAmountSchema);

export default goalAmountModel;