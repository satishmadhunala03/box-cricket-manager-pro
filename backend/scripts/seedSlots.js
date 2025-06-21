
const mongoose = require('mongoose');
const Slot = require('../models/Slot');
require('dotenv').config();

const defaultSlots = [
  { timeSlot: '06:00 - 07:00', startTime: '06:00', endTime: '07:00', price: 500 },
  { timeSlot: '07:00 - 08:00', startTime: '07:00', endTime: '08:00', price: 500 },
  { timeSlot: '08:00 - 09:00', startTime: '08:00', endTime: '09:00', price: 600 },
  { timeSlot: '09:00 - 10:00', startTime: '09:00', endTime: '10:00', price: 600 },
  { timeSlot: '10:00 - 11:00', startTime: '10:00', endTime: '11:00', price: 700 },
  { timeSlot: '11:00 - 12:00', startTime: '11:00', endTime: '12:00', price: 700 },
  { timeSlot: '12:00 - 13:00', startTime: '12:00', endTime: '13:00', price: 700 },
  { timeSlot: '13:00 - 14:00', startTime: '13:00', endTime: '14:00', price: 700 },
  { timeSlot: '14:00 - 15:00', startTime: '14:00', endTime: '15:00', price: 700 },
  { timeSlot: '15:00 - 16:00', startTime: '15:00', endTime: '16:00', price: 700 },
  { timeSlot: '16:00 - 17:00', startTime: '16:00', endTime: '17:00', price: 800 },
  { timeSlot: '17:00 - 18:00', startTime: '17:00', endTime: '18:00', price: 800 },
  { timeSlot: '18:00 - 19:00', startTime: '18:00', endTime: '19:00', price: 900 },
  { timeSlot: '19:00 - 20:00', startTime: '19:00', endTime: '20:00', price: 900 },
  { timeSlot: '20:00 - 21:00', startTime: '20:00', endTime: '21:00', price: 800 },
  { timeSlot: '21:00 - 22:00', startTime: '21:00', endTime: '22:00', price: 700 },
];

async function seedSlots() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cricket-turf');
    
    // Clear existing slots
    await Slot.deleteMany({});
    
    // Insert new slots
    await Slot.insertMany(defaultSlots);
    
    console.log('Slots seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding slots:', error);
    process.exit(1);
  }
}

seedSlots();
