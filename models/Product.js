
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: String,
  brand: String,
  title: String,
  price: Number,
  originalPrice: Number,
  discount: String,
  rating: Number,
  reviews: Number,
  stock: Number,
  images: [String],
  category: String,
  productType: String,
  color: String,
  size: [String],
  pattern: String,
  sleeveLength: String,
  fabric: String,
});

export default mongoose.model('Product', productSchema);




