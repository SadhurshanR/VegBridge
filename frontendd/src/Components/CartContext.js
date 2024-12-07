import React, { createContext, useContext, useState } from 'react';

// Create Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart as a new entry
  const addToCart = (product) => {
    setCart((prevCart) => [
      ...prevCart,
      { ...product, selectedQuantity: 1 }, // Always add a new entry
    ]);
  };

  const updateCartItem = (id, index, quantityChange) => {
    setCart((prevCart) =>
      prevCart.map((item, idx) =>
        idx === index
          ? { ...item, selectedQuantity: Math.max(1, item.selectedQuantity + quantityChange) }
          : item
      )
    );
  };

  // Remove an item from the cart
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, idx) => idx !== index));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Context value
  const value = {
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart, // Include clearCart here
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


// Use Cart Context
export const useCartContext = () => useContext(CartContext);
