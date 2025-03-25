const express = require('express');
const { getSales, createSale, updateSale, deleteSale } = require('../controllers/salesController');

const router = express.Router();

// Get all sales
router.get('/', getSales);

// Create a new sale
router.post('/', createSale);

// Update an existing sale
router.put('/:id', updateSale);

// Delete a sale
router.delete('/:id', deleteSale);

module.exports = router; 
