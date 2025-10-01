// src/components/pages/Checkout.jsx
import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import '../../style/checkout.css'; 

const Checkout = () => {
    const { cart, subtotal, tax, shipping, total, clearCart, showToast } = useShop();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '', email: '', address: '', city: '', zip: '', paymentMethod: 'Card'
    });

    const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            showToast("Your cart is empty.", "error");
            return;
        }

        // BACKEND INTEGRATION POINT: Send order data here.
        console.log("Placing Order. Data sent to API:", { items: cart, formData });
        
        clearCart(); 
        showToast('Order Placed Successfully! Thank you.', 'success');
        
        navigate('/order-success');
    };
    
    if (cart.length === 0) {
        return (
            <div className="page-layout checkout-page container">
                <h1 className="page-header">Checkout</h1>
                <div className="empty-state">
                    <p>Nothing to checkout.</p>
                    <button className="btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-layout checkout-page container">
            <h1 className="page-header">Secure Checkout</h1>
            
            <form onSubmit={handlePlaceOrder} className="checkout-content-grid">
                
                {/* LEFT: Shipping and Payment Form */}
                <div className="checkout-form-section card">
                    <h2>1. Shipping Details</h2>
                    <label htmlFor="fullName">Full Name</label>
                    <input id="fullName" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    
                    <label htmlFor="address">Address</label>
                    <input id="address" type="text" name="address" value={formData.address} onChange={handleChange} required />
                    
                    <div className="address-group">
                        <div>
                            <label htmlFor="city">City</label>
                            <input id="city" type="text" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="zip">Zip Code</label>
                            <input id="zip" type="text" name="zip" value={formData.zip} onChange={handleChange} required />
                        </div>
                    </div>

                    <h2>2. Payment Method</h2>
                    <div className="payment-options">
                        <label className="radio-option">
                            <input type="radio" name="paymentMethod" value="Card" checked={formData.paymentMethod === 'Card'} onChange={handleChange} /> Card
                        </label>
                        <label className="radio-option">
                            <input type="radio" name="paymentMethod" value="PayPal" checked={formData.paymentMethod === 'PayPal'} onChange={handleChange} /> PayPal
                        </label>
                    </div>
                    
                    {formData.paymentMethod === 'Card' && (
                        <div className="card-details">
                            <input type="text" placeholder="Card Number" required />
                            <input type="text" placeholder="MM/YY" required style={{ width: '80px' }} />
                        </div>
                    )}
                </div>

                {/* RIGHT: Order Summary and Final Action */}
                <div className="order-summary-section card">
                    <h2>3. Review & Pay</h2>
                    
                    <div className="item-review-list">
                        {cart.map(item => (
                            <div key={item.id} className="item-review">
                                <span className="name">{item.product.name}</span>
                                <span className="qty">x{item.quantity}</span>
                                <span className="price">{formatPrice(item.product.special_price || item.product.price)}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="summary-breakdown">
                        <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                        <div className="summary-row"><span>Tax (10%)</span><span>{formatPrice(tax)}</span></div>
                        <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
                        <hr />
                        <div className="summary-row grand-total"><span>Order Total</span><span>{formatPrice(total)}</span></div>
                    </div>
                    
                    <button type="submit" className="btn-place-order primary">
                        <i className="fas fa-check-circle"></i> Place Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;