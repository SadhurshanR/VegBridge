import React, { useState } from "react";
import { useProductContext } from "./ProductContext";
import { useCartContext } from "./CartContext";
import { Link } from "react-router-dom";

const BusinessMarketplace = () => {
  const { products } = useProductContext();
  const { cart, addToCart } = useCartContext();
  const [qualityFilter, setQualityFilter] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.status === "Approved" &&
      (!qualityFilter || product.grade === qualityFilter)
  );

  return (
    <div className="container mt-5 pt-5">
      <br />
      <br />
      {/* View Cart Button */}
      <div
        className="position-fixed m-3"
        style={{
          right: 0,
          top: "20%",
          transform: "translateY(-50%)",
          zIndex: 1000,
        }}
      >
        <Link to="/add-to-cart" className="btn btn-success btn-lg" title="View Cart">
          <i className="fas fa-shopping-cart"></i> Cart ({cart.length})
        </Link>
      </div>

      {/* Quality Filter Buttons */}
      <div className="mb-4">
        <h4>Filter by Quality:</h4>
        <div className="btn-group">
          <button
            className={`btn btn-success ${qualityFilter === "" ? "active" : ""}`}
            onClick={() => setQualityFilter("")}
          >
            All
          </button>
          <button
            className={`btn btn-success ${qualityFilter === "Underripe" ? "active" : ""}`}
            onClick={() => setQualityFilter("Underripe")}
          >
            Underripe
          </button>
          <button
            className={`btn btn-success ${qualityFilter === "Ripe" ? "active" : ""}`}
            onClick={() => setQualityFilter("Ripe")}
          >
            Ripe
          </button>
          <button
            className={`btn btn-success ${qualityFilter === "Overripe" ? "active" : ""}`}
            onClick={() => setQualityFilter("Overripe")}
          >
            Overripe
          </button>
          <button
            className={`btn btn-success ${qualityFilter === "About to spoil" ? "active" : ""}`}
            onClick={() => setQualityFilter("About to spoil")}
          >
            About to Spoil
          </button>
        </div>
      </div>

      {/* Product Listings */}
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-3 col-lg-3 mb-4" key={product.id}>
            <div className="card shadow-sm border-light" style={{ height: "100%" }}>
              <img
                src={product.image ? `http://localhost:5000/${product.image}` : "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center" style={{ fontSize: "1.2rem" }}>
                  {product.name}
                </h5>
                <p className="card-text" style={{ fontSize: "0.9rem", color: "#555" }}>
                  <strong>Quantity:</strong> {product.quantity} kg<br />
                  <strong>Quality:</strong> {product.grade}<br />
                  <strong>Location:</strong> {product.location}<br />
                  <strong>Price (per kg):</strong> LKR {product.price}<br />
                </p>
                <button
                  className="btn btn-success flex-fill mt-auto"
                  onClick={() => addToCart(product)} // Add product to cart
                  style={{ borderRadius: "5px" }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessMarketplace;
