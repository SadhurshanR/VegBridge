// OrderTrackingForm.jsx

import React from 'react';

const OrderTrackingForm = () => {
  return (
    <main
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: '90vh', paddingTop: '20px', backgroundColor: '#e6e6e6' }}
    >
      <div className="card shadow p-4 w-100" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Track Your Order</h2>
        <form>
          {/* Bill Number */}
          <div className="mb-3">
            <label htmlFor="billNo" className="form-label">Bill Number</label>
            <input
              type="text"
              className="form-control"
              id="billNo"
              placeholder="Enter Bill Number"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100">
            Track Order
          </button>
        </form>

        {/* Order Details Section */}
        <div id="orderDetails" className="mt-4" style={{ display: 'none' }}>
          <h5>Order Information</h5>
          <div id="orderInfo" className="list-group">
            {/* Order details will be dynamically loaded here */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderTrackingForm;
