import Expenses from '../models/expensesModel.js';

export const getExpenses = async (req, res) => {
  try {
    const { frequency } = req.query;
    let filter = {};

    if (frequency && frequency !== 'all') {
      const days = parseInt(frequency);
      filter.date = { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) };
    }

    const expenses = await Expenses.find(filter).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createExpense = async (req, res) => {
  try {
    console.log("Request body for expense:", req.body);  // Log the request body
    const expense = await Expenses.create(req.body);
    res.status(201).json(expense);  // Respond with the created expense
  } catch (error) {
    console.error("Error in createExpense:", error);
    res.status(400).json({ error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expenses.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expenses.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
