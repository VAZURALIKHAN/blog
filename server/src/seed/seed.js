require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const seedDatabase = require('./seedData');

const runStandaloneSeed = async () => {
  try {
    await connectDB();
    await seedDatabase();
    console.log('[Seeder] Standalone seed run completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('[Seeder] Standalone seed failed:', err);
    process.exit(1);
  }
};

runStandaloneSeed();
