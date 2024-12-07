import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useCartContext } from './CartContext';


const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const [transportation, setTransportation] = useState('Pick-up');
  const [transportationCost, setTransportationCost] = useState(0);
  const [buyerDetails, setBuyerDetails] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchUserData = () => {
      const user = JSON.parse(localStorage.getItem('userDetails'));
      if (!user) {
        setError('You must be logged in.');
        return;
      }

      const { name, city, address, email, id } = user;
      setBuyerDetails({ name, city, address, email, id });
    };

    fetchUserData();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.selectedQuantity, 0);
  };

  const calculateFinalTotal = () => calculateTotal() + transportationCost;

  const handleTransportationChange = (e) => {
    const option = e.target.value;
    setTransportation(option);
    setTransportationCost(option === 'Delivery' ? 1000 : 0);
  };

  const { clearCart } = useCartContext();

  const handleSubmit = async () => {
    const groupedItems = cartItems.reduce((acc, item) => {
      (acc[item.farmerId] = acc[item.farmerId] || []).push(item);
      return acc;
    }, {});

    const farmers = Object.keys(groupedItems).map(farmerId => ({
      farmerDetails: {
        farmerId,
        farmerName: groupedItems[farmerId][0].farmerName,
        farmerEmail: groupedItems[farmerId][0].farmerEmail,
        farmerAddress: groupedItems[farmerId][0].farmerAddress,
        location: groupedItems[farmerId][0].location,
      },
      products: groupedItems[farmerId].map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.selectedQuantity,
        price: item.price,
        grade: item.grade,
        image: item.image,
      })),
    }));

    const orderData = {
      buyerDetails,
      farmers,
      transportation,
      transportationCost,
      totalPrice: calculateFinalTotal(),
    };

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // Show loading state
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Order placed successfully:", response.data);
      clearCart();
      navigate("/business-marketplace"); // Redirect on success
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Error placing the order.";
      setError(errorMessage);
      console.error("Error creating order:", errorMessage);
    } finally {
      setLoading(false); // Hide loading state
    }    
  };

  // Group items by farmerId
  const groupItemsByFarmer = () => {
    const groupedItems = {};
    cartItems.forEach(item => {
      if (!groupedItems[item.farmerId]) {
        groupedItems[item.farmerId] = [];
      }
      groupedItems[item.farmerId].push(item);
    });
    return groupedItems;
  };

  const groupedItems = groupItemsByFarmer();

  return (
    <div className="container mt-5 p-3">
      <br />
      <br />
      <div className="row">
        {/* Combined Column: Buyer Details + Cart Items */}
        <div className="col-md-8 d-flex flex-column">
          <div className="card shadow p-4 mb-4 flex-fill">
            <h5 className="mb-4">Buyer Information</h5>
            {error && <p className="text-danger">{error}</p>}
            <p><strong>Name:</strong> {buyerDetails.name}</p>
            <p><strong>Email:</strong> {buyerDetails.email}</p>
            <p><strong>Address:</strong> {buyerDetails.address}, {buyerDetails.city}</p>
          </div>
          <div className="card shadow p-4 flex-fill">
            <h5 className="mb-4">Cart Items</h5>
            {cartItems.length === 0 ? (
              <p>Your cart is empty!</p>
            ) : (
              Object.keys(groupedItems).map(farmerId => {
                const items = groupedItems[farmerId];
                const farmer = items[0].farmerName;
                const farmerEmail = items[0].farmerEmail;
                const farmerAddress = items[0].farmerAddress;
                const city = items[0].location;

                return (
                  <div key={farmerId}>
                    <div className="mb-4">
                      <h6><strong>Farmer Information</strong></h6>
                      <p><strong>Name:</strong> {farmer}</p>
                      <p><strong>Email:</strong> {farmerEmail}</p>
                      <p><strong>Address:</strong> {farmerAddress}, {city}</p>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Quality</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={item.image ? `http://localhost:5000/${item.image}` : "https://via.placeholder.com/100"}
                                    alt="Item"
                                    width="50"
                                    height="50"
                                    className="rounded me-3"
                                  />
                                  {item.name}
                                </div>
                              </td>
                              <td>{item.selectedQuantity} kg</td>
                              <td>{item.grade}</td>
                              <td>LKR {(item.price * item.selectedQuantity).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/* Right Column: Pricing & Transportation */}
        <div className="col-md-4 d-flex flex-column">
          <div className="card shadow p-4 flex-fill">
            <h5 className="mb-4">Pricing & Transportation</h5>
            <div className="mb-4">
              <label className="form-label">Transportation Type</label>
              <select className="form-select" value={transportation} onChange={handleTransportationChange}>
                <option value="Pick-up">Pick-up</option>
                <option value="Delivery">Delivery</option>
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p><strong>Sub Total:</strong></p>
              <p>LKR {calculateTotal().toFixed(2)}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p><strong>Transportation Cost:</strong></p>
              <p>LKR {transportationCost}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6><strong>Total:</strong></h6>
              <h6><strong>LKR {calculateFinalTotal().toFixed(2)}</strong></h6>
            </div>
            <button className="btn btn-success w-100" onClick={handleSubmit} disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
