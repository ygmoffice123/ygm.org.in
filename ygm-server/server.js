import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';

import clientsRoute from './routes/client.route.js';
import strengthRoute from './routes/strength.route.js';
import contactRoute from './routes/contact.route.js';
import adminRoute from './routes/auth.route.js';
import founderRoute from './routes/founder.route.js';
import serviceRoute from './routes/services.route.js';
import feedbackRoute from './routes/feedback.route.js';

// import authRoutes from './routes/auth.route.js'; // Uncomment when needed

const app = express();

// ========================
// Middleware
// ========================
app.use(express.json()); // ✅ Parse incoming JSON
app.use(express.urlencoded({ extended: true })); // ✅ Parse URL-encoded data
app.use(cookieParser()); // ✅ Parse cookies

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ========================
// API Routes
// ========================
app.use('/api/clients', clientsRoute);
app.use('/api/services', serviceRoute);
app.use('/api/strength', strengthRoute);
app.use('/api/contactInfo', contactRoute);
app.use('/api/founder', founderRoute);
app.use('/api/admin', adminRoute);
app.use('/api/feedback', feedbackRoute); 

// ========================
// Health Check Route
// ========================
app.get('/', (req, res) => {
  res.send('✅ Server is running...');
});

// ========================
// Server & DB Startup
// ========================
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  });
