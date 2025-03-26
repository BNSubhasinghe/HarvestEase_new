import mongoose from 'mongoose';

const expensesSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    trim: true
  },
  amount: { 
    type: Number, 
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  description: { 
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  crop: {
    type: String,
    trim: true
  },
  date: { 
    type: Date, 
    default: Date.now, // Default to current date
    // No validation needed, allows both past and future dates
  }
}, {
  timestamps: true
});

// Add index for better query performance
expensesSchema.index({ category: 1, date: -1 });
expensesSchema.index({ crop: 1 });

export default mongoose.model('Expense', expensesSchema);
