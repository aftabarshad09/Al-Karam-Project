// src/context/ShopContext.jsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Added for potential toast navigation

// --- MOCK PRODUCT DATA (20 items with HTTP links) ---
const MOCK_PRODUCTS = [
    { id: 101, name: "Premium Basmati Rice 5kg", price: 25.50, special_price: 22.99, image_url: "https://via.placeholder.com/600x400/f0f0f0/333333?text=Rice+5kg", colors: ["White"], sizes: ["5kg", "10kg"] },
    { id: 102, name: "Luxury Detergent Powder", price: 15.99, special_price: null, image_url: "https://via.placeholder.com/600x400/add8e6/000000?text=Detergent", colors: ["Blue", "Green"], sizes: ["Small", "Large"] },
    { id: 103, name: "Organic Olive Oil 1L", price: 28.75, special_price: 24.99, image_url: "https://via.placeholder.com/600x400/90ee90/000000?text=Olive+Oil", colors: [], sizes: ["500ml", "1L"] },
    { id: 104, name: "Assorted Tea Bags (100ct)", price: 8.50, special_price: null, image_url: "https://via.placeholder.com/600x400/f08080/000000?text=Tea+Bags", colors: ["Brown"], sizes: [] },
    { id: 105, name: "Fresh Chicken Breast 1kg", price: 12.00, special_price: null, image_url: "https://via.placeholder.com/600x400/ffa07a/000000?text=Chicken+1kg", colors: [], sizes: ["500g", "1kg"] },
    { id: 106, name: "Designer Hand Soap", price: 6.99, special_price: 5.50, image_url: "https://via.placeholder.com/600x400/e6e6fa/000000?text=Hand+Soap", colors: ["Pink", "Blue", "Yellow"], sizes: [] },
    { id: 107, name: "Electric Kettle (Stainless)", price: 45.00, special_price: null, image_url: "https://via.placeholder.com/600x400/cccccc/000000?text=Kettle", colors: ["Silver", "Black"], sizes: [] },
    { id: 108, name: "Children's Cereal Box", price: 4.99, special_price: null, image_url: "https://via.placeholder.com/600x400/fffacd/000000?text=Cereal+Box", colors: [], sizes: [] },
    { id: 109, name: "Multipurpose Cleaning Spray", price: 3.50, special_price: null, image_url: "https://via.placeholder.com/600x400/afeeee/000000?text=Cleaning+Spray", colors: [], sizes: [] },
    { id: 110, name: "Luxury Bath Towel Set", price: 39.99, special_price: 34.99, image_url: "https://via.placeholder.com/600x400/bdb76b/000000?text=Towel+Set", colors: ["Beige", "Grey", "White"], sizes: ["S", "M", "L", "XL"] },
    { id: 111, name: "Digital Weighing Scale", price: 22.50, special_price: null, image_url: "https://via.placeholder.com/600x400/87cefa/000000?text=Scale", colors: ["White", "Silver"], sizes: [] },
    { id: 112, name: "Frozen Pizza (Pepperoni)", price: 9.99, special_price: 7.99, image_url: "https://via.placeholder.com/600x400/f08080/000000?text=Frozen+Pizza", colors: [], sizes: [] },
    { id: 113, name: "Watermelon (Seasonal)", price: 5.20, special_price: null, image_url: "https://via.placeholder.com/600x400/98fb98/000000?text=Watermelon", colors: [], sizes: [] },
    { id: 114, name: "Premium Shaving Cream", price: 7.50, special_price: null, image_url: "https://via.placeholder.com/600x400/d3d3d3/000000?text=Shaving+Cream", colors: [], sizes: [] },
    { id: 115, name: "Stainless Steel Cookware Set", price: 150.00, special_price: 125.00, image_url: "https://via.placeholder.com/600x400/b0c4de/000000?text=Cookware+Set", colors: ["Silver"], sizes: [] },
    { id: 116, name: "LED Smart Bulb", price: 18.00, special_price: null, image_url: "https://via.placeholder.com/600x400/ffd700/000000?text=Smart+Bulb", colors: ["White"], sizes: [] },
    { id: 117, name: "Plastic Storage Bins (3-Pack)", price: 29.99, special_price: 24.99, image_url: "https://via.placeholder.com/600x400/e6e6fa/000000?text=Storage+Bins", colors: ["Clear", "Blue"], sizes: ["Small", "Medium"] },
    { id: 118, name: "Assorted Chocolate Box", price: 19.50, special_price: null, image_url: "https://via.placeholder.com/600x400/d2b48c/000000?text=Chocolate+Box", colors: [], sizes: [] },
    { id: 119, name: "Pet Food (Dog) 10kg", price: 40.00, special_price: 35.99, image_url: "https://via.placeholder.com/600x400/a0522d/000000?text=Dog+Food", colors: [], sizes: ["5kg", "10kg"] },
    { id: 120, name: "Rechargeable Batteries (4-Pack)", price: 11.99, special_price: null, image_url: "https://via.placeholder.com/600x400/f5deb3/000000?text=Batteries", colors: [], sizes: [] },
];

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

const normalizeProduct = (p) => ({
    id: p.id,
    name: p.name || "Unknown Product",
    price: Number(p.price || 0),
    special_price: Number(p.special_price) || null,
    image_url: p.image_url || "https://via.placeholder.com/600/FFFFFF?text=No+Image",
    colors: p.colors || [],
    sizes: p.sizes || [],
});

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([
        { id: 101, product: normalizeProduct(MOCK_PRODUCTS.find(p => p.id === 101)), quantity: 2 },
    ]);
    const [wishlist, setWishlist] = useState([
        { id: 104, product: normalizeProduct(MOCK_PRODUCTS.find(p => p.id === 104)) },
    ]);
    const [toasts, setToasts] = useState([]);

    // --- Toast Notifications ---
    const showToast = (message, type = "success") => {
        const id = Date.now() + Math.random();
        setToasts(t => [...t, { id, message, type }]);
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
    };
    const dismissToast = (id) => setToasts(t => t.filter(x => x.id !== id));

    // --- Cart Actions ---
    const addToCart = (productData, quantity = 1) => {
        const product = normalizeProduct(productData);
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prevCart, { id: product.id, product, quantity }];
            }
        });
        showToast(`'${product.name}' added to cart!`, 'success');
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        showToast('Item removed from cart.', 'info');
    };

    const changeQty = (productId, delta) => {
        setCart(prevCart => {
            const newCart = prevCart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + delta } : item
            ).filter(item => item.quantity > 0);
            return newCart;
        });
    };
    
    const clearCart = () => {
        setCart([]);
    };

    // --- Wishlist Actions ---
    const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

    const toggleWishlist = (productData) => {
        const product = normalizeProduct(productData);
        if (isInWishlist(product.id)) {
            setWishlist(prevList => prevList.filter(item => item.id !== product.id));
            showToast(`'${product.name}' removed from wishlist.`, 'info');
        } else {
            setWishlist(prevList => [...prevList, { id: product.id, product }]);
            showToast(`'${product.name}' added to wishlist.`, 'success');
        }
    };
    
    const removeFromWishlist = (productId) => {
        setWishlist(prevList => prevList.filter(item => item.id !== productId));
        showToast('Item removed from wishlist.', 'info');
    };
    
    const moveFromWishlistToCart = (productId) => {
        const wishlistItem = wishlist.find(item => item.id === productId);
        if (wishlistItem) {
            addToCart(wishlistItem.product, 1);
            removeFromWishlist(productId);
        }
    };

    // --- Calculations ---
    const subtotal = useMemo(() => 
        cart.reduce((sum, item) => 
            sum + (item.product.special_price || item.product.price) * item.quantity, 0), 
    [cart]);

    const TAX_RATE = 0.10; 
    const SHIPPING_FEE = 5.00; 

    const tax = useMemo(() => +(subtotal * TAX_RATE).toFixed(2), [subtotal]);
    const shipping = useMemo(() => (cart.length > 0 ? SHIPPING_FEE : 0), [cart.length]);
    const total = useMemo(() => +(subtotal + tax + shipping).toFixed(2), [subtotal, tax, shipping]);

    const contextValue = {
        MOCK_PRODUCTS,
        cart,
        wishlist,
        toasts,
        subtotal,
        tax,
        shipping,
        total,
        addToCart,
        removeFromCart,
        changeQty,
        clearCart,
        toggleWishlist,
        removeFromWishlist,
        moveFromWishlistToCart,
        isInWishlist,
        dismissToast,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
            <ToastContainer toasts={toasts} dismissToast={dismissToast} />
        </ShopContext.Provider>
    );
};

// --- Toast Component (Internal) ---
const ToastContainer = ({ toasts, dismissToast }) => {
    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <div key={toast.id} className={`toast toast-${toast.type}`} onClick={() => dismissToast(toast.id)}>
                    <span>{toast.message}</span>
                    <button className="toast-close-btn">&times;</button>
                </div>
            ))}
        </div>
    );
};