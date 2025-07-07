
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: Number,
      selectedSize: String,
    },
  ],
  totalAmount: Number,
  paymentMethod: String,
  paymentId: String,
  status: { type: String, default: 'Processing' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);

