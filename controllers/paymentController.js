
import Order from '../models/orderModel.js';

export const createOrder = async (req, res) => {
  const { customer, items, totalAmount, paymentMethod, paymentId, status } = req.body;

  if (!customer || !items || !totalAmount || !paymentMethod) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const order = await Order.create({
    userId: req.user.id,
    customer,
    items,
    totalAmount,
    paymentMethod,
    paymentId,
    status: status || 'Processing',
  });

  res.json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
};
