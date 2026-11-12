const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/technova_blog';
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB connected successfully to: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`[Database] MongoDB connection error: ${error.message}`);
    console.error(`[Database] Note: Ensure MongoDB is running locally (mongodb://127.0.0.1:27017) or set MONGODB_URI in server/.env`);
  }
};

module.exports = connectDB;
