import express from "express";
import auth from "./auth";
import category from "./expense_category";
import budget from "./budget";
import expense from "./expense";
import goals from "./goals";
import user from "./user";
import notification from "./notification";

const route = express.Router();

route.use(auth);
route.use(category);
route.use(budget);
route.use(expense);
route.use(goals);
route.use(user);
route.use(notification);

export default route;
