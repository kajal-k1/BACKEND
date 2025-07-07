
import mongoose from 'mongoose';
import Product from '../models/Product.js';


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching all products:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID format' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err.message);
    res.status(500).json({ error: 'Error fetching product' });
  }
};


export const getRelatedProducts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID format' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const relatedProducts = await Product.find({
      _id: { $ne: id },            
      category: product.category,  
    }).limit(10);

    res.json(relatedProducts);
  } catch (err) {
    console.error('Error fetching related products:', err.message);
    res.status(500).json({ error: 'Failed to fetch related products' });
  }
};
