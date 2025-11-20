import Product from '../models/product.js';


export const listProducts = async (req, res) => {
const q = req.query.q || '';
const products = await Product.find({ title: { $regex: q, $options: 'i' } }).limit(50);
res.json(products);
};


export const getProduct = async (req, res) => {
const product = await Product.findById(req.params.id);
if (!product) return res.status(404).json({ message: 'Not found' });
res.json(product);
};


export const createProduct = async (req, res) => {
const p = await Product.create(req.body);
res.json(p);
};


export const updateProduct = async (req, res) => {
const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(p);
};


export const deleteProduct = async (req, res) => {
await Product.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted' });
};