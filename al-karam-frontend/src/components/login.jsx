import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/auth.css";
import logo from ".././asserts/Alkaram_logo.jpg";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      // 🔑 Firebase Email/Password login logic will be added here later

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      setLoading(true);

      // 🔑 Firebase Google login logic will be added here later

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="Alkaram Logo" className="auth-logo" />
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue shopping with Al-Karam</p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>
        <button
          className="btn-google"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <i className="fab fa-google google-icon"></i>
          Continue with Google
        </button>


        <p className="auth-text">
          Forgot password?{" "}
          <Link to="/forgot-password" className="auth-link">
            Reset here
          </Link>
        </p>
        <p className="auth-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
