import express from 'express';
import { createOrder, listOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';


const router = express.Router();
router.post('/', protect, createOrder);
router.get('/', protect, listOrders);
export default router;