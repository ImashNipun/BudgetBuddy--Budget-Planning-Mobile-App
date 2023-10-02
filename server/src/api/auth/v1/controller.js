import express from "express";
import { response } from "../../../utils";
import asyncHandler from "express-async-handler";
import { hashPassword, compareHash } from "../utils";
import User from "../../user/v1/models/user.model";
import jwt from "jsonwebtoken";
import config from "../../../config";

const route = express.Router();

route.post(
  "/register",
  asyncHandler(async (req, res) => {
    const user_data = req.body;
    console.log(req.body);
    const exist_user = await User.findOne({ email: user_data.email });

    if (exist_user) {
      return response({
        res,
        status: 400,
        message: "User is already exist with this email",
      });
    }

    console.log(user_data);

    user_data.password = await hashPassword(user_data.password);

    const new_user = await User.create(user_data);

    return response({
      res,
      status: 201,
      message: "New user created successfully!",
      data: new_user,
    });
  })
);

route.post(
  "/login",
  asyncHandler(async (req, res) => {
    const user = req.body;
    const existUser = await User.findOne({ email: user.email }).lean();

    if (!existUser) {
      return response({
        res,
        status: 401,
        message: "No user exist with this email",
      });
    }

    const isValidPassword = await compareHash(
      user.password,
      existUser.password
    );

    if (!isValidPassword) {
      throw httpError(401, "Invalid password");
    }

    ["password"].forEach((key) => delete existUser[key]);
    const accesstoken = jwt.sign(user, config.ACCESS_TOKEN_SECRET, {
      expiresIn: config.ACCESS_TOKEN_EXPIRY,
    });

    return response({
      res,
      message: "Logged in successfully!",
      data: { ...existUser, "token":accesstoken },
    });
  })
);

export default route;
