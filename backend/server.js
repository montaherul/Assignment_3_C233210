require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('redis'); // Import redis client

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- MongoDB Connection ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Redis Client (for future use) ---
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.connect().then(() => console.log('Redis connected successfully')).catch(err => console.error('Redis connection error:', err));

// --- Middleware ---
app.use(cors({
  origin: 'http://localhost:5173', // Allow your React frontend to access
  credentials: true,
}));
app.use(express.json()); // For parsing application/json

// --- Basic Route ---
app.get('/', (req, res) => {
  res.send('myproject Backend API is running!');
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});