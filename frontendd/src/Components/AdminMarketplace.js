import React, { useContext, useState } from "react";
import ProductContext from "./ProductContext";

const AdminMarketplace = () => {
  const { products, updateProductStatus } = useContext(ProductContext);
  const [qualityFilter, setQualityFilter] = useState(""); // State to manage quality filter

  const handleStatusChange = (id, status) => {
    updateProductStatus(id, status);
  };

  const handleQualityFilterChange = (quality) => {
    setQualityFilter(quality); // Update the filter based on selected quality
  };

  const filteredApprovedProducts = products.filter(
    (product) =>
      product.status === "Approved" &&
      (!qualityFilter || product.grade === qualityFilter)
  );

  return (
    <div className="container mt-5 pt-5">
      <br />
      <br />
      {/* Product Listings */}
      {["Pending", "Approved", "Rejected"].map((status) => (
        <div key={status} className="mb-5">
          <h2 className="mb-3">{status} Products</h2>
          {/* Display quality filter buttons only for "Approved" products */}
          {status === "Approved" && (
            <div className="mb-4">
              <h4>Filter by Quality:</h4>
              <div className="btn-group">
                <button
                  className={`btn btn-success ${qualityFilter === "" ? "active" : ""}`}
                  onClick={() => handleQualityFilterChange("")}
                >
                  All
                </button>
                <button
                  className={`btn btn-success ${
                    qualityFilter === "Underripe" ? "active" : ""
                  }`}
                  onClick={() => handleQualityFilterChange("Underripe")}
                >
                  Underripe
                </button>
                <button
                  className={`btn btn-success ${
                    qualityFilter === "Ripe" ? "active" : ""
                  }`}
                  onClick={() => handleQualityFilterChange("Ripe")}
                >
                  Ripe
                </button>
                <button
                  className={`btn btn-success ${
                    qualityFilter === "Overripe" ? "active" : ""
                  }`}
                  onClick={() => handleQualityFilterChange("Overripe")}
                >
                  Overripe
                </button>
                <button
                  className={`btn btn-success ${
                    qualityFilter === "About to spoil" ? "active" : ""
                  }`}
                  onClick={() => handleQualityFilterChange("About to spoil")}
                >
                  About to Spoil
                </button>
              </div>
            </div>
          )}
          <div className="row">
            {(status === "Approved" ? filteredApprovedProducts : products.filter((product) => product.status === status)).map((product) => (
              <div className="col-md-3 col-lg-3 mb-4" key={product._id}>
                <div className="card shadow-sm">
                  <img
                    src={
                      product.image
                        ? `http://localhost:5000/${product.image}`
                        : "https://via.placeholder.com/150"
                    }
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      <strong>Quantity:</strong> {product.quantity} kg <br />
                      <strong>Quality:</strong> {product.grade} <br />
                      <strong>Location:</strong> {product.location} <br />
                      <strong>Price:</strong> LKR {product.price}
                    </p>
                    {/* Buttons for Pending Products */}
                    {product.status === "Pending" && (
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-success"
                          onClick={() => handleStatusChange(product._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleStatusChange(product._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMarketplace;
