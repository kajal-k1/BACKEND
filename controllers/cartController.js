

import mongoose from 'mongoose';
import Cart from '../models/Cart.js';


export const addToCart = async (req, res) => {
  const userId = req.user.id;
  let {
    productId,
    selectedSize,
    quantity,
    image,
    title,
    brand,
    price,
    originalPrice,
    discount,
  } = req.body;

  try {
   
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid productId' });
    }
    productId = new mongoose.Types.ObjectId(productId);

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId.equals(productId) && item.selectedSize === selectedSize
    );

    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      cart.items.push({
        productId,
        selectedSize,
        quantity,
        image,
        title,
        brand,
        price,
        originalPrice,
        discount,
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};


export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { size } = req.query;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.selectedSize === size
        )
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
};


export const clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    await Cart.findOneAndUpdate({ userId }, { items: [] });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};
