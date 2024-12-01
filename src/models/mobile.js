// models/Mobile.js
import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
  brand: String,
  model: String,
  price: String,
  specs: Object,
  image: String,
  processor: Array,
  ram: Array,
  storage: Array,
  battery: Array,
  camera: Array,
  screenSize: Array,
  operatingSystem: Array,
  releaseDate: Array,
  color: String,
  shortDescription: String,
  longDescription: String,
});

const Mobile = mongoose.model("Mobile", mobileSchema);

export default Mobile;
