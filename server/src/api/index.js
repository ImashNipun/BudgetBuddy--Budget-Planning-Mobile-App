import express from "express"
import auth from "./auth"

const route = express.Router();

route.use(auth);

export default route;