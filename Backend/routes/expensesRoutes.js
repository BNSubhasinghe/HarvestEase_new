const express = require('express');
const { 
  getExpenses, 
  createExpense, 
  updateExpense, 
  deleteExpense 
} = require('../controllers/expensesController');

const router = express.Router();

router.get('/:user', getExpenses); // Filter expenses by user ID
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;