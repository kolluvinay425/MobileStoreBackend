import express from "express";

import { filterMobiles } from "../controllers/mobile.js";

const mobileRouter = express.Router();

mobileRouter.get(
  "/mobiles",

  filterMobiles
);

export default mobileRouter;
