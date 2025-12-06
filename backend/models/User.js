const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { // Storing hashed password
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: 'User',
    trim: true,
  },
  photoURL: {
    type: String,
    default: '',
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  addresses: [
    {
      label: String,
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);