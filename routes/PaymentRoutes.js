
// routes/paymentRoutes.js
import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    console.log('🔍 Incoming amount:', amount);
    console.log('🔑 Razorpay Key:', process.env.RAZORPAY_KEY_ID);

    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    const options = {
      amount: Math.floor(amount),
      currency: 'INR',
      receipt: 'receipt_order_' + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('❌ Razorpay order creation failed:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});


// VERIFY PAYMENT
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Payment verification failed:', error.message);
    res.status(500).json({ error: 'Payment verification error' });
  }
});

export default router;
