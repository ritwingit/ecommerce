import Order from '../models/order.js';


export const createOrder = async (req, res) => {
const { items, total, paymentMethod } = req.body;
const order = await Order.create({ user: req.user._id, items, total, paymentMethod });
res.json(order);
};


export const listOrders = async (req, res) => {
// admin or user-specific
if (req.user.isAdmin) {
const orders = await Order.find().populate('user');
res.json(orders);
} else {
const orders = await Order.find({ user: req.user._id }).populate('items.product');
res.json(orders);
}
};