import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";


function App() {
  const [cartItems, setCartItems] = useState([]);

  // Handle adding items to the cart
  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Handle removing items from the cart
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    // Implement checkout logic
    console.log("Checkout completed!");
    setCartItems([]); // Clear the cart after checkout
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route 
          path="/menu" 
          element={<Menu onAddToCart={handleAddToCart} />} 
        />
        <Route 
          path="/cart" 
          element={<Cart 
            cartItems={cartItems} 
            onRemoveItem={handleRemoveItem} 
            onCheckout={handleCheckout} 
          />} 
        />
      </Routes>
    </Router>
  );
}

export default App;