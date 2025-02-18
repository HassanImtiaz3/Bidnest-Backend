import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/index.js'
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

app.use(routes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[INFO] Server running on: http://localhost:${PORT}`));
