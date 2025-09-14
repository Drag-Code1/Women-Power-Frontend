// "use client";

import React from "react";
import ProductCard from "../cart/ProductCard";
import { popularProducts, Product } from "../../data/popularProducts";

const ProductsGrid: React.FC = () => {
  // const handleAddToCart = (product: Product) => {
  //   console.log("Added to cart:", product.title);
  // };

  // const handleWishlist = (product: Product) => {
  //   console.log("Added to wishlist:", product.title);
  // };

  // const handleQuickView = (product: Product) => {
  //   console.log("Quick view:", product.title);
  // };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-gray-900 text-2xl sm:text-2xl">
          Popular <span className="text-[#61503c]">Products</span>
        </h2>
        <div className="mt-2 w-16 h-1 bg-[#61503c] rounded"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {popularProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            // onAddToCart={handleAddToCart}
            // onWishlist={handleWishlist}
            // onQuickView={handleQuickView}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsGrid;
