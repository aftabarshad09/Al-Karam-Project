import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style/auth.css";
import logo from ".././asserts/Alkaram_logo.jpg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ error: "", success: "" });
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setStatus({ error: "", success: "" });

    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus({ error: "Enter a valid email address.", success: "" });
      return;
    }

    try {
      setLoading(true);

      // 🔑 Firebase reset password logic will be added later

      setStatus({
        error: "",
        success: "Password reset email sent! Check your inbox.",
      });
    } catch (err) {
      setStatus({ error: err.message, success: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="Alkaram Logo" className="auth-logo" />
        <h2>Reset Password</h2>
        {status.error && <p className="error-text">{status.error}</p>}
        {status.success && <p className="success-text">{status.success}</p>}
        <form onSubmit={handlePasswordReset}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p>
          Back to{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
