import React, { useState } from 'react';
import logo from '../Assets/Vegbridge sl (1).png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email validation
    if (!email) {
      setErrorMessage('Email is required');
      setSuccessMessage('');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setSuccessMessage('');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('Subscription successful! Thank you for subscribing.');
    setEmail('');
  };

  return (
    <footer className="footer py-5 bg-dark text-light">
      <div className="container">
        <div className="row text-center">
          {/* Useful Links */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="Index2.html" className="text-light text-decoration-none">Home</a></li>
              <li><a href="Register.html" className="text-light text-decoration-none">Register</a></li>
              <li><a href="Login.html" className="text-light text-decoration-none">Login</a></li>
            </ul>
          </div>

          {/* Logo and Description */}
          <div className="col-md-4 mb-3">
            <img
              src={logo}
              alt="VegBridge Logo"
              className="mb-3"
              style={{ width: '150px' }}
            />
            <p>Connecting farmers with businesses to reduce wastage and increase efficiency in agriculture.</p>
          </div>

          {/* Newsletter Subscription */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Subscribe for Updates</h5>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button type="submit" className="btn btn-success">Subscribe</button>
            </form>
            {errorMessage && <div className="mt-2 text-danger">{errorMessage}</div>}
            {successMessage && <div className="mt-2 text-success">{successMessage}</div>}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4">
          <p>&copy; 2024 VegBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
