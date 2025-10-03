import React from 'react';
import { useShop } from './ShopContext';
import { useNavigate } from 'react-router-dom';
import '../style/cart.css';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity,
    subtotal,
    tax,
    shipping,
    total,
    itemCount,
    clearCart
  } = useShop();
  
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return `PKR ${price.toLocaleString()}`;
  };

  const handleQuantityChange = (productId, change) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      const newQuantity = product.quantity + change;
      updateCartQuantity(productId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="empty-cart">
          <div className="empty-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <h2>Your cart is empty</h2>
          <p>Add some items to get started</p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/products')}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart ({itemCount} items)</h1>
        <button 
          className="btn-clear-cart"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img 
                  src={item.image} 
                  alt={item.name}
                  onClick={() => navigate(`/product/${item.id}`)}
                />
              </div>

              <div className="cart-item-details">
                <h3 className="product-name">{item.name}</h3>
                <p className="product-brand">{item.brand}</p>
                <p className="product-category">{item.category}</p>
                
                <div className="product-pricing">
                  {item.specialPrice ? (
                    <>
                      <span className="special-price">
                        {formatPrice(item.specialPrice)}
                      </span>
                      <span className="original-price">
                        {formatPrice(item.price)}
                      </span>
                    </>
                  ) : (
                    <span className="price">{formatPrice(item.price)}</span>
                  )}
                </div>

                <button 
                  className="btn-remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="fas fa-trash"></i>
                  Remove
                </button>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  {formatPrice((item.specialPrice || item.price) * item.quantity)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({itemCount} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free-shipping' : ''}>
                {shipping === 0 ? 'FREE' : formatPrice(shipping)}
              </span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span className="total-amount">{formatPrice(total)}</span>
            </div>

            <button 
              className="btn-checkout"
              onClick={() => navigate('/checkout')}
            >
              <i className="fas fa-credit-card"></i>
              Proceed to Checkout
            </button>

            <button 
              className="btn-continue-shopping"
              onClick={() => navigate('/products')}
            >
              <i className="fas fa-arrow-left"></i>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;