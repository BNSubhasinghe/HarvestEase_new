
const express = require('express');
const { getSales, createSale, updateSale, deleteSale } = require('../controllers/salesController');

const router = express.Router();


router.get('/', getSales);

router.post('/', createSale);

router.put('/:id', updateSale);

router.delete('/:id', deleteSale);

module.exports = router; 
