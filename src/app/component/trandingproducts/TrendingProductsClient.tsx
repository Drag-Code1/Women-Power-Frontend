"use client";

import React, { useState, useRef, useEffect } from "react";
import { Product } from "@/app/types/product";
import { ProductCard } from "./ProductCard";
import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { useWishlist } from "@/app/contexts/WishlistContext";

interface TrendingProductsClientProps {
  products: Product[];
}

export const TrendingProductsClient = ({ products }: TrendingProductsClientProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [productList, setProductList] = useState<Product[]>(products);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  
  const { addToCart, isInCart } = useCart();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Filter only trending products
  const trendingProducts = productList.filter((p) => p.isTrending);

  // Fixed visible cards count: 2 for mobile, 3 for larger screens
  const [visibleCards, setVisibleCards] = useState(2);
  
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const cardWidth = containerWidth / visibleCards;
      const gap = 16; // gap-4
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
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const cardWidth = containerWidth / visibleCards;
      const gap = 16;
      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) => Math.min(trendingProducts.length - visibleCards, prev + 1));
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      setAddingToCart(product.id);
      await addToCart(product.id, 1);
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error instanceof Error ? error.message : 'Failed to add item to cart');
    } finally {
      setAddingToCart(null);
    }
  };

  const handleToggleWishlist = async (productId: string) => {
    const product = productList.find(p => p.id === productId);
    if (!product) return;

    try {
      if (isInWishlist(productId)) {
        const success = await removeFromWishlist(productId);
        if (success) {
          setProductList((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId
                ? { ...product, is_in_wishlist: false }
                : product
            )
          );
          console.log(`Removed from wishlist: ${product.p_Name}`);
        }
      } else {
        const success = await addToWishlist(productId);
        if (success) {
          setProductList((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId
                ? { ...product, is_in_wishlist: true }
                : product
            )
          );
          console.log(`Added to wishlist: ${product.p_Name}`);
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      scrollRight();
    } else if (isRightSwipe) {
      scrollLeft();
    }
  };

  return (
    <div className="relative">
      {/* Products Container with Touch Support */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {trendingProducts.map((product: Product, index: number) => (
            <div 
              key={product.id} 
              className="flex-shrink-0"
              style={{ 
                width: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 16 / visibleCards}px)` 
              }}
            >
              <ProductCard 
                product={product} 
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isInCart={isInCart}
                addingToCart={addingToCart === product.id}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Show on all devices but style differently for mobile */}
      {trendingProducts.length > visibleCards && (
        <>
          {/* Left Navigation Button */}
          <button
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
              currentIndex === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:text-black"
            }`}
            aria-label="Scroll left"
          >
            <svg
              width="16"
              height="16"
              className="sm:w-5 sm:h-5"
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
            disabled={currentIndex >= trendingProducts.length - visibleCards}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
              currentIndex >= trendingProducts.length - visibleCards
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:text-black"
            }`}
            aria-label="Scroll right"
          >
            <svg
              width="16"
              height="16"
              className="sm:w-5 sm:h-5"
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
        </>
      )}

      {/* Dots Indicator for Mobile */}
      {trendingProducts.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.ceil(trendingProducts.length / visibleCards) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const containerWidth = scrollContainerRef.current.offsetWidth;
                  const cardWidth = containerWidth / visibleCards;
                  const gap = 16;
                  const scrollPosition = index * visibleCards * (cardWidth + gap);
                  
                  scrollContainerRef.current.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth",
                  });
                  
                  setCurrentIndex(index * visibleCards);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / visibleCards) === index
                  ? "bg-[#61503c] w-6"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};