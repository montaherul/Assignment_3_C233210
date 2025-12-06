const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userId: { // Optional: Firebase UID if user is logged in
    type: String,
    default: null,
  },
  userName: { // User's display name, or provided name for anonymous comments
    type: String,
    required: true,
    trim: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  rating: { // Optional: 1-5 star rating
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  parentId: { // For replies to other comments (optional)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);