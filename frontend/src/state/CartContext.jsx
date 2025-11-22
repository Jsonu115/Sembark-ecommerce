import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // prevent refresh empty state

  // Load cart from localStorage on first render
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Error loading cart from storage:", err);
    }
    setLoading(false); // storage loaded
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem("cartItems", JSON.stringify(items));
      } catch (err) {
        console.error("Error saving cart to storage:", err);
      }
    }
  }, [items, loading]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  };

  // Remove single item
  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  // Clear entire cart
  const clear = () => setItems([]);

  // Calculate total items & subtotal
  const { totalItems, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity;
        acc.subtotal += item.quantity * item.product.price;
        return acc;
      },
      { totalItems: 0, subtotal: 0 }
    );
  }, [items]);

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeItem,
    clear,
    totalItems,
    subtotal,
  };

  // Prevent rendering empty cart during load
  if (loading) return null;

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};
