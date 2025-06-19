

import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRelatedProducts, // <-- Add this
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/related/:id', getRelatedProducts); // <-- Add this
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
