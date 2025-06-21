
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  timeSlot: {
    type: String,
    required: true,
    unique: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 500
  },
  isActive: {
    type: Boolean,
    default: true
  },
  capacity: {
    type: Number,
    default: 1
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Slot', slotSchema);
