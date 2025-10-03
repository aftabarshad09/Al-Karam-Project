import React, { useState, useEffect, useRef } from 'react';
import { Link,Outlet, useNavigate, useLocation } from 'react-router-dom';
import './layout.css';
import Footer from './pages/Footer';
import logo from '../asserts/Alkaram_logo.jpg'

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredNavCategory, setHoveredNavCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const navRef = useRef(null);

  // Search functionality
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Categories with subcategories
  const categories = [
    {
      name: 'Beauty & Personal Care',
      icon: 'fas fa-spa',
      subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Bath & Body', 'Men\'s Grooming', 'Beauty Tools']
    },
    {
      name: 'Baby Products',
      icon: 'fas fa-baby',
      subcategories: ['Diapers', 'Baby Food', 'Baby Care', 'Nursing & Feeding', 'Baby Gear', 'Toys', 'Clothing']
    },
    {
      name: 'Cleaning & Households',
      icon: 'fas fa-broom',
      subcategories: ['Laundry', 'Dishwashing', 'All-Purpose Cleaners', 'Air Fresheners', 'Pest Control', 'Paper Products', 'Storage']
    },
    {
      name: 'Electronic Appliances',
      icon: 'fas fa-plug',
      subcategories: ['Kitchen Appliances', 'Home Entertainment', 'Computers', 'Mobile Devices', 'Audio Equipment', 'Cameras', 'Gaming']
    },
    {
      name: 'Accessories (Mobiles)',
      icon: 'fas fa-mobile-alt',
      subcategories: ['Phone Cases', 'Screen Protectors', 'Chargers', 'Headphones', 'Power Banks', 'Cables', 'Holders']
    },
    {
      name: 'Decor',
      icon: 'fas fa-couch',
      subcategories: ['Wall Art', 'Lighting', 'Rugs', 'Curtains', 'Vases', 'Mirrors', 'Clocks']
    },
    {
      name: 'Stationary',
      icon: 'fas fa-pencil-alt',
      subcategories: ['Pens & Pencils', 'Notebooks', 'Office Supplies', 'Art Materials', 'School Supplies', 'Calendars', 'Files & Folders']
    },
    {
      name: 'Crockery',
      icon: 'fas fa-utensils',
      subcategories: ['Dinner Sets', 'Mugs & Cups', 'Glassware', 'Serveware', 'Cutlery', 'Kitchen Tools', 'Bakeware']
    },
    {
      name: 'Toys',
      icon: 'fas fa-gamepad',
      subcategories: ['Educational Toys', 'Outdoor Toys', 'Board Games', 'Dolls & Action Figures', 'Puzzles', 'Building Sets', 'Soft Toys']
    }
  ];

  // Navigation categories with their subcategories
  const navigationCategories = [
    {
      name: "Today's Deals",
      subcategories: ['Flash Sales', 'Daily Offers', 'Weekend Specials', 'Clearance', 'Bundle Deals']
    },
    {
      name: "Accessories",
      subcategories: ['Mobile Accessories', 'Laptop Accessories', 'Audio Gear', 'Wearables', 'Charging Solutions']
    },
    {
      name: "Cleaning & Households",
      subcategories: ['Detergents', 'Cleaning Tools', 'Home Care', 'Organizers', 'Disinfectants']
    },
    {
      name: "Personal Care",
      subcategories: ['Grooming', 'Hair Care', 'Oral Care', 'Skin Care', 'Fragrances']
    },
    {
      name: "Stationary",
      subcategories: ['Office Supplies', 'Writing Instruments', 'Art Materials', 'School Items', 'Paper Products']
    },
    {
      name: "Electronic Appliances",
      subcategories: ['Kitchen Appliances', 'Home Entertainment', 'Computers', 'Smart Home', 'Gaming']
    }
  ];

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setHoveredCategory(null);
    setActiveCategory(null);
  };

  const handleCategoryHover = (categoryName) => {
    if (!isMobile) {
      setHoveredCategory(categoryName);
    }
  };

  const handleNavCategoryHover = (categoryName) => {
    if (!isMobile) {
      setHoveredNavCategory(categoryName);
    }
  };

  const handleNavCategoryLeave = () => {
    setHoveredNavCategory(null);
  };

  const handleCategoryClick = (category) => {
    if (isMobile) {
      setActiveCategory(activeCategory === category.name ? null : category.name);
    } else {
      navigate(`/category/${category.name.toLowerCase().replace(/ /g, '-')}`);
      setShowSidebar(false);
    }
  };

  const handleSubcategoryClick = (subcategory, category) => {
    navigate(`/category/${category.name.toLowerCase().replace(/ /g, '-')}/${subcategory.toLowerCase().replace(/ /g, '-')}`);
    setShowSidebar(false);
    setHoveredCategory(null);
    setActiveCategory(null);
  };

  const handleNavSubcategoryClick = (subcategory, category) => {
    navigate(`/category/${category.name.toLowerCase().replace(/ /g, '-')}/${subcategory.toLowerCase().replace(/ /g, '-')}`);
    setHoveredNavCategory(null);
  };

  const openLocationMap = () => {
    window.open('https://maps.google.com/?q=Al-Karam+Departmental+Store', '_blank');
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSidebar && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
        setHoveredCategory(null);
        setActiveCategory(null);
      }

      if (hoveredNavCategory && navRef.current && !navRef.current.contains(event.target)) {
        setHoveredNavCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSidebar, hoveredNavCategory]);

  return (
  
      <div className="header">
        {/* Upper Header */}
        <header className="upper-header">
          <div className="header-container">
            {/* Logo and Store Name */}
            <div className="logo-section">
              <Link to="/" className="logo-link">
                <div className="logo-placeholder">
                  <img src={logo}></img>
                </div>
                <div className="store-name">
                  <h1>Al-Karam</h1>
                  <span>Departmental Store</span>
                </div>
              </Link>
            </div>

            {/* Location - Hidden on mobile */}
            {!isMobile && (
              <div className="location-section" onClick={openLocationMap}>
                <i className="fas fa-map-marker-alt"></i>
                <span>Locate us in map</span>
              </div>
            )}

            {/* Search Bar */}
            <div className="search-section">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="search-button" onClick={handleSearch}>
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="user-actions">
              <Link to="/account" className="action-item">
                <i className="fas fa-user"></i>
                {!isMobile && <span>Account</span>}
              </Link>

              <Link to="/wishlist" className="action-item">
                <i className="fas fa-heart"></i>
                {!isMobile && <span>Wishlist</span>}
                {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
              </Link>

              <Link to="/cart" className="action-item">
                <i className="fas fa-shopping-cart"></i>
                {!isMobile && <span>Cart</span>}
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </Link>

              {/* Mobile menu button */}
              {isMobile && (
                <button className="mobile-menu-btn" onClick={toggleSidebar}>
                  <i className="fas fa-bars"></i>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Lower Header - Hidden on mobile */}
        {!isMobile && (
          <header className="lower-header" ref={navRef}>
            <div className="header-container">
              {/* All Categories Button */}
              <div className="categories-toggle">
                <button className="menu-button" onClick={toggleSidebar}>
                  <i className="fas fa-bars"></i>
                  <span>All Categories</span>
                </button>
              </div>

              {/* Navigation Links with Subcategories */}
              <nav className="navigation">
                {navigationCategories.map((category, index) => (
                  <div
                    key={index}
                    className="nav-category"
                    onMouseEnter={() => handleNavCategoryHover(category.name)}
                    onMouseLeave={handleNavCategoryLeave}
                  >
                    <Link
                      to={`/category/${category.name.toLowerCase().replace(/ /g, '-')}`}
                      className="nav-link"
                    >
                      {category.name}
                    </Link>

                    {/* Subcategories Dropdown */}
                    {hoveredNavCategory === category.name && (
                      <div className="nav-subcategories">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <Link
                            key={subIndex}
                            to={`/category/${category.name.toLowerCase().replace(/ /g, '-')}/${subcategory.toLowerCase().replace(/ /g, '-')}`}
                            className="nav-subcategory-link"
                            onClick={() => setHoveredNavCategory(null)}
                          >
                            {subcategory}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </header>
        )}

        {/* Categories Sidebar */}
        {showSidebar && (
          <div className="sidebar-overlay">
            <div className="sidebar" ref={sidebarRef}>
              <div className="sidebar-header">
                <h3>{isMobile ? 'Menu' : 'All Categories'}</h3>
                <button className="close-button" onClick={toggleSidebar}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              {isMobile && (
                <div className="mobile-nav-links">
                  {navigationCategories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/category/${category.name.toLowerCase().replace(/ /g, '-')}`}
                      className="mobile-nav-link"
                      onClick={toggleSidebar}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              <div className="categories-list">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`category-item ${activeCategory === category.name ? 'active' : ''}`}
                    onMouseEnter={() => handleCategoryHover(category.name)}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <i className={category.icon}></i>
                    <span>{category.name}</span>
                    <i className={`fas fa-chevron-${activeCategory === category.name ? 'down' : 'right'}`}></i>

                    {/* Mobile Subcategories */}
                    {isMobile && activeCategory === category.name && (
                      <div className="mobile-subcategories">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <div
                            key={subIndex}
                            className="subcategory-item"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubcategoryClick(subcategory, category);
                            }}
                          >
                            {subcategory}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Subcategories Panel */}
            {!isMobile && hoveredCategory && (
              <div className="subcategories-panel">
                <div className="subcategories-header">
                  <h4>{hoveredCategory}</h4>
                </div>
                <div className="subcategories-list">
                  {categories
                    .find(cat => cat.name === hoveredCategory)
                    ?.subcategories.map((subcategory, index) => (
                      <div
                        key={index}
                        className="subcategory-item"
                        onClick={() => handleSubcategoryClick(
                          subcategory,
                          categories.find(cat => cat.name === hoveredCategory)
                        )}
                      >
                        {subcategory}
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      </div>
    
  );
};

export default Layout;