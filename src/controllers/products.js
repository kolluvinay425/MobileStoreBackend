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
    const brands = await Mobile.distinct("brand");
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: "Error fetching brands" });
  }
};
export { getRestaurants, getBrands };
