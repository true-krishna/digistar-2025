const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const documentRoutes = require('./interfaces/routes/document');
const healthRoutes = require('./interfaces/routes/health');
const { connectToDatabase } = require('./infrastructure/db/mongoose');

dotenv.config();

const app = express();
app.use(cors())
// Init DB
//
connectToDatabase(process.env.MONGO_URI);



// Middlewares
app.use(express.json());

// Routes
app.use('/api/document', documentRoutes);
app.use('/api/health', healthRoutes);

// Global error handler (optional but useful)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;

