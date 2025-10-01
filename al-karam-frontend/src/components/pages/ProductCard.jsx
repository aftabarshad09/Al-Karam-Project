// src/components/ProductCard.jsx
import React from "react";
import { useShop } from "../context/ShopContext";
import "../style/product-card.css"; 

export default function ProductCard({ product }) {
    const { addToCart, toggleWishlist, isInWishlist } = useShop();
    
    const { id, name, price, special_price, image_url, colors = [], sizes = [] } = product;

    const wished = isInWishlist(id);
    const displayPrice = special_price || price;

    const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

    return (
        <div className="card product-card">
            {/* Wishlist Button (Top Right) */}
            <button
                className={`wishlist-btn ${wished ? "active" : ""}`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                }}
            >
                <i className={`${wished ? "fas" : "far"} fa-heart`} />
            </button>

            {/* Product Image */}
            <div className="img-wrap">
                <img className="product-img" src={image_url} alt={name} />
            </div>

            {/* Card Body */}
            <div className="card-body">
                <h3 className="title">{name}</h3>

                {/* Price with optional special price */}
                <div className="price-group">
                    {special_price && (
                        <span className="old-price">{formatPrice(price)}</span>
                    )}
                    <span className="current-price">
                        {formatPrice(displayPrice)}
                    </span>
                </div>

                {/* Optional Attributes */}
                {(sizes.length > 0 || colors.length > 0) && (
                    <div className="attributes-summary">
                        {sizes.length > 0 && <span>{sizes[0]}...</span>}
                        {colors.length > 0 && (
                            <div className="color-list">
                                {colors.slice(0, 3).map((c, idx) => (
                                    <span key={idx} className="color-dot" style={{ backgroundColor: c }}></span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                

                {/* Add to Cart Button (Small) */}
                <div className="actions">
                    <button
                        className="add-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product, 1);
                        }}
                    >
                        <i className="fas fa-cart-plus" /> Add
                    </button>
                </div>
            </div>
        </div>
    );
}