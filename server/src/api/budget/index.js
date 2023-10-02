import express from "express";
import budgetController from "./v1/controller"

const budget = express.Router();

budget.use("/v1/budget",budgetController);

export default budget;