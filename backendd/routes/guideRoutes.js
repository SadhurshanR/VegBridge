const express = require('express');
const router = express.Router();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const Guide = require('../models/Guides');

// Ensure 'uploads/GuideImages' directory exists
const guideImagesDir = path.join(__dirname, '../GuideImages');
if (!fs.existsSync(guideImagesDir)) {
  fs.mkdirSync(guideImagesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, guideImagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access Denied. Token is missing.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, url, type } = req.body;
    const image = req.file ? `GuideImages/${req.file.filename}` : '';

    const newGuide = new Guide({
      id: uuidv4(),
      title,
      url,
      type,
      image,
    });

    await newGuide.save();
    res.status(201).json(newGuide);
  } catch (error) {
    console.error('Error creating guide:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Ensure this is in your guideRoutes.js or similar file
router.delete('/', authenticateToken, async (req, res) => {
  const { id } = req.query; // Get the ID from query params

  if (!id) {
    return res.status(400).json({ message: 'Guide ID is required.' });
  }

  try {
    const guide = await Guide.findByIdAndDelete(id); // Mongoose delete by ID
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found.' });
    }

    // Optionally, delete the image file associated with the guide
    if (guide.image) {
      const imagePath = path.join(__dirname, '../', guide.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'Guide deleted successfully.' });
  } catch (error) {
    console.error('Error deleting guide:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});









router.get('/:type', async (req, res) => {
  try {
    const guides = await Guide.find({ type: req.params.type });
    res.json(guides);
  } catch (error) {
    console.error('Error fetching guides:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
