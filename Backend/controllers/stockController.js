const Stock = require('../models/stockModel');

// Controller to add a new stock
exports.addStock = async (req, res) => {
  try {
    // Log the incoming request body to make sure the data is as expected
    console.log('Received data for adding stock:', req.body);

    // Create a new stock document based on the incoming data
    const newStock = new Stock(req.body);

    // Save the new stock to the database
    await newStock.save();

    // Send the newly added stock as a response
    res.status(200).json(newStock);
  } catch (error) {
    // Log the error for debugging
    console.error('Error adding stock:', error.message);

    // Send an error response to the client
    res.status(500).json({
      message: 'Failed to add stock',
      error: error.message,
    });
  }
};

// Controller to fetch all stocks from the database
exports.getStocks = async (req, res) => {
  try {
    // Fetch all stock records from the database
    const stocks = await Stock.find();

    // Send the list of stocks as the response
    res.status(200).json(stocks);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching stocks:', error.message);

    // Send an error response to the client
    res.status(500).json({
      message: 'Failed to fetch stocks',
      error: error.message,
    });
  }
};
