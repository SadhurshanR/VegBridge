const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();


// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET is not defined in the environment variables.');
  process.exit(1); // Exit the server to prevent further issues
}

// Register User
router.post('/register', async (req, res) => {
  const { name, address, city, dob, email, password, confirmPassword, role, sortingQuality } = req.body;

  if (!email || !password || !confirmPassword || !name || !address || !city || !dob || !role || !sortingQuality) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      address,
      city,
      dob,
      email,
      password: hashedPassword,
      role,
      sortingQuality,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Directly handle admin login
  if (username === 'admin' && password === 'admin') {
    try {
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'your_jwt_secret_key', {
        expiresIn: '1h', // Token valid for 1 hour
      });
      return res.status(200).json({
        message: 'Admin login successful.',
        token, // Return a valid token
        role: 'admin',

        userDetails: {
        name: 'admin',
        role: 'admin'
        }
      });
    } catch (error) {
      console.error('Error generating token for admin:', error);
      return res.status(500).json({ message: 'Failed to generate token. Please try again.' });
    }
  }

  // Input Validation: Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide both username and password.' });
  }

  try {
    // Look for user by email (assuming username is the email)
    const user = await User.findOne({ email: username }); // Using 'email' as username
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. User not found.' });
    }

    // Compare the hashed password with the one provided by the user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Incorrect password.' });
    }

    // Generate a JWT token with expiration time
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key', // Ensure your environment variable is set
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send successful login response with token and user details
    res.status(200).json({
      message: 'Login successful.',
      token, // This sends the token back to the frontend
      role: user.role,
      userDetails: {
        name: user.name,
        address: user.address,
        city: user.city,
        email: user.email,
        dob: user.dob,
        role: user.role,
        sortingQuality: user.sortingQuality, // Customize this if you have other details
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

module.exports = router;
