// models/Restaurant.js
import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  date: Date,
  grade: String,
  score: Number,
});

const addressSchema = new mongoose.Schema({
  building: String,
  coord: [Number],
  street: String,
  zipcode: String,
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  borough: String,
  address: addressSchema,
  grades: [gradeSchema],
  restaurant_id: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
