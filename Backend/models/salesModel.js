const mongoose = require('mongoose'); // Use require for consistency

const salesSchema = new mongoose.Schema({
  cropType: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  buyerDetails: {
    name: { type: String, required: true },
    contact: { type: String },
  },
  date: { type: Date, default: Date.now },
});

// Export the Sales model
const Sales = mongoose.model('Sale', salesSchema);
module.exports = Sales;
