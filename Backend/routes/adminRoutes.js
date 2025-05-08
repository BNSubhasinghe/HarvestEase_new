const express = require('express');
const router = express.Router();

const {
  getSales,
  createSale,
  updateSale,
  deleteSale,
  getSalesSummary
} = require('../controllers/adminSalesController');

const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpensesSummary
} = require('../controllers/adminExpensesController');

const {
  getFarmers,
  createFarmer,
  updateFarmer,
  deleteFarmer,
  getFarmerStats
} = require('../controllers/adminFarmersController');

const {
  getSystemProfits,
  getCropWiseProfits,
  getRegionalProfits
} = require('../controllers/adminProfitsController');

// Sales routes
router.get('/sales', getSales);
router.post('/sales', createSale);
router.put('/sales/:id', updateSale);
router.delete('/sales/:id', deleteSale);
router.get('/sales/summary', getSalesSummary);

// Expenses routes
router.get('/expenses', getExpenses);
router.post('/expenses', createExpense);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);
router.get('/expenses/summary', getExpensesSummary);

// Farmers routes
router.get('/farmers', getFarmers);
router.post('/farmers', createFarmer);
router.put('/farmers/:id', updateFarmer);
router.delete('/farmers/:id', deleteFarmer);
router.get('/farmers/:farmerId/stats', getFarmerStats);


// Profits routes
router.get('/profits/system', getSystemProfits);
router.get('/profits/crops', getCropWiseProfits);
router.get('/profits/regions', getRegionalProfits);

module.exports = router;