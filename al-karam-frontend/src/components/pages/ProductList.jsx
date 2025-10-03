import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import '../style/productlist.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: 'all',
    priceRange: 'all',
    sortBy: 'name-asc'
  });

  // Mock product data - 40 products across categories
  const mockProducts = [
    // Stationary (8 products)
    {
      id: 1, name: 'Premium Ballpoint Pens (12 Pack)', price: 450, specialPrice: 399,
      brand: 'Dollar', category: 'stationary',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 2, name: 'A4 Notebook Set (5 Pieces)', price: 1200, specialPrice: 999,
      brand: 'Click', category: 'stationary',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 3, name: 'Geometric Drawing Set', price: 850, specialPrice: null,
      brand: 'Faber-Castell', category: 'stationary',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 4, name: 'Executive Diary 2024', price: 1500, specialPrice: 1299,
      brand: 'Classic', category: 'stationary',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 5, name: 'Color Pencils (24 Colors)', price: 650, specialPrice: 549,
      brand: 'Doms', category: 'stationary',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 6, name: 'Office File Folder Set', price: 800, specialPrice: null,
      brand: 'Peekay', category: 'stationary',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 7, name: 'White Board Marker Set', price: 350, specialPrice: 299,
      brand: 'Board Master', category: 'stationary',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 8, name: 'Sticky Notes (6 Pack)', price: 280, specialPrice: 249,
      brand: 'Post-it', category: 'stationary',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },

    // Crockery (7 products)
    {
      id: 9, name: 'Ceramic Dinner Set (20 Pcs)', price: 4500, specialPrice: 3999,
      brand: 'Melamine', category: 'crockery',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 10, name: 'Glass Tea Cups (6 Pcs)', price: 1200, specialPrice: 999,
      brand: 'Borosil', category: 'crockery',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 11, name: 'Porcelain Coffee Mugs Set', price: 1800, specialPrice: 1499,
      brand: 'Corelle', category: 'crockery',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 12, name: 'Steel Cutlery Set', price: 2500, specialPrice: null,
      brand: 'Stainless', category: 'crockery',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 13, name: 'Serving Platter Large', price: 1500, specialPrice: 1299,
      brand: 'Melamine', category: 'crockery',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 14, name: 'Glass Juice Jug', price: 800, specialPrice: 699,
      brand: 'Borosil', category: 'crockery',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 15, name: 'Ceramic Bowls Set (4 Pcs)', price: 1100, specialPrice: 899,
      brand: 'Corelle', category: 'crockery',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },

    // Beauty and Care (7 products)
    {
      id: 16, name: 'Vitamin C Face Serum', price: 2500, specialPrice: 1999,
      brand: 'Loreal', category: 'beauty',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 17, name: 'Hydrating Face Moisturizer', price: 1800, specialPrice: 1499,
      brand: 'Nivea', category: 'beauty',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 18, name: 'Hair Care Shampoo & Conditioner', price: 2200, specialPrice: null,
      brand: 'Pantene', category: 'beauty',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 19, name: 'Makeup Brush Set', price: 1500, specialPrice: 1299,
      brand: 'Maybelline', category: 'beauty',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 20, name: 'Liquid Foundation', price: 2800, specialPrice: 2399,
      brand: 'Loreal', category: 'beauty',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 21, name: 'Sunscreen Lotion SPF 50', price: 1200, specialPrice: 999,
      brand: 'Neutrogena', category: 'beauty',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 22, name: 'Face Wash & Scrub', price: 900, specialPrice: 749,
      brand: 'Garnier', category: 'beauty',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },

    // Electronic Small Appliances (6 products)
    {
      id: 23, name: 'Blender with Grinder', price: 5500, specialPrice: 4999,
      brand: 'Panasonic', category: 'electronics',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 24, name: 'Electric Kettle 1.8L', price: 3500, specialPrice: 2999,
      brand: 'PEL', category: 'electronics',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 25, name: 'Hand Mixer 5-Speed', price: 4200, specialPrice: null,
      brand: 'Westpoint', category: 'electronics',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 26, name: 'Sandwich Maker', price: 2800, specialPrice: 2399,
      brand: 'Westpoint', category: 'electronics',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 27, name: 'Food Processor', price: 8500, specialPrice: 7499,
      brand: 'Panasonic', category: 'electronics',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 28, name: 'Iron with Steam', price: 4500, specialPrice: 3999,
      brand: 'PEL', category: 'electronics',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },

    // Household and Cleaning (6 products)
    {
      id: 29, name: 'Floor Cleaner Liquid', price: 450, specialPrice: 399,
      brand: 'Lysol', category: 'household',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 30, name: 'Laundry Detergent 5kg', price: 1800, specialPrice: 1599,
      brand: 'Ariel', category: 'household',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 31, name: 'Dishwashing Liquid', price: 350, specialPrice: 299,
      brand: 'Dawn', category: 'household',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 32, name: 'Air Freshener Spray', price: 280, specialPrice: null,
      brand: 'Glade', category: 'household',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 33, name: 'Glass Cleaner', price: 320, specialPrice: 279,
      brand: 'Windex', category: 'household',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 34, name: 'Toilet Cleaner', price: 380, specialPrice: 329,
      brand: 'Harpic', category: 'household',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },

    // Toys and Accessories (6 products)
    {
      id: 35, name: 'Building Blocks Set', price: 2500, specialPrice: 2199,
      brand: 'Lego', category: 'toys',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 36, name: 'Remote Control Car', price: 3200, specialPrice: 2799,
      brand: 'Hot Wheels', category: 'toys',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 37, name: 'Educational Learning Tablet', price: 4500, specialPrice: null,
      brand: 'LeapFrog', category: 'toys',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 38, name: 'Art and Craft Kit', price: 1800, specialPrice: 1499,
      brand: 'Crayola', category: 'toys',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 39, name: 'Doll House with Furniture', price: 5500, specialPrice: 4999,
      brand: 'Barbie', category: 'toys',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    },
    {
      id: 40, name: 'Puzzle Game Set', price: 1200, specialPrice: 999,
      brand: 'Ravensburger', category: 'toys',
      image: 'https://t3.ftcdn.net/jpg/00/34/70/32/360_F_34703220_TiczZRk73LnvUcvt2J2qj57mKzwKAtBT.jpg'
    }
  ];

  // Get unique brands for filter
  const brands = ['all', ...new Set(mockProducts.map(product => product.brand))];

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let filtered = [...products];

    // Brand filter
    if (filters.brand !== 'all') {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'under-1000':
          filtered = filtered.filter(product => product.price < 1000);
          break;
        case '1000-3000':
          filtered = filtered.filter(product => product.price >= 1000 && product.price <= 3000);
          break;
        case '3000-5000':
          filtered = filtered.filter(product => product.price > 3000 && product.price <= 5000);
          break;
        case 'above-5000':
          filtered = filtered.filter(product => product.price > 5000);
          break;
        default:
          break;
      }
    }

    // Sort products
    switch (filters.sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAddToCart = (productId) => {
    console.log('Added to cart:', productId);
    // Add your cart logic here
  };

  const handleAddToWishlist = (productId, isWishlisted) => {
    console.log(`${isWishlisted ? 'Added to' : 'Removed from'} wishlist:`, productId);
    // Add your wishlist logic here
  };

  const clearFilters = () => {
    setFilters({
      brand: 'all',
      priceRange: 'all',
      sortBy: 'name-asc'
    });
  };

  // In your ProductList component, make sure the ProductCard is used like this:
  {
    filteredProducts.map(product => (
      <ProductCard
        key={product.id}
        product={product}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    ))
  }

  return (
    <div className="product-list-container">
      <div className="filters-sidebar">
        <div className="filter-header">
          <i className="fas fa-filter"></i>
          <h3>Filters</h3>
          <button className="clear-filters" onClick={clearFilters}>
            Clear All
          </button>
        </div>

        {/* Brand Filter */}
        <div className="filter-group">
          <h4>Select Brand</h4>
          <select
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="filter-select"
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'All Brands' : brand}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="filter-group">
          <h4>Price Range</h4>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Prices</option>
            <option value="under-1000">Under PKR 1,000</option>
            <option value="1000-3000">PKR 1,000 - 3,000</option>
            <option value="3000-5000">PKR 3,000 - 5,000</option>
            <option value="above-5000">Above PKR 5,000</option>
          </select>
        </div>

        {/* Sort Filter */}
        <div className="filter-group">
          <h4>Sort By</h4>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="filter-select"
          >
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="active-filters">
          <h4>Active Filters:</h4>
          <div className="filter-tags">
            {filters.brand !== 'all' && (
              <span className="filter-tag">Brand: {filters.brand}</span>
            )}
            {filters.priceRange !== 'all' && (
              <span className="filter-tag">
                Price: {filters.priceRange.replace('-', ' ').replace('under', 'Under').replace('above', 'Above')}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="products-grid-section">
        <div className="products-header">
          <h2>All Products ({filteredProducts.length})</h2>
          <div className="results-info">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))
          ) : (
            <div className="no-products">
              <i className="fas fa-search"></i>
              <h3>No products found</h3>
              <p>Try adjusting your filters to see more products.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;