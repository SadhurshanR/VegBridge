import React from 'react';
import { Link } from 'react-router-dom';
import guideImage from '../Assets/guidance.png';
import marketplaceImage from '../Assets/shopping-circle-green-512.webp';
import transactionImage from '../Assets/transaction.png';
import harvestImage from '../Assets/harvest.jpg';

const Homepage = () => {
  return (
    <>
      {/* Features Section */}
      <section className="features py-5 text-light" style={{ backgroundColor: '#2d3436' }}>
        <div className="container">
          <h2 className="display-6 text-center mb-4">Why Choose Us?</h2>
          <div className="row text-center">
            {/* Feature 1 */}
            <div className="col-md-4 mb-4">
              <img
                src={guideImage}
                alt="Guide"
                className="img-fluid mb-3 feature-image"
              />
              <h3 className="text-success fw-bold">Guidance on Sorting & Preservation</h3>
              <p>Get practical tips on grading, sorting, and storing your harvest to reduce waste and keep produce fresh for longer.</p>
            </div>
            {/* Feature 2 */}
            <div className="col-md-4 mb-4">
              <img
                src={marketplaceImage}
                alt="Marketplace"
                className="img-fluid mb-3 feature-image"
              />
              <h3 className="text-success fw-bold">Marketplace</h3>
              <p>Connect with buyers ready to purchase your produce, making it simple to sell stock in hand.</p>
            </div>
            {/* Feature 3 */}
            <div className="col-md-4 mb-4">
              <img
                src={transactionImage}
                alt="Transaction"
                className="img-fluid mb-3 feature-image"
              />
              <h3 className="text-success fw-bold">Reliable Transactions</h3>
              <p>Secure transactions ensure that you can trust your buyers, facilitating smooth exchanges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Call-to-Action Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          {/* Image Column */}
          <div className="col-md-6">
            <img
              src={harvestImage}
              alt="Vegetable harvesting"
              className="img-fluid rounded"
            />
          </div>
          
          {/* Text Column */}
          <div className="col-md-6 text-center text-md-start mt-4 mt-md-0">
            <h3 className="fw-bold text-success">Unlock the Full VegBridge Experience!</h3>
            <p>Join us to connect directly with buyers, reduce waste, and boost your sales with ease.</p>
            <Link className="btn btn-success me-2" to="/register">Register</Link>
            <Link className="btn btn-outline-success" to="/login">Log In</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
