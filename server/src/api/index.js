import express from "express"
import auth from "./auth"
import category from "./expense_category"
import budget from "./budget"

const route = express.Router();

route.use(auth);
route.use(category);
route.use(budget);

export default route;