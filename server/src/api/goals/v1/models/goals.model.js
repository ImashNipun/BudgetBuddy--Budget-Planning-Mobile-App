import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    goal_name: {
      type: String,
      required: true,
    },
    target_amount: {
      type: Number,
      required: true,
    },
    goal_end_date: {
      type: Date,
      required: true,
    },
    goal_completed: {
      type: Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const goalsModel = mongoose.model("Goals", goalSchema);

export default goalsModel;
