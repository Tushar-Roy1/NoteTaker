import dotenv from 'dotenv';
dotenv.config(); // ✅ Load environment variables early

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import noteRoutes from './routes/note';


const app = express();




// ✅ Enable CORS for frontend
app.use(cors({
  origin: 'https://note-taker-delta-plum.vercel.app',
  credentials: true, // if using cookies/sessions
}));

// ✅ Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);        // Email/OTP Auth

app.use('/notes', noteRoutes);       // Notes API


app.get('/', (_, res) => {
  res.send('🌐 API is working!');
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

export default app;
