import React from 'react';
import { Link } from 'react-router-dom'; 
import Logo from '../Assets/Vegbridge_sl-removebg-preview.png';

const Navbar = () => {
  return (
    <section className="fixed-top w-100 mb-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-2">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={Logo}
              alt="Vegbridge logo"
              className="d-inline-block align-text-top me-5"
              style={{ height: '80px' }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex ms-auto"> {/* Changed ml-auto to ms-auto */}
              <Link
                className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                to="/"
                style={{ marginRight: '15px' }}
              >
                Home
              </Link>
              <Link
                className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                to="/register"
                style={{ marginRight: '15px' }}
              >
                Register
              </Link>
              <Link
                className="nav-link fw-bold text-white bg-success px-3 py-2 rounded"
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
