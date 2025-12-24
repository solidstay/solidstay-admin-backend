const express = require("express");
const UserRoutes = require("./userRoutes");
const imageRoutes = require("./imageUploads");
const PropertyRoutes = require("./propertyRoutes");
const bookingRoutes = require("./bookingRoutes");
const router = express.Router();

// Health check route
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

// Set up routes
router.use("/user", UserRoutes);
router.use("/image", imageRoutes);
router.use("/property", PropertyRoutes);
router.use("/booking", bookingRoutes);

module.exports = router;
