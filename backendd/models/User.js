const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['farmer', 'business', 'admin'] },
  sortingQuality: { type: Map, of: Boolean, default: {} },
});

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
