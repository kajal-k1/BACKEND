
import mongoose from 'mongoose';
import Wishlist from '../models/wishlistModel.js';


export const addToWishlist = async (req, res) => {
  try {
    const { productId, size } = req.body;


    if (!productId || !mongoose.Types.ObjectId.isValid(productId) || !size) {
      return res.status(400).json({ message: 'Invalid productId or size' });
    }

    const userId = req.user.id; 

    let wishlist = await Wishlist.findOne({ user: userId });

   
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] }); // ✅ FIXED
    }

    
    wishlist.products = wishlist.products.filter(
      (item) => item?.productId && item?.size
    );

    
    const exists = wishlist.products.some(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size
    );

    if (!exists) {
      wishlist.products.push({ productId, size });

      try {
        await wishlist.save();
      } catch (saveErr) {
        console.error(' Error saving wishlist:', saveErr.message);
        return res.status(500).json({ message: 'Error saving wishlist' });
      }
    }

    res.status(200).json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.error('Add to wishlist error:', error.message);
    res.status(500).json({ message: 'Failed to add product to wishlist' });
  }
};


export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }) // ✅ FIXED
      .populate('products.productId');

    const cleanedProducts = (wishlist?.products || []).filter(
      (item) => item?.productId && item?.size
    );

    res.status(200).json({ products: cleanedProducts });
  } catch (error) {
    console.error(' Get wishlist error:', error.message);
    res.status(500).json({ message: 'Failed to fetch wishlist' });
  }
};


export const removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const { size } = req.query;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const wishlist = await Wishlist.findOne({ user: req.user.id }); // ✅ FIXED

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    const originalLength = wishlist.products.length;

    wishlist.products = wishlist.products.filter((item) => {
      if (!item?.productId || !item?.size) return false;
      return item.productId.toString() !== productId || item.size !== size;
    });

    if (wishlist.products.length === originalLength) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    await wishlist.save();

    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.error(' Remove from wishlist error:', error.message);
    res.status(500).json({ message: 'Failed to remove product from wishlist' });
  }
};
