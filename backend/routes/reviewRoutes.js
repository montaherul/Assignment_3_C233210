const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product'); // To ensure product exists
const auth = require('../middleware/auth'); // For logged-in users

// @route   POST /api/reviews
// @desc    Submit a new product review/comment
// @access  Public (can be used by logged-in or anonymous users)
router.post('/', auth, async (req, res) => {
  const { productId, userName, comment, rating, parentId } = req.body;

  // If user is logged in, use their info from req.user
  const userId = req.user ? req.user.id : null;
  const actualUserName = req.user ? req.user.name : userName; // Prioritize logged-in user's name

  try {
    // Basic validation
    if (!productId || !actualUserName || !comment) {
      return res.status(400).json({ message: 'Product ID, user name, and comment are required.' });
    }

    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const newReview = new Review({
      productId,
      userId,
      userName: actualUserName,
      comment,
      rating: rating || null, // Ensure rating is null if not provided
      parentId: parentId || null, // Ensure parentId is null if not provided
    });

    const review = await newReview.save();
    res.status(201).json(review);
  } catch (err) {
    console.error('Error submitting review:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/reviews/product/:productId
// @desc    Get all reviews for a specific product
// @access  Public
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Find reviews for the product, sort by creation date (newest first)
    // Populate parentId if you want to show details of the parent comment
    const reviews = await Review.find({ productId })
      .populate('parentId', 'userName comment createdAt') // Populate parent comment details
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error('Error fetching product reviews:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;