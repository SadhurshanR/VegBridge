const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

// Middleware: Authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access Denied. Token is missing.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

// POST /api/orders
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { buyerDetails, farmers, transportation, transportationCost, totalPrice } = req.body;

    const newOrder = new Order({
      buyerDetails,
      farmers,
      transportation,
      transportationCost,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', newOrder });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch transactions for farmer, admin, or business
router.get('/transactions/:identifier/:role', authenticateToken, async (req, res) => {
  try {
    const { identifier, role } = req.params;

    // Validate role parameter
    const validRoles = ['admin', 'farmer', 'business'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role provided.' });
    }

    let transactions;

    // Fetch transactions based on role
    if (role === 'admin') {
      transactions = await Order.find(); // Admin gets all transactions
    } else if (role === 'farmer') {
      transactions = await Order.find({
        'farmers.farmerDetails.farmerName': identifier, // Filter by farmer's name
      });
    } else if (role === 'business') {
      transactions = await Order.find({
        'buyerDetails.email': identifier, // Filter by business email
      });
    }



    // If no transactions found, return a clear message
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found.' });
    }

    // Respond with the transactions found
    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err.message);
    // Return a more descriptive error message
    res.status(500).json({
      message: 'Error fetching transactions. Please try again later.',
      error: err.message,
    });
  }
});




module.exports = router;
