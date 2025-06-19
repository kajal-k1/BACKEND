

 import Order from '../models/Order.js';


 export const createOrder = async (req, res) => {
   try {
     const {
       userId,
       customer,
       items,
       totalAmount,
       paymentMethod,
       paymentId,
       status
     } = req.body;

     if (!userId || !customer || !items || !totalAmount) {
       return res.status(400).json({ error: 'Missing required fields' });
     }

     const newOrder = new Order({
       userId,
       customer,
       items,
       totalAmount,
       paymentMethod,
       paymentId,
       status
     });

     await newOrder.save();
     res.status(201).json(newOrder);
   } catch (err) {
     console.error(" Failed to create order:", err);
     res.status(500).json({ error: 'Failed to place order' });
   }
 };


 export const getUserOrders = async (req, res) => {
   try {
     const { userId } = req.params;
     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
     res.json(orders);
   } catch (err) {
     console.error("Failed to fetch orders:", err);
     res.status(500).json({ error: 'Failed to fetch orders' });
   }
 };

