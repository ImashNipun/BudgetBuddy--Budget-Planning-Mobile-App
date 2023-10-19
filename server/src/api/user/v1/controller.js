import express from "express";
import asynchandler from "express-async-handler";
import User from "./models/user.model"
import { response } from "../../../utils";

const router = express.Router();

router.get(
    "/:id",
    asynchandler(async (req, res) => {
      const user_id = req.params.id;
  
      const existUser = await User.findById(user_id);
  
      return response({
        res,
        status: 200,
        data: existUser,
      });
    })
  );

  export default router;