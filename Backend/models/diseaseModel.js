const mongoose = require('mongoose');

// Create Disease Schema
const diseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  causativeAgent: { type: String, required: true },
  plantPartAffected: { type: String, required: true },
  symptoms: { type: String, required: true },
  conditionsFavouringDisease: { type: String, required: true },
  treatment: { type: String, required: true },
  nextSessionManagement: { type: String, required: true }
});

const Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease;
