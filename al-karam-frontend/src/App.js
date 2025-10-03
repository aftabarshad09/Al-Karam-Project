// App.js (Corrected Routing)
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom"; // Add Outlet if you want to use it in App.js for non-Layout routes

import SignUp from "./components/signup";
import Login from "./components/login";
import ForgotPassword from "./components/forget-password";
import Home from "./components/pages/home";
import Layout from "./components/layout";
import { ShopProvider } from './components/pages/ShopContext';
import Wishlist from "./components/pages/Wishlist";
import Cart from "./components/pages/Cart";
import ProductDetail from "./components/pages/productdetails";
// import Advertise from "./components/advertise"; // <-- Unused import, can be removed

function App() {
  return (
    <ShopProvider>

      <Router>
        <Routes>

          {/* Protected routes with layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} /> 
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product-detail" element={<ProductDetail />} />
          </Route>

          {/* Public routes without layout */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Redirect to /account (login) for unhandled paths */}<Route path="*" element={<Navigate to="/account" replace />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;