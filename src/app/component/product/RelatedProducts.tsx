"use client";

import React, { useState, useRef, useEffect } from "react";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { productService } from "@/app/lib/productapi";
import R2Image from "../dashboard/dashboardallproductstab/R2Image";
import { DEFAULT_THUMBNAIL } from "@/app/data/dashboardproductdata";

// Product Interface - Updated to match your data structure
export interface Product {
  id: string;
  p_Name: string;
  thumbnail: string;
  category_id: string;
  price: number | string;
  discount: number;
  isTrending?: boolean;
  is_in_wishlist?: boolean;
}

// ProductCardNew Component
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInCart?: (productId: string) => boolean;
  addingToCart?: boolean;
}

const ProductCardNew: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist,
  isInCart,
  addingToCart = false
}) => {
  // Calculate prices
  const originalPrice = typeof product.price === 'number' ? product.price : parseFloat(product.price);
  const discountAmount = originalPrice * (product.discount / 100);
  const finalPrice = originalPrice - discountAmount;
  
  const inCart = isInCart ? isInCart(product.id) : false;

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden h-full flex flex-col">
      {/* Product Image */}
      <div className="relative">
        <R2Image
          src={product.thumbnail}
          fallbackSrc={DEFAULT_THUMBNAIL}
          alt={product.p_Name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
            {product.discount}% OFF
          </div>
        )}

        {/* Trending Badge */}
        {product.isTrending && (
          <div 
            className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium"
            style={{ marginTop: product.discount > 0 ? '32px' : '0' }}
          >
            Trending
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist?.(product.id)}
          className="absolute top-2 right-2 transition-colors bg-white rounded-full p-1.5 shadow-sm hover:scale-110"
          aria-label={product.is_in_wishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              product.is_in_wishlist ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 text-sm leading-snug">
          {product.p_Name}
        </h3>

        {/* Spacer to push price and button to bottom */}
        <div className="flex-1"></div>

        {/* Price Section and Button */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col">
            {product.discount > 0 ? (
              <>
                <div className="text-lg font-bold text-gray-900">
                  ₹{finalPrice.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 line-through">
                  ₹{originalPrice.toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-lg font-bold text-gray-900">
                ₹{originalPrice.toFixed(2)}
              </div>
            )}
          </div>
          
          <button
            onClick={() => {
              if (inCart) {
                // If item is already in cart, navigate to cart page
                window.location.href = '/cart';
              } else {
                // If item is not in cart, add it to cart
                onAddToCart?.(product);
              }
            }}
            disabled={addingToCart}
            className={`flex items-center gap-1 px-2 py-2 rounded text-xs font-medium transition-all duration-200 ${
              inCart 
                ? "bg-green-600 text-white hover:bg-green-700" 
                : "bg-[#695946] text-white hover:bg-[#61503c] active:scale-95"
            } ${addingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {addingToCart ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                Adding...
              </>
            ) : inCart ? (
              <>
              
                In Cart
              </>
            ) : (
              <>
               
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Sample Products Data - Updated with your data structure
const allProducts: Product[] = [];

// RelatedProducts Main Component
interface RelatedProductsProps {
  categoryId?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ categoryId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fixed visible cards count: 2 for mobile, 3 for larger screens
  const [visibleCards, setVisibleCards] = useState(2);
  
  const { addToCart, isInCart } = useCart();
  const { user } = useAuth();

  // Fetch related products when categoryId changes
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!categoryId) {
        // Fallback to sample data if no categoryId provided
        setProducts(allProducts.filter((p) => p.isTrending));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const relatedProducts = await productService.getRelatedProducts(categoryId);
        setProducts(relatedProducts);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setError('Failed to load related products');
        // Fallback to sample data on error
        setProducts(allProducts.filter((p) => p.isTrending));
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryId]);

  // Update visible cards based on screen width
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

      setCurrentIndex((prev) => Math.min(products.length - visibleCards, prev + 1));
    }
  };

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

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

  const handleToggleWishlist = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, is_in_wishlist: !product.is_in_wishlist }
          : product
      )
    );
    
    const product = products.find(p => p.id === productId);
    if (product) {
      console.log(
        product.is_in_wishlist 
          ? `Removed from wishlist: ${product.p_Name}` 
          : `Added to wishlist: ${product.p_Name}`
      );
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
    <div className="bg-[#f1f2f4] py-2 sm:py-3 px-2 sm:px-4">
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-5 bg-white rounded-sm overflow-hidden">
        <div className="mb-3 sm:mb-4 text-left px-2 sm:px-0">
          <h2 className="text-black text-xl sm:text-2xl md:text-3xl font-bold">Related Products</h2>
        </div>

        <div className="relative">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#695946]"></div>
              <span className="ml-2 text-gray-600">Loading related products...</span>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8">
              <span className="text-red-500">{error}</span>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center items-center py-8">
              <span className="text-gray-500">No related products found</span>
            </div>
          ) : (
            <>
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
                  {products.map((product: Product, index: number) => (
                    <div 
                      key={product.id} 
                      className="flex-shrink-0"
                      style={{ 
                        width: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 16 / visibleCards}px)` 
                      }}
                    >
                      <ProductCardNew 
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
              {products.length > visibleCards && (
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
                    disabled={currentIndex >= products.length - visibleCards}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                      currentIndex >= products.length - visibleCards
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
              {products.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: Math.ceil(products.length / visibleCards) }).map((_, index) => (
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
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default RelatedProducts;