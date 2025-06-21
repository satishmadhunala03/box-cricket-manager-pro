
const express = require('express');
const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const User = require('../models/User');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Create a new booking
router.post('/', auth, async (req, res) => {
  try {
    const { slotId, bookingDate, notes } = req.body;
    
    // Find the slot
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    // Check if slot is already booked for the given date
    const existingBooking = await Booking.findOne({
      slot: slotId,
      bookingDate: new Date(bookingDate),
      status: { $in: ['confirmed', 'completed'] }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Slot is already booked for this date' });
    }

    // Create new booking
    const booking = new Booking({
      user: req.user.userId,
      slot: slotId,
      bookingDate: new Date(bookingDate),
      timeSlot: slot.timeSlot,
      startTime: slot.startTime,
      endTime: slot.endTime,
      price: slot.price,
      notes
    });

    await booking.save();

    // Update user's booking stats
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { totalBookings: 1, totalSpent: slot.price }
    });

    // Populate the booking with user and slot details
    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone')
      .populate('slot', 'timeSlot startTime endTime price');

    res.status(201).json({
      message: 'Booking created successfully',
      booking: populatedBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings (Admin) or user's bookings
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, date } = req.query;
    
    let query = {};
    
    // If not admin, only show user's bookings
    if (req.user.role !== 'admin') {
      query.user = req.user.userId;
    }
    
    if (status) query.status = status;
    if (date) query.bookingDate = new Date(date);

    const bookings = await Booking.find(query)
      .populate('user', 'name email phone')
      .populate('slot', 'timeSlot startTime endTime price')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('slot', 'timeSlot startTime endTime price');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user can access this booking
    if (req.user.role !== 'admin' && booking.user._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to access this booking' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user can cancel this booking
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Update user's booking stats
    await User.findByIdAndUpdate(booking.user, {
      $inc: { totalBookings: -1, totalSpent: -booking.price }
    });

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete booking (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
