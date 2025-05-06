const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
    },
    propertyType: {
        type: String,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    city: {
        type: String,
    },
    currentStatus: {
        type: String,
        default: "Available",
        enum: ["Available", "Sold", "Under Contract"], // Example options
    },
    squareFeet: {
        type: String,
    },
    bedrooms: {
        type: Number,
    },
    bathrooms: {
        type: Number,
    },
    parkingSpace: {
        type: String,
        default: "Available",
        enum: ["Available", "Not Available"],
    },
    propertyDetail: {
        type: String,
    },
    tags: {
        type: [String],
        default: [],
    },
    images: {
        type: [String], // Store URLs of images or path to images
        default: [],
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the model
const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
