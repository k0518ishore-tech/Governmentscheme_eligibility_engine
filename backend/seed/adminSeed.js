// ============================================================
// SchemeGuide Backend — Admin Seed
// ============================================================
// Creates a default admin account for development.
// Run: node seed/adminSeed.js
// ============================================================

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/GovernmentSchemeDB';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed] Connected to MongoDB');

    // Check if admin already exists
    const existing = await User.findOne({ email: 'admin@schemeguide.in' });
    if (existing) {
      console.log('[Seed] Admin account already exists. Skipping.');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user (password will be hashed by the pre-save hook)
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@schemeguide.in',
      password: 'admin123',
      role: 'admin',
      phone: '0000000000',
    });

    console.log(`[Seed] ✅ Admin account created successfully`);
    console.log(`  - Email: admin@schemeguide.in`);
    console.log(`  - Password: admin123`);
    console.log(`  - ID: ${admin._id}`);
    console.log('');
    console.log('  ⚠️  Change these credentials before any deployment!');

    // Also create a demo citizen user
    const existingDemo = await User.findOne({ email: 'riya@example.com' });
    if (!existingDemo) {
      const demoUser = await User.create({
        name: 'Riya Sharma',
        email: 'riya@example.com',
        password: 'password123',
        phone: '9876543210',
        role: 'user',
        profile: {
          age: 22,
          gender: 'Female',
          state: 'Tamil Nadu',
          district: 'Chennai',
          category: 'General',
          occupation: 'Student',
          annualIncome: 180000,
          education: "Bachelor's Degree",
          maritalStatus: 'Single',
          disabilityStatus: false,
          ruralUrban: 'Urban',
        },
      });
      console.log(`[Seed] ✅ Demo citizen account created`);
      console.log(`  - Email: riya@example.com`);
      console.log(`  - Password: password123`);
      console.log(`  - ID: ${demoUser._id}`);
    }

    await mongoose.connection.close();
    console.log('[Seed] Done. Connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
