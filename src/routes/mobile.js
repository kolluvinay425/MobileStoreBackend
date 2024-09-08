import express from "express";

import { scrapeMobileData } from "../controllers/mobile.js";

const mobileRouter = express.Router();

mobileRouter.get(
  "/mobiles",

  scrapeMobileData
);

export default mobileRouter;
