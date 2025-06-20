const mongoose = require('mongoose');

async function connectToDatabase(uri) {
  try {
    await mongoose.connect(uri, {});
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit on failure
  }
}

module.exports = { connectToDatabase };

