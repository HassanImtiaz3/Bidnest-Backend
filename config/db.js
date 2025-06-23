import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log('[INFO] Connected to MongoDB successfully');
  } catch (error) {
    console.error('[ERROR] Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDb;
