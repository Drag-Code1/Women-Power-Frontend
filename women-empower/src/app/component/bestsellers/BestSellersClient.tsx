"use client";

import React, { useState, useRef } from "react";
import { Product } from "@/app/types/product";
import { ProductCard } from "./ProductCard";

interface BestSellersClientProps {
  products: Product[];
}

export const BestSellersClient = ({ products }: BestSellersClientProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());
  const [productList, setProductList] = useState<Product[]>(products);

  // Filter only trending products
  const trendingProducts = productList.filter((p) => p.isTrending);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
      const gap = 16; // gap-4 (4 * 4px)
      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
      const gap = 16;
      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) => Math.min(trendingProducts.length - 1, prev + 1));
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => new Set(prev).add(product.id));
    console.log("Added to cart:", product);
    // Add your cart logic here
  };

  const handleToggleWishlist = (productId: string) => {
    setProductList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, is_in_wishlist: !product.is_in_wishlist }
          : product
      )
    );
    
    const product = productList.find(p => p.id === productId);
    if (product) {
      console.log(
        product.is_in_wishlist 
          ? `Removed from wishlist: ${product.p_Name}` 
          : `Added to wishlist: ${product.p_Name}`
      );
    }
  };

  const isInCart = (productId: string) => cartItems.has(productId);

  return (
    <div className="relative">
      {/* Left Navigation Button */}
      <button
        onClick={scrollLeft}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
          currentIndex === 0
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-black"
        }`}
        aria-label="Scroll left"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      {/* Right Navigation Button */}
      <button
        onClick={scrollRight}
        disabled={currentIndex >= trendingProducts.length - 1}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
          currentIndex >= trendingProducts.length - 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-black"
        }`}
        aria-label="Scroll right"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>

      {/* Products Container */}
      <div className="bg-white rounded-lg px-0">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch"
          }}
        >
          {trendingProducts.map((product: Product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-64 sm:w-72"
            >
              <ProductCard 
                product={product} 
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isInCart={isInCart}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};