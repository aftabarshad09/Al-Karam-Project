// src/components/pages/Wishlist.jsx
import React from 'react';
import { useShop } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import '../../style/wishlist.css'; 

const Wishlist = () => {
    const { wishlist, removeFromWishlist, moveFromWishlistToCart } = useShop();
    const navigate = useNavigate();

    const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

    return (
        <div className="page-layout wishlist-page container">
            <h1 className="page-header">My Wishlist ({wishlist.length})</h1>

            {wishlist.length === 0 ? (
                <div className="empty-state">
                    <i className="far fa-heart fa-4x" />
                    <p>Your Wishlist is empty. Find something you love!</p>
                    <button className="btn-primary" onClick={() => navigate('/')}>Start Shopping</button>
                </div>
            ) : (
                <div className="wishlist-items-list">
                    {wishlist.map(item => {
                        const product = item.product;
                        const displayPrice = product.special_price || product.price;

                        return (
                            <div key={item.id} className="wishlist-item card">
                                <img 
                                    src={product.image_url} 
                                    alt={product.name} 
                                    className="item-image"
                                />
                                
                                <div className="item-details">
                                    <h3 className="item-name">{product.name}</h3>
                                    <p className="item-price">{formatPrice(displayPrice)}</p>
                                </div>

                                <div className="item-actions">
                                    <button 
                                        className="btn-move-to-cart"
                                        onClick={() => moveFromWishlistToCart(item.id)}
                                    >
                                        <i className="fas fa-cart-plus"></i> Move to Cart
                                    </button>
                                    <button 
                                        className="btn-remove"
                                        onClick={() => removeFromWishlist(item.id)}
                                    >
                                        <i className="fas fa-times"></i> Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Wishlist;