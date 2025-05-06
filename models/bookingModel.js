const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  days: { type: Number, required: false },
  date: { type: Date, required: false },
  message: { type: String, required: false },
  houseTitle: { type: String, required: false },
  propertyLocation: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
