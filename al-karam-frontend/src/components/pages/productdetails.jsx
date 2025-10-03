import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useShop } from "./ShopContext";
import "../style/productdetails.css";


const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useShop(); // Changed from useCart to useShop

  const [quantity, setQuantity] = useState(1);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  // Get product data from navigation state or use mock data
  const product = location.state?.product || {
    id: 1,
    name: "Premium Product",
    brand: "Grabsy",
    price: 2999,
    specialPrice: 2499,
    description: "High-quality product with excellent features and durability.",
    category: "electronics",
    image: "https://via.placeholder.com/500"
  };

  // Generate product gallery images
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  ];
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  // Mock product details
  const productDetails = {
    description: "This premium product is designed with cutting-edge technology and superior materials to deliver exceptional performance. Perfect for both professional and personal use, it combines style with functionality.",
    features: [
      "Premium quality materials",
      "Advanced technology integration",
      "Ergonomic design for comfort",
      "Long-lasting battery life",
      "Easy to use and maintain",
      "Eco-friendly packaging"
    ],
    specifications: [
      { label: "Brand", value: product.brand },
      { label: "Model", value: "2024 Edition" },
      { label: "Warranty", value: "2 Years" },
      { label: "Material", value: "Aluminium & Carbon Fiber" },
      { label: "Weight", value: "1.2 kg" },
      { label: "Dimensions", value: "30 x 20 x 10 cm" },
      { label: "Color", value: "Matte Black" },
      { label: "SKU", value: `ALK-${product.id.toString().padStart(4, '0')}` }
    ],
    reviews: [
      {
        id: 1,
        author: "Alex Johnson",
        rating: 5,
        comment: "Absolutely love this product! Exceeded all my expectations. The quality is outstanding and it works perfectly.",
        date: "2024-01-15"
      },
      {
        id: 2,
        author: "Sarah Miller",
        rating: 4,
        comment: "Great value for money. Works perfectly and looks even better in person. Highly recommended!",
        date: "2024-01-10"
      },
      {
        id: 3,
        author: "David Kim",
        rating: 5,
        comment: "Best purchase I've made this year! The quality is exceptional and customer service was excellent.",
        date: "2024-01-08"
      },
      {
        id: 4,
        author: "Emma Wilson",
        rating: 5,
        comment: "Stylish, sturdy, and worth every penny! I use it daily and it hasn't disappointed me once.",
        date: "2024-01-05"
      }
    ]
  };

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) =>
        prev === productDetails.reviews.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [productDetails.reviews.length]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate('/cart');
  };

  const discount = product.specialPrice 
    ? Math.round(((product.price - product.specialPrice) / product.price) * 100)
    : 0;

  return (
    <div>
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')}>Home</span>
          <i className="fas fa-chevron-right"></i>
          <span onClick={() => navigate('/products')}>Products</span>
          <i className="fas fa-chevron-right"></i>
          <span className="current">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="product-main-section">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="thumbnail-list">
              {galleryImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  className={`thumbnail ${img === activeImage ? 'active-thumb' : ''}`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
            <div className="main-image">
              <img src={activeImage} alt={product.name} />
              {discount > 0 && (
                <div className="discount-badge">-{discount}% OFF</div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <span className="product-brand">{product.brand}</span>
              <h1>{product.name}</h1>
              <div className="product-rating">
                <div className="stars">
                  {"★".repeat(5)}
                  <span className="rating-text">4.8 (124 reviews)</span>
                </div>
              </div>
            </div>

            <div className="price-section">
              {product.specialPrice ? (
                <div className="discount-pricing">
                  <span className="special-price">Rs. {product.specialPrice.toLocaleString()}</span>
                  <span className="original-price">Rs. {product.price.toLocaleString()}</span>
                  <span className="discount-percentage">Save {discount}%</span>
                </div>
              ) : (
                <span className="price">Rs. {product.price.toLocaleString()}</span>
              )}
            </div>

            <p className="short-description">{product.description}</p>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    <i className="fas fa-minus"></i>
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  <i className="fas fa-shopping-cart"></i>
                  Add to Cart
                </button>
                <button className="buy-now-btn" onClick={handleBuyNow}>
                  <i className="fas fa-bolt"></i>
                  Buy Now
                </button>
              </div>
            </div>

            <div className="product-features">
              <div className="feature">
                <i className="fas fa-shipping-fast"></i>
                <span>Free Shipping</span>
              </div>
              <div className="feature">
                <i className="fas fa-undo"></i>
                <span>30-Day Returns</span>
              </div>
              <div className="feature">
                <i className="fas fa-shield-alt"></i>
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-details-tabs">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              <i className="fas fa-info-circle"></i>
              Description
            </button>
            <button 
              className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              <i className="fas fa-cogs"></i>
              Specifications
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <i className="fas fa-comments"></i>
              Reviews ({productDetails.reviews.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Product Description</h3>
                <p>{productDetails.description}</p>
                <div className="features-list">
                  <h4>Key Features:</h4>
                  <ul>
                    {productDetails.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <h3>Technical Specifications</h3>
                <div className="specifications-table">
                  {productDetails.specifications.map((spec, index) => (
                    <div key={index} className="spec-row">
                      <span className="spec-label">{spec.label}</span>
                      <span className="spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <h3>Customer Reviews</h3>
                <div className="reviews-container">
                  <div className="reviews-slider">
                    {productDetails.reviews.map((review, index) => (
                      <div
                        key={review.id}
                        className={`review-card ${index === currentReviewIndex ? 'active' : ''}`}
                      >
                        <div className="review-header">
                          <div className="review-rating">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </div>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <p className="review-text">
                          <i className="fas fa-quote-left"></i>
                          {review.comment}
                        </p>
                        <div className="review-author">
                          - {review.author}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="review-dots">
                    {productDetails.reviews.map((_, index) => (
                      <button
                        key={index}
                        className={`review-dot ${index === currentReviewIndex ? 'active' : ''}`}
                        onClick={() => setCurrentReviewIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        
      </div>
      
    </div>
  );
};

export default ProductDetail;