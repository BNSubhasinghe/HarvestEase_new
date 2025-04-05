// /Backend/Routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { protect, roleAuth } = require('../middlewares/auth');
const router = express.Router();

// POST route for registering a user
router.post('/register', registerUser);

// POST route for logging in a user
router.post('/login', loginUser);

// Example of a protected route for admins
router.get('/admin', protect, roleAuth(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin!', user: req.user });
});

module.exports = router;
