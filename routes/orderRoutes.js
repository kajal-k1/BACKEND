
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import Order from '../models/orderModel.js';

const router = express.Router();


router.post('/create', protect, async (req, res) => {
  try {
    const { customer, items, totalAmount, paymentMethod, paymentId, status } = req.body;

    if (!customer || !items || items.length === 0 || !totalAmount || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const userId = req.user?.id || null;

    const newOrder = new Order({
      userId,
      customer,
      items,
      totalAmount,
      paymentMethod,
      paymentId,
      status,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

export default router;
