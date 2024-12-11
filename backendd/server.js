require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const GuideRoutes = require('./routes/guideRoutes');

// Initialize express app
const app = express();

const corsOptions = {
  origin: 'https://veg-bridge.vercel.app',  // Allow your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow credentials like cookies or Authorization headers
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Allow OPTIONS requests for preflight checks


// Middleware
app.use(bodyParser.json());

// MongoDB Connection
connectDB();

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Ensure 'GuideImages' directory exists
const guideImagesDir = path.join(__dirname, 'GuideImages');
if (!fs.existsSync(guideImagesDir)) {
  fs.mkdirSync(guideImagesDir);
}

// Serve Uploaded Files
app.use('/uploads', express.static(uploadDir));
app.use('/GuideImages', express.static(guideImagesDir));

// Fallback CORS headers for all routes
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'https://veg-bridge.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.status(204).end(); // Respond with 204 for preflight
  }
  next();
});



// Use routes
app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/guides', GuideRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`);
});
