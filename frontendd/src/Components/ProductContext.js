import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fetch All Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://veg-bridge-u2j3.vercel.app/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Update Product Status
  const updateProductStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from storage
      const res = await axios.put(
        `https://veg-bridge-u2j3.vercel.app/api/products/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
    } catch (error) {
      console.error("Error updating product status:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts, updateProductStatus }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export default ProductContext;
