import express from 'express';
import { addProductReview } from "../controllers/productController.js";
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';


const router = express.Router();
router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.post("/:id/reviews", protect, addProductReview);

export default router;