const Sales = require('../models/salesModel');

// Get all sales
const getSales = async (req, res) => {
  try {
    const sales = await Sales.find().sort({ date: -1 });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new sale
const createSale = async (req, res) => {
  try {
    console.log("Request body:", req.body);  
    const sale = new Sales(req.body); 
    await sale.save(); 
    const allSales = await Sales.find().sort({ date: -1 }); 
    res.status(201).json(allSales); 
  } catch (error) {
    console.error("Error in createSale:", error);
    res.status(400).json({ error: error.message });
  }
};

// Update an existing sale
const updateSale = async (req, res) => {
  try {
    const updatedSale = await Sales.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteSale = async (req, res) => {
  try {
    await Sales.findByIdAndDelete(req.params.id);
    const allSales = await Sales.find().sort({ date: -1 }); 
    res.status(200).json(allSales); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSales, createSale, updateSale, deleteSale }; 
