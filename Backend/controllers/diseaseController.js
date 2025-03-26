const Disease = require('../models/diseaseModel');
const multer = require('multer');
const path = require('path');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store images in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique file name
  },
});

const upload = multer({ storage: storage });

// Create new disease (with image upload)
exports.createDisease = [upload.single('image'), async (req, res) => {
  try {
    const { name, causativeAgent, plantPartAffected, symptoms, conditionsFavouringDisease, treatment, nextSessionManagement } = req.body;

    // Save image path in the database
    const image = req.file ? req.file.path : null;

    const newDisease = new Disease({
      name,
      image,
      causativeAgent,
      plantPartAffected,
      symptoms,
      conditionsFavouringDisease,
      treatment,
      nextSessionManagement
    });

    await newDisease.save();
    res.status(201).json({ message: 'Disease created successfully!', disease: newDisease });
  } catch (err) {
    res.status(400).json({ message: 'Error creating disease', error: err });
  }
}];

// Get all diseases
exports.getDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.status(200).json(diseases);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching diseases', error: err });
  }
};

// Get disease by ID
exports.getDiseaseById = async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    res.status(200).json(disease);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching disease', error: err });
  }
};

// Update disease data (with image upload)
exports.updateDisease = [upload.single('image'), async (req, res) => {
  try {
    const { name, causativeAgent, plantPartAffected, symptoms, conditionsFavouringDisease, treatment, nextSessionManagement } = req.body;

    // Update image path if a new image is uploaded, otherwise keep the old one
    const image = req.file ? req.file.path : req.body.image;

    const updatedDisease = await Disease.findByIdAndUpdate(req.params.id, {
      name,
      image,
      causativeAgent,
      plantPartAffected,
      symptoms,
      conditionsFavouringDisease,
      treatment,
      nextSessionManagement,
    }, { new: true });

    if (!updatedDisease) {
      return res.status(404).json({ message: 'Disease not found' });
    }

    res.status(200).json({ message: 'Disease updated successfully', disease: updatedDisease });
  } catch (err) {
    res.status(400).json({ message: 'Error updating disease', error: err });
  }
}];

// Delete disease data
exports.deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findByIdAndDelete(req.params.id);
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    res.status(200).json({ message: 'Disease deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting disease', error: err });
  }
};
