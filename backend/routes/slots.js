
const express = require('express');
const Slot = require('../models/Slot');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Get all slots with availability
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    const queryDate = date ? new Date(date) : new Date();
    
    const slots = await Slot.find({ isActive: true }).sort({ startTime: 1 });
    
    // Check availability for each slot
    const slotsWithAvailability = await Promise.all(
      slots.map(async (slot) => {
        const booking = await Booking.findOne({
          slot: slot._id,
          bookingDate: queryDate,
          status: { $in: ['confirmed', 'completed'] }
        }).populate('user', 'name email phone');
        
        return {
          ...slot.toObject(),
          isBooked: !!booking,
          booking: booking || null
        };
      })
    );
    
    res.json(slotsWithAvailability);
  } catch (error) {
    console.error('Get slots error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new slot (Admin only)
router.post('/', [auth, adminAuth], async (req, res) => {
  try {
    const { timeSlot, startTime, endTime, price, description } = req.body;
    
    // Check if slot already exists
    const existingSlot = await Slot.findOne({ timeSlot });
    if (existingSlot) {
      return res.status(400).json({ message: 'Slot with this time already exists' });
    }
    
    const slot = new Slot({
      timeSlot,
      startTime,
      endTime,
      price,
      description
    });
    
    await slot.save();
    res.status(201).json({ message: 'Slot created successfully', slot });
  } catch (error) {
    console.error('Create slot error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update slot (Admin only)
router.put('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const { timeSlot, startTime, endTime, price, description, isActive } = req.body;
    
    const slot = await Slot.findByIdAndUpdate(
      req.params.id,
      { timeSlot, startTime, endTime, price, description, isActive },
      { new: true }
    );
    
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    
    res.json({ message: 'Slot updated successfully', slot });
  } catch (error) {
    console.error('Update slot error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete slot (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    console.error('Delete slot error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
