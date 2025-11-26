import mongoose from 'mongoose';

// Shipping address structure
const ShippingAddressSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    line: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  { _id: false }
);

// One item in the order
const OrderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

// Main order schema
const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [OrderItemSchema], // array of items
    total: { type: Number, required: true },
    paymentMethod: { type: String, default: "COD" },
    shippingAddress: ShippingAddressSchema,
    status: { type: String, default: "Processing" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
