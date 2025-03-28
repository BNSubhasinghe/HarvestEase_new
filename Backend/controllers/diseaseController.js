// controllers/diseaseController.js
const Disease = require('../models/diseaseModel');
const multer = require('multer');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addDisease = async (req, res) => {
    try {
        const { diseaseName, affectedParts, symptoms, favorableConditions, treatments, nextSeasonManagement } = req.body;
        const imageUrl = req.file ? '/uploads/' + req.file.filename : null;

        const newDisease = new Disease({
            diseaseName,
            affectedParts,
            symptoms,
            favorableConditions,
            treatments,
            nextSeasonManagement,
            imageUrl
        });

        await newDisease.save();
        res.status(201).json({ message: 'Disease information added successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all diseases for admin to manage
const getDiseases = async (req, res) => {
    try {
        const diseases = await Disease.find();
        res.status(200).json(diseases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update disease info
const updateDisease = async (req, res) => {
    try {
        const { id } = req.params;
        const { diseaseName, affectedParts, symptoms, favorableConditions, treatments, nextSeasonManagement } = req.body;
        const updatedDisease = await Disease.findByIdAndUpdate(id, {
            diseaseName,
            affectedParts,
            symptoms,
            favorableConditions,
            treatments,
            nextSeasonManagement
        }, { new: true });

        res.status(200).json(updatedDisease);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a disease
const deleteDisease = async (req, res) => {
    try {
        const { id } = req.params;
        await Disease.findByIdAndDelete(id);
        res.status(200).json({ message: 'Disease deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Search for diseases based on user input (farmer's query)
const searchDisease = async (req, res) => {
    try {
        const { affectedParts, symptoms } = req.body;
        const diseases = await Disease.find({
            affectedParts: { $in: affectedParts },
            symptoms: { $in: symptoms }
        });

        if (diseases.length > 0) {
            return res.status(200).json(diseases);
        }

        // If no match is found, use the external API for further suggestions
        const response = await fetch(`https://plant.id/api/v3/plant-diseases?affectedParts=${affectedParts}&symptoms=${symptoms}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.PLANT_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ affectedParts, symptoms }),
        });

        const apiData = await response.json();
        res.status(200).json(apiData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addDisease,
    getDiseases,
    updateDisease,
    deleteDisease,
    searchDisease,
    upload
};
