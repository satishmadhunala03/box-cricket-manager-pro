
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cricket-turf');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@cricketturf.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@cricketturf.com',
      phone: '+91 9876543210',
      password: 'admin123',
      role: 'admin'
    });
    
    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@cricketturf.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
