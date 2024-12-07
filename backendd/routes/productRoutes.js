const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Token Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access Denied. Token is missing.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });

    req.user = user;
    next();
  });
};

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Add a Product (POST)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { name, quantity, grade, price, location, farmerName, farmerAddress, farmerEmail } = req.body;
    if (!name || !quantity || !grade || !price) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const image = req.file ? `uploads/${req.file.filename}` : null;
    const product = new Product({
      name,
      quantity,
      grade,
      price,
      location,
      farmerName,
      farmerAddress,
      farmerEmail,
      status: 'Pending',
      image,
      userId: req.user.userId,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error saving product:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get All Products (GET)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a Product (DELETE)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.userId !== req.user.userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    if (product.image) {
      const imagePath = path.join(__dirname, "../", product.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST order route
router.post('/submit-order', authenticateToken, async (req, res) => {
  try {
    const { buyerDetails, products, transportation, transportationCost, totalPrice } = req.body;

    // Check if all required fields are provided
    if (!buyerDetails || !products || !totalPrice) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Create the order
    const order = new Order({
      buyerDetails,
      products,
      transportation,
      transportationCost,
      totalPrice,
      userId: req.user.userId, // Associate order with logged-in user
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get stocks for a specific farmer
router.get('/stocks/:farmerName', authenticateToken, async (req, res) => {
  const { farmerName } = req.params;
  try {
    // Fetch the products belonging to the farmer from the database
    const products = await Product.find({ farmerName });
    if (!products || products.length === 0) {
      console.log('No products found for this farmer.');
      return res.status(404).json({ message: 'No stock found for this farmer.' });
    }

    res.json(products); // Send the products as response
  } catch (error) {
    console.error('Error fetching farmer stocks:', error);
    res.status(500).json({ message: 'Server error while fetching stocks.' });
  }
});
module.exports = router;
