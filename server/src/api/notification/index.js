import express from "express";
import TipController from "./v1/controller"

const tips = express.Router();

tips.use("/v1/notification",TipController);

export default tips;