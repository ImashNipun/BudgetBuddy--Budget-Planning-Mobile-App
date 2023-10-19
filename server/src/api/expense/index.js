import express from "express";
import expenseController from "./v1/controller"

const expense = express.Router();

expense.use("/v1/expense",expenseController);

export default expense;