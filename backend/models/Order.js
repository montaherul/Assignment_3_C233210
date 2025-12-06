const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productTitle: { type: String, required: true },
  productImage: { type: String },
  variantSku: { type: String }, // If ordering a specific variant
  qty: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true },
});

const paymentSchema = new mongoose.Schema({
  method: { type: String, required: true, enum: ['Cash on Delivery', 'bKash', 'Nagad', 'Stripe'] },
  status: { type: String, required: true, enum: ['Payment Pending', 'Pending', 'Processing', 'Delivered', 'Cancelled'], default: 'Payment Pending' },
  transactionId: { type: String },
  senderNumber: { type: String }, // For bKash/Nagad
  stripePaymentIntentId: { type: String }, // For Stripe
});

const shippingAddressSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  physicalAddress: { type: String, required: true },
  mapEmbedLink: { type: String }, // Google Maps embed link
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true }, // Custom readable order ID
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  payment: paymentSchema,
  shippingAddress: shippingAddressSchema,
  status: { type: String, required: true, enum: ['Payment Pending', 'Pending', 'Processing', 'Delivered', 'Cancelled'], default: 'Payment Pending' },
  statusHistory: [{
    status: { type: String },
    timestamp: { type: Date, default: Date.now },
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update `updatedAt` on save
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);