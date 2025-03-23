const express = require("express");
const router = express.Router();

// Correct import path (case-sensitive)
const cropController = require("../controllers/cropController");

// Route for getting all crops
router.get("/", cropController.getAllCrops);
router.post("/add", cropController.addcrops);
router.get("/:id", cropController.getById);
router.put("/update/:id", cropController.updateCrop);
router.delete("/delete/:id", cropController.deleteCrop);


// Export router
module.exports = router;
