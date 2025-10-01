// src/components/pages/Cart.jsx
import React from 'react';
import { useShop } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import '../../style/cart.css'; 

const Cart = () => {
    const { 
        cart, 
        removeFromCart, 
        changeQty, 
        subtotal, 
        tax, 
        shipping, 
        total
    } = useShop();
    
    const navigate = useNavigate();

    const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

    return (
        <div className="page-layout cart-page container">
            <h1 className="page-header">Shopping Cart ({cart.length})</h1>

            {cart.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-shopping-basket fa-4x" />
                    <p>Your Cart is currently empty.</p>
                    <button className="btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
                </div>
            ) : (
                <div className="cart-content-grid">
                    
                    {/* LEFT: Cart Items List */}
                    <div className="cart-item-list">
                        {cart.map((item) => {
                            const product = item.product;
                            const price = product.special_price || product.price;
                            const lineTotal = price * item.quantity;
                            
                            return (
                                <div key={item.id} className="cart-line-item card">
                                    <img src={product.image_url} alt={product.name} className="item-image" />
                                    
                                    <div className="item-details">
                                        <h3 className="item-name">{product.name}</h3>
                                        <p className="item-price-unit">{formatPrice(price)} each</p>
                                        <button className="btn-remove-small" onClick={() => removeFromCart(item.id)}>
                                            <i className="fas fa-trash-alt"></i> Remove
                                        </button>
                                    </div>

                                    <div className="item-controls">
                                        <div className="quantity-selector">
                                            <button onClick={() => changeQty(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                                            <span className="qty-display">{item.quantity}</span>
                                            <button onClick={() => changeQty(item.id, +1)}>+</button>
                                        </div>
                                        <h4 className="item-line-total">{formatPrice(lineTotal)}</h4>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* RIGHT: Summary Panel */}
                    <div className="order-summary-panel card">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal ({cart.length} items)</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (10%)</span>
                            <span>{formatPrice(tax)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className={shipping === 0 ? 'free' : ''}>
                                {shipping === 0 ? "FREE" : formatPrice(shipping)}
                            </span>
                        </div>
                        
                        <hr />

                        <div className="summary-row grand-total">
                            <span className="total-label">Order Total</span>
                            <span className="total-amount">{formatPrice(total)}</span>
                        </div>

                        <button 
                            className="btn-checkout primary" 
                            onClick={() => navigate("/checkout")}
                        >
                            <i className="fas fa-credit-card"></i> Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;