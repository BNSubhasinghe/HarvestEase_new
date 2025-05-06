const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, 'your_jwt_secret', { expiresIn: '1d' });
};

// Register User
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id, user.role);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user._id, user.role);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
