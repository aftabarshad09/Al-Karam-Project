import React, { createContext, useContext, useState, useMemo } from 'react';

// Create Context
const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Toast System
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item exists
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...product, quantity }];
      }
    });
    showToast(`${product.name} added to cart!`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'info');
  };

  // Wishlist Actions
  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.find(item => item.id === product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
    showToast(`${product.name} added to wishlist!`, 'success');
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
    showToast('Item removed from wishlist', 'info');
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const moveToCartFromWishlist = (productId) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
    }
  };

  // Calculations
  const cartCalculations = useMemo(() => {
    const subtotal = cart.reduce((total, item) => {
      const price = item.specialPrice || item.price;
      return total + (price * item.quantity);
    }, 0);

    const taxRate = 0.10; // 10% tax
    const shippingThreshold = 5000; // Free shipping above 5000
    const shippingFee = subtotal > shippingThreshold ? 0 : 200;

    const tax = subtotal * taxRate;
    const total = subtotal + tax + shippingFee;

    return {
      subtotal: Math.round(subtotal),
      tax: Math.round(tax),
      shipping: shippingFee,
      total: Math.round(total),
      itemCount: cart.reduce((count, item) => count + item.quantity, 0)
    };
  }, [cart]);

  const value = {
    // State
    cart,
    wishlist,
    toasts,
    
    // Cart Actions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    
    // Wishlist Actions
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    moveToCartFromWishlist,
    
    // Toast Actions
    dismissToast,
    
    // Calculations
    ...cartCalculations
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </ShopContext.Provider>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, dismissToast }) => {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => dismissToast(toast.id)}
        >
          <div className="toast-content">
            <span className="toast-message">{toast.message}</span>
            <button className="toast-close" onClick={() => dismissToast(toast.id)}>
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};