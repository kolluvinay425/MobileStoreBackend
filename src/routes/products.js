import express from "express";

import { getBrands, getRestaurants } from "../controllers/products.js";

const productRouter = express.Router();

productRouter.get(
  "/restaurants",

  getRestaurants
);

productRouter.get(
  "/brands",

  getBrands
);
export default productRouter;
