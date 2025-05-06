const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");

router.post("/", propertyController.createProperty); // Add a new property
router.get("/", propertyController.getAllProperties); // Get all properties
router.get("/:id", propertyController.getPropertyById); // Get a single property by ID
router.put("/:id", propertyController.updateProperty); // Update a property by ID
router.delete("/:id", propertyController.deleteProperty); // Delete a property by ID

module.exports = router;
