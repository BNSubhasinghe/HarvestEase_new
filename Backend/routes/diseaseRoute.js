const express = require('express');
const router = express.Router();
const diseaseController = require('../controllers/diseaseController');

// Route to create a new disease
router.post('/create', diseaseController.createDisease);

// Route to get all diseases
router.get('/', diseaseController.getDiseases);

// Route to get a specific disease by ID
router.get('/:id', diseaseController.getDiseaseById);

// Route to update a disease by ID
router.put('/:id', diseaseController.updateDisease);

// Route to delete a disease by ID
router.delete('/:id', diseaseController.deleteDisease);

module.exports = router;
