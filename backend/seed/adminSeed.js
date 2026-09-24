// Bootstrap an administrator from explicit environment settings.
// Set BOOTSTRAP_ADMIN_NAME, BOOTSTRAP_ADMIN_EMAIL, BOOTSTRAP_ADMIN_PASSWORD,
// and optionally BOOTSTRAP_ADMIN_PHONE before running this script.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User.js';

const { MONGODB_URI, BOOTSTRAP_ADMIN_NAME, BOOTSTRAP_ADMIN_EMAIL, BOOTSTRAP_ADMIN_PASSWORD, BOOTSTRAP_ADMIN_PHONE } = process.env;

if (!MONGODB_URI || !BOOTSTRAP_ADMIN_NAME || !BOOTSTRAP_ADMIN_EMAIL || !BOOTSTRAP_ADMIN_PASSWORD) {
  console.error('Set MONGODB_URI, BOOTSTRAP_ADMIN_NAME, BOOTSTRAP_ADMIN_EMAIL, and BOOTSTRAP_ADMIN_PASSWORD before bootstrapping an administrator.');
  process.exit(1);
}

if (BOOTSTRAP_ADMIN_PASSWORD.length < 12) {
  console.error('BOOTSTRAP_ADMIN_PASSWORD must be at least 12 characters.');
  process.exit(1);
}

try {
  await mongoose.connect(MONGODB_URI);
  const existing = await User.findOne({ email: BOOTSTRAP_ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    if (existing.role !== 'admin') throw new Error('That email belongs to a non-admin account. Choose a separate administrator email.');
    existing.name = BOOTSTRAP_ADMIN_NAME;
    existing.password = BOOTSTRAP_ADMIN_PASSWORD;
    if (BOOTSTRAP_ADMIN_PHONE) existing.phone = BOOTSTRAP_ADMIN_PHONE;
    await existing.save();
    console.log(`Administrator password refreshed from environment settings: ${existing.email}`);
  } else {
    const admin = await User.create({
      name: BOOTSTRAP_ADMIN_NAME,
      email: BOOTSTRAP_ADMIN_EMAIL,
      password: BOOTSTRAP_ADMIN_PASSWORD,
      phone: BOOTSTRAP_ADMIN_PHONE || undefined,
      role: 'admin',
    });
    console.log(`Administrator account created: ${admin.email}`);
  }
} catch (error) {
  console.error('Administrator bootstrap failed:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
