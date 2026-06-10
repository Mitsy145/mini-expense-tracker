const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenses');
const budgetRoutes = require('./routes/budget');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/budget', budgetRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Mini Expense Tracker API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

module.exports = app;