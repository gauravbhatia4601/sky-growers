/**
 * Script to create an admin user
 * Run with: npx tsx scripts/seed-admin.ts
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/lib/db/models/User';
import connectDB from '../src/lib/db/connect';

async function seedAdmin() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    const email = process.env.ADMIN_EMAIL || 'admin@skygrowers.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const name = process.env.ADMIN_NAME || 'Admin User';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists. Updating password...');
      const passwordHash = await bcrypt.hash(password, 12);
      existingAdmin.passwordHash = passwordHash;
      existingAdmin.name = name;
      await existingAdmin.save();
      console.log('Admin user updated successfully!');
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
    } else {
      // Create new admin user
      const passwordHash = await bcrypt.hash(password, 12);
      const admin = new User({
        email,
        passwordHash,
        name,
        role: 'admin',
      });
      await admin.save();
      console.log('Admin user created successfully!');
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();

