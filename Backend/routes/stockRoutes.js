const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Route to add new stock
router.post('/add-stock', stockController.addStock);

// Route to get all stocks
router.get('/get-stocks', stockController.getStocks);

module.exports = router;
