// routes/restaurants.js
import express from "express";
import Restaurant from "../models/products.js";
import Mobile from "../models/mobile.js";

const router = express.Router();

// GET route to fetch all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Mobile.find().limit(10);

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrands = async (req, res) => {
  try {
    const brandsData = await Mobile.aggregate([
      { $group: { _id: "$brand", brandImage: { $first: "$brandImage" } } },
      { $project: { _id: 0, brand: "$_id", brandImage: 1 } },
      { $sort: { brand: 1 } },
    ]);
    res.json(brandsData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching brand data" });
  }
};
export { getRestaurants, getBrands };
