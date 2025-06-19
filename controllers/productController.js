
import mongoose from 'mongoose';
import Product from '../models/Product.js';

// Helper function to convert param to number
const toNumberId = (id) => {
  const numId = parseInt(id, 10);
  if (isNaN(numId)) throw new Error('Invalid product ID');
  return numId;
};

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error creating product' });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = toNumberId(req.params.id);
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by id:', error);
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const productId = toNumberId(req.params.id);
    const currentProduct = await Product.findOne({ id: productId });
    if (!currentProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const relatedProducts = await Product.find({
      id: { $ne: productId },
      $or: [
        { category: currentProduct.category },
        { brand: currentProduct.brand }
      ]
    }).limit(10);
    res.status(200).json(relatedProducts);
  } catch (error) {
    console.error('Error fetching related products:', error);
    res.status(500).json({ message: 'Server error fetching related products' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = toNumberId(req.params.id);
    const deletedProduct = await Product.findOneAndDelete({ id: productId });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error deleting product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = toNumberId(req.params.id);
    const updateData = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { id: productId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error updating product' });
  }
};

