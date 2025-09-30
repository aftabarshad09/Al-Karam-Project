import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/SignIn";
import ForgotPassword from "./components/forget-password";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Redirect to login by default */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
