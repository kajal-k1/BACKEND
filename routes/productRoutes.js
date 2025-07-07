import express from 'express';
import { getAllProducts, getProductById, getRelatedProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/related/:id', getRelatedProducts); 

export default router;

