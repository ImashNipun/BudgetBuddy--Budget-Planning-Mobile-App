import express from "express";
import categoryController from "./v1/controller"

const category = express.Router();

category.use("/v1/category",categoryController);

export default category;