import express from "express";
import asynchandler from "express-async-handler";
import Tips from "./models/tips.model";
import { response } from "../../../utils";

const router = express.Router();

// Create a new tip
router.post(
  "/",
  asynchandler(async (req, res) => {
    const payload = req.body;

    const tip = await Tips.create(payload);

    response({
      res,
      status: 201,
      message: "Tip created Successfully!",
      data: tip,
    });
  })
);

// Get all tips
router.get(
  "/",
  asynchandler(async (req, res) => {
    const tips = await Tips.find().lean();

    response({
      res,
      data: tips,
    });
  })
);



// Get a single tip by ID
// Get a single tip by mainTitle where shown is false
router.get(
    "/title/:mainTitle",
    asynchandler(async (req, res) => {
      const title = req.params.mainTitle;
  
      // Find one tip where mainTitle matches and shown is false
      const tip = await Tips.findOne({ mainTitle: title, shown: false }).lean();
      if (!tip) {
        return response({
          res,
          status: 404,
          message: "Tip not found or already shown!",
        });
      }
  
      // Update shown to true and set the shownDate to now
      await Tips.updateOne({ _id: tip._id }, { shown: true, shownDate: Date.now() });
  
      response({
        res,
        data: tip,
      });
    })
  );
  
  // Update a tip by ID
  router.put(
    "/:id",
    asynchandler(async (req, res) => {
      const tipId = req.params.id;
      const payload = req.body;
  
      const tip = await Tips.findByIdAndUpdate(tipId, payload, { new: true }).lean();
      if (!tip) {
        return response({
          res,
          status: 404,
          message: "Tip not found!",
        });
      }
  
      response({
        res,
        message: "Tip updated successfully!",
        data: tip,
      });
    })
  );
  
  // Delete a tip by ID
  router.delete(
    "/:id",
    asynchandler(async (req, res) => {
      const tipId = req.params.id;
      
      const result = await Tips.findByIdAndDelete(tipId);
      if (!result) {
        return response({
          res,
          status: 404,
          message: "Tip not found!",
        });
      }
  
      response({
        res,
        message: "Tip deleted successfully!",
      });
    })
  );

//   get all shown data 
  router.get(
    "/shown",
    asynchandler(async (req, res) => {
      const tips = await Tips.find({ shown: true }).lean();
  
      response({
        res,
        data: tips,
      });
    })
  );

export default router;