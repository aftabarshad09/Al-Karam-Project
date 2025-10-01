// src/components/ProductList.jsx
import React from "react";
import { useShop } from "../context/ShopContext";
import ProductCard from "./ProductCard";
import "../style/product-list.css"; 

/**
 * Displays a grid of all mock products from the ShopContext.
 */
const ProductList = () => {
    const { MOCK_PRODUCTS } = useShop();

    if (!MOCK_PRODUCTS || MOCK_PRODUCTS.length === 0) {
        return <p className="empty-message">No products to display.</p>;
    }

    return (
        <div className="product-list-container container">
            <h2 className="section-header">Featured Products</h2>
            <div className="product-grid">
                {MOCK_PRODUCTS.map((p) => (
                    <div key={p.id}>
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;