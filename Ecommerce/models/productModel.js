import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: Number, // manual auto-increment
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  imageUrl: String,
  stock: { type: Number, default: 0 }
});

export default mongoose.model('Product', productSchema);