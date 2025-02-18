import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[INFO] Connected to MongoDB successfully');
  } catch (error) {
    console.error('[ERROR] Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

export default connectDb;
