import asyncHandler from "express-async-handler";
import HttpError from "http-errors";
import jwt from "jsonwebtoken";
import config from "../config";
const whiteListedRoutes = [
  "/v1/auth/register/",
  "/v1/auth/login/",
];

export const authenticator = asyncHandler(async function authenticator(
  req,
  _res,
  next
) {
  if (whiteListedRoutes.find((route) => req.path.match(new RegExp(route)))) {
    next();
  } else {
    const token = req.headers.authorization
      ?.replace("Bearer ", "")
      .replace("null", "");

    if (!token) {
      throw HttpError(401, "Bearer token not found");
    }

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, function (error, decode) {
      if (error) throw HttpError(403, "Fobidden");

      next();
    });
  }
});