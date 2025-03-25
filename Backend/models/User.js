const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'farmer', 'buyer'], default: 'buyer' }, // Default role is 'buyer'
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hash password
  next();
});

// Method to compare entered password with stored password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password); // Compare the password
};

const User = mongoose.model('User', userSchema);

module.exports = User;
