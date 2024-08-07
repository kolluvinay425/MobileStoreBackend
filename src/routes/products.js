import express from "express";

import { getRestaurants } from "../Controllers/Products.js";

const productRouter = express.Router();

productRouter.get(
  "/restaurants",

  getRestaurants
);

export default productRouter;
