import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from './ShopContext';
import '../style/productcard.css';

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (onAddToWishlist) {
      onAddToWishlist(product.id, !isWishlisted);
    }
    toggleWishlist(product);
  };

  const handleProductClick = () => {
    navigate('/product-detail', { 
      state: { product } 
    });
  };

  const discount = product.specialPrice 
    ? Math.round(((product.price - product.specialPrice) / product.price) * 100)
    : 0;

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x300/667eea/ffffff?text=${product.name}`;
          }}
        />
        {discount > 0 && (
          <span className="discount-badge">-{discount}%</span>
        )}
        <button 
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={handleWishlistClick}
        >
          <i className={`fas ${isWishlisted ? 'fa-heart' : 'fa-heart'}`}></i>
        </button>
      </div>

      <div className="product-info">
        <h6 className="product-brand">{product.brand}</h6>
        <h5 className="product-name">{product.name}</h5>
        
        <div className="product-pricing">
          {product.specialPrice ? (
            <>
              <h4 className="special-price">PKR {product.specialPrice.toLocaleString()}</h4>
              <h6 className="original-price">PKR {product.price.toLocaleString()}</h6>
            </>
          ) : (
            <h4 className="price">PKR {product.price.toLocaleString()}</h4>
          )}
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <i className="fas fa-shopping-cart"></i>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;