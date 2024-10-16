import express from "express";

import { scrapeBikeData } from "../controllers/bike.js";

const bikeRouter = express.Router();

bikeRouter.post(
  "/bikes",

  scrapeBikeData
);

export default bikeRouter;
