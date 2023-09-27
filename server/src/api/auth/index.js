import express from "express"
import authController from "./v1/controller"

const auth = express.Router();

auth.use("/v1/auth",authController);

export default auth;