import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/auth.css";
import logo from ".././asserts/Alkaram_logo.jpg";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      alert("User registered successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;


function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Validation logic
  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    // Pakistani phone validation
    if (!/^(\+92)[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be in format +92XXXXXXXXXX (Pakistan).";
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.terms) {
      newErrors.terms = "You must accept terms and conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      // 🔑 Firebase signup logic will be added later

      navigate("/login");
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);

      // 🔑 Firebase Google SignUp logic will be added here

      navigate("/");
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="Alkaram Logo" className="auth-logo" />
        <h2>Create Your Account</h2>
        <p className="auth-subtitle">Join Al-Karam to start shopping today</p>

        {errors.general && <p className="error-text">{errors.general}</p>}

        <form onSubmit={handleSignUp} noValidate>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}

          <input
            type="text"
            name="phone"
            placeholder="+92XXXXXXXXXX"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label>
              I agree to the <Link to="/terms">Terms & Conditions</Link>
            </label>
          </div>
          {errors.terms && <p className="error-text">{errors.terms}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button
          className="btn-google"
          onClick={handleGoogleSignUp}
          disabled={loading}
        >
          <i className="fab fa-google google-icon"></i>
          Continue with Google
        </button>

        <p className="auth-text">
          Already registered?{" "}
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
