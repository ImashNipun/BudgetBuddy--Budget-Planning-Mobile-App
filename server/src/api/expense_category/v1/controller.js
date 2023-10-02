import express from "express";
import asynchandler from "express-async-handler";
import ECategory from "./models/ecategory.model";
import { response } from "../../../utils";

const router = express.Router();

router.post(
  "/",
  asynchandler(async (req, res) => {
    const payload = req.body;

    const categoty = await ECategory.create(payload);

    response({
      res,
      status: 201,
      message: "Category create Successfully!",
      data:categoty,
    });
  })
);

router.get(
  "/",
  asynchandler(async (req, res) => {

    const categoty = await ECategory.find().lean();

    response({
      res,
      data:categoty,
    });
  })
);

export default router;