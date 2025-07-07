
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  selectedSize: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  image: String,
  title: String,
  brand: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
