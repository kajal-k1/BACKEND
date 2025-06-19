






 import mongoose from 'mongoose';

 const { Schema, model } = mongoose;

 const productSchema = new Schema({
   id: {
    type: Number,
     required: true,
     unique: true
   },
   title: {
     type: String,
     required: true,
     trim: true,
     minlength: [3, 'Title must be at least 3 characters long'],    maxlength: [100, 'Title cannot exceed 100 characters']
  },
   brand: {
     type: String,
     required: true,
     minlength: [2, 'Brand must be at least 2 characters long'],
     maxlength: [50, 'Brand cannot exceed 50 characters']
   },
   category: {
     type: String,
     required: true
   },
   productType: {
     type: String,
     required: true
   },
   colour: {
     type: String
   },
   sizes: {
     type: [String],
     enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
     default: []
   },
   price: {
     type: Number,
     required: true,
     min: [0, 'Price must be a positive number']
   },
   originalPrice: {
     type: Number,
     required: true,
     min: [0, 'Original price must be a positive number']
   },
   discount: {
     type: Number,
     min: [0, 'Discount cannot be negative'],
     max: [100, 'Discount cannot exceed 100']
   },
   rating: {
     type: Number,
     min: [0, 'Rating cannot be less than 0'],
     max: [5, 'Rating cannot exceed 5']
   },
   reviews: {
     type: Number,
     default: 0
   },
   images: 
     {
       type:[String],
       required: true,
     },
  
   showPriceDrop: {
     type: Boolean,
     default: false
   },
   limitedStock: {
     type: Boolean,
     default: false
   },
   createdAt: {
     type: Date,
     default: Date.now
   }
 });

 
 const Product = model('Product', productSchema);
 
 export default Product;
