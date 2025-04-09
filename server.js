import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // For legacy browser support
};

// Middleware - ORDER MATTERS!
app.use(cors(corsOptions)); // CORS first
app.use(express.json({ limit: '50mb' })); // Then body parsers
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Database connection
connectDB();

// Routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ 
      error: 'Payload too large',
      message: 'File size exceeds 50MB limit' 
    });
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[INFO] Server running on: http://localhost:${PORT}`));