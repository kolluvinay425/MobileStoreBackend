// models/Mobile.js
import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
  brand: String,
  model: String,
  price: String,
  specs: Object,
});

const Mobile = mongoose.model("Mobile", mobileSchema);

export default Mobile;
