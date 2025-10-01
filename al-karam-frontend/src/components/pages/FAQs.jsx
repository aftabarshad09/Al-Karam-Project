import React, { useState } from 'react';
import './faq.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What are your delivery hours and areas?",
      answer: "We deliver from 9:00 AM to 10:00 PM daily. We cover all major areas within the city. You can check if we deliver to your area by entering your postal code during checkout."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Perishable items and personal care products cannot be returned. Please contact our customer service for return requests."
    },
    {
      question: "Do you offer same-day delivery?",
      answer: "Yes, we offer same-day delivery for orders placed before 2:00 PM. Orders placed after 2:00 PM will be delivered the next day. Same-day delivery is subject to availability in your area."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, Apple Pay, Google Pay, and cash on delivery for eligible orders."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can also track your order by logging into your account and visiting the 'Order History' section."
    },
    {
      question: "Is there a minimum order amount for delivery?",
      answer: "Yes, we have a minimum order amount of PKR 500 for delivery. Orders below this amount can be picked up from our store location."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer special discounts for bulk orders and corporate clients. Please contact our sales team at bulkorders@alkaramstore.com for customized pricing."
    },
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking on the 'Sign Up' button in the top right corner. You'll need to provide your email address, create a password, and verify your email to complete registration."
    },
    {
      question: "What if I receive a damaged or wrong item?",
      answer: "If you receive a damaged or incorrect item, please contact us within 24 hours of delivery. We'll arrange for a replacement or refund. Please keep the original packaging and provide photos of the issue."
    },
    {
      question: "Do you have physical stores?",
      answer: "Yes, we have multiple physical stores across the city. You can find our store locations on the 'Store Locator' page. Our main store is located at 123 Main Street, City, State 12345."
    },
    {
      question: "How do I apply coupons or promo codes?",
      answer: "You can apply coupons or promo codes during checkout. Enter the code in the 'Promo Code' field and click 'Apply'. The discount will be automatically calculated and reflected in your order total."
    },
    {
      question: "What are your COVID-19 safety measures?",
      answer: "We follow strict safety protocols including contactless delivery, regular sanitization of delivery vehicles, temperature checks for staff, and proper use of masks and gloves. All products are handled with care to ensure your safety."
    }
  ];

  return (
    <div className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about shopping at Al-Karam Departmental Store</p>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <div 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <h4>{faq.question}</h4>
                  <i className={`fas fa-chevron-${activeIndex === index ? 'up' : 'down'}`}></i>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-sidebar">
            <div className="help-card">
              <div className="help-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h4>Still Need Help?</h4>
              <p>Our customer support team is here to assist you</p>
              <div className="help-contacts">
                <div className="contact-method">
                  <i className="fas fa-phone"></i>
                  <div>
                    <span>Call Us</span>
                    <strong>+1 (555) 123-4567</strong>
                  </div>
                </div>
                <div className="contact-method">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <span>Email Us</span>
                    <strong>support@alkaramstore.com</strong>
                  </div>
                </div>
                <div className="contact-method">
                  <i className="fas fa-comments"></i>
                  <div>
                    <span>Live Chat</span>
                    <strong>Available 24/7</strong>
                  </div>
                </div>
              </div>
              <button className="help-btn">
                Contact Support <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;