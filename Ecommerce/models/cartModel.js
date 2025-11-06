import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: Number,
  items: [{
    productId: Number,
    quantity: Number
  }]
});