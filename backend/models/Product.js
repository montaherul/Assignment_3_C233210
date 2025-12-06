const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  attributes: {
    color: { type: String },
    size: { type: String },
    // Add other attributes as needed
  },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  brand: { type: String },
  images: [{ type: String }], // Array of image URLs
  variants: [variantSchema],
  price: { type: Number, required: true }, // Base price
  salePrice: { type: Number }, // Optional sale price
  meta: {
    title: { type: String },
    description: { type: String },
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update `updatedAt` on save
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);