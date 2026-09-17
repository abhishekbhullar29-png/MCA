import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db.js';
import auth from './routes/auth.js';
import movies from './routes/movies.js';
import shows from './routes/shows.js';
import bookings from './routes/bookings.js';

const app = express();

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'CineVerse',
  });
});

// API Routes
app.use('/api/auth', auth);
app.use('/api/movies', movies);
app.use('/api/shows', shows);
app.use('/api/bookings', bookings);

// Connect MongoDB and start server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });