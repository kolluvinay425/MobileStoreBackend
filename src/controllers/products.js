// routes/restaurants.js
import express from "express";
import Restaurant from "../models/products.js";

const router = express.Router();

// GET route to fetch all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getRestaurants };
