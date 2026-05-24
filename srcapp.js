const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/orders', orderRoutes);
// app.use('/api/v1/menu', menuRoutes);
// app.use('/api/v1/auth', authRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;