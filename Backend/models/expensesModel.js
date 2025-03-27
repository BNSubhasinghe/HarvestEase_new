import mongoose from 'mongoose';

const expensesSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Expense', expensesSchema);