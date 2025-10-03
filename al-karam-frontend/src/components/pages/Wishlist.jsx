import React from 'react';
import { useShop } from './ShopContext';
import { useNavigate } from 'react-router-dom';
import '../style/wishlist.css';

const Wishlist = () => {
  const { 
    wishlist, 
    removeFromWishlist, 
    moveToCartFromWishlist,
    isInWishlist 
  } = useShop();
  
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return `PKR ${price.toLocaleString()}`;
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
        </div>
        <div className="empty-wishlist">
          <div className="empty-icon">
            <i className="far fa-heart"></i>
          </div>
          <h2>Your wishlist is empty</h2>
          <p>Save items you love for later</p>
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
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist ({wishlist.length})</h1>
        <p>Items you've saved for later</p>
      </div>

      <div className="wishlist-grid">
        {wishlist.map(product => (
          <div key={product.id} className="wishlist-item">
            <div className="wishlist-item-image">
              <img 
                src={product.image} 
                alt={product.name}
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <button 
                className="remove-wishlist-btn"
                onClick={() => removeFromWishlist(product.id)}
                title="Remove from wishlist"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="wishlist-item-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-brand">{product.brand}</p>
              
              <div className="product-pricing">
                {product.specialPrice ? (
                  <>
                    <span className="special-price">
                      {formatPrice(product.specialPrice)}
                    </span>
                    <span className="original-price">
                      {formatPrice(product.price)}
                    </span>
                    <span className="discount-badge">
                      -{Math.round(((product.price - product.specialPrice) / product.price) * 100)}%
                    </span>
                  </>
                ) : (
                  <span className="price">{formatPrice(product.price)}</span>
                )}
              </div>

              <div className="wishlist-actions">
                <button 
                  className="btn-move-to-cart"
                  onClick={() => moveToCartFromWishlist(product.id)}
                >
                  <i className="fas fa-shopping-cart"></i>
                  Move to Cart
                </button>
                <button 
                  className="btn-view-details"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="wishlist-footer">
        <button 
          className="btn-continue-shopping"
          onClick={() => navigate('/products')}
        >
          <i className="fas fa-arrow-left"></i>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Wishlist;