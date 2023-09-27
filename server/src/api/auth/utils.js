import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

export const hashPassword = asyncHandler(async (password) => {
  const bcryptSalt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, bcryptSalt);
});

export const compareHash = (password, hash) => {
  return bcrypt.compare(password, hash);
};