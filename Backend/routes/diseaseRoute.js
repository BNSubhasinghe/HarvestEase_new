// routes/diseaseRoute.js
const express = require('express');
const { addDisease, getDiseases, updateDisease, deleteDisease, searchDisease, upload } = require('../controllers/diseaseController');
const router = express.Router();

// Admin routes for managing diseases
router.post('/add', upload.single('image'), addDisease);
router.get('/', getDiseases);
router.put('/:id', upload.single('image'), updateDisease);
router.delete('/:id', deleteDisease);

// Farmer route to search diseases
router.post('/search', searchDisease);

module.exports = router;
