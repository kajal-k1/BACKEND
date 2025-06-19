import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    phone: String,
  },
  items: [
    {
      id: Number,
      name: String,
      qty: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  paymentMethod: String,
  paymentId: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Order = mongoose.model('Order', orderSchema);
export default Order;
