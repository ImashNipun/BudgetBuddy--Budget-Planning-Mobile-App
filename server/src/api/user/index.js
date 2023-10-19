import express from "express";
import userController from "./v1/controller"

const user = express.Router();

user.use("/v1/user",userController);

export default user;