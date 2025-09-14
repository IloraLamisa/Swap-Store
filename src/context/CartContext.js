import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Restore cart on app load
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('cart');
      if (stored) setItems(JSON.parse(stored));
    })();
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(it => it.id === product.id);
      if (existing) {
        return prev.map(it =>
          it.id === product.id ? { ...it, qty: it.qty + qty } : it
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const changeQty = (id, delta) => {
    setItems(prev =>
      prev.map(it =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
      )
    );
  };

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, addToCart, changeQty, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};