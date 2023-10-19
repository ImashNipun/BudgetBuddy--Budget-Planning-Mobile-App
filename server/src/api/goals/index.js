import express from "express";
import GoalsController from "./v1/controller"

const goals = express.Router();

goals.use("/v1/goals",GoalsController);

export default goals;