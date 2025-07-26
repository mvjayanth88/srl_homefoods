// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  
  return (
    <CartContext.Provider value={{ cart, setCart, products, setProducts }}>
      {children}
    </CartContext.Provider>
  );
};
