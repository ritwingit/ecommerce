import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: Number,
  userId: Number,
  items: [{
    productId: Number,
    quantity: Number
  }],
  total: Number,
  status: { type: String, default: 'Pending' }
});