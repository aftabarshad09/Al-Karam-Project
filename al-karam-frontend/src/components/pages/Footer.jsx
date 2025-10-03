import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css';
import logo from '../../asserts/Alkaram_logo.jpg'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-placeholder">
                <img src={logo}></img>
              </div>
              <div className="footer-store-name">
                <h3>Al-Karam</h3>
                <span>Departmental Store</span>
              </div>
            </div>
            <p className="footer-description">
              Your one-stop destination for all daily needs. We provide quality products 
              at affordable prices with excellent customer service.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/today-deals">Today's Deals</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><Link to="/category/electronics">Electronics</Link></li>
              <li><Link to="/category/grocery">Grocery</Link></li>
              <li><Link to="/category/beauty">Beauty & Personal Care</Link></li>
              <li><Link to="/category/home">Home & Kitchen</Link></li>
              <li><Link to="/category/baby">Baby Products</Link></li>
              <li><Link to="/category/sports">Sports & Fitness</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul className="footer-links">
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/returns">Return Policy</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/support">Support Center</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Main Street, City, State 12345</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@alkaramstore.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>Mon-Sun: 9:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h4>Subscribe to Our Newsletter</h4>
              <p>Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                Subscribe <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2024 Al-Karam Departmental Store. All rights reserved.</p>
            </div>
            <div className="payment-methods">
              <div className="payment-icons">
                <i className="fab fa-cc-visa"></i>
                <i className="fab fa-cc-mastercard"></i>
                <i className="fab fa-cc-paypal"></i>
                <i className="fab fa-cc-apple-pay"></i>
                <i className="fab fa-cc-amazon-pay"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;