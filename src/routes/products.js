import express from "express";

import { getRestaurants } from "../controllers/products.js";

const productRouter = express.Router();

productRouter.get(
  "/restaurants",

  getRestaurants
);

export default productRouter;
