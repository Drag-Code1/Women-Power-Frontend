// components/ProductFilterClient.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Grid,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { Product, CartItem, PriceRange  } from "@/app/types/product";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import Pagination from "./Pagination";

interface ProductFilterClientProps {
  initialProducts: Product[];
  initialCategories: string[];
  initialPriceRanges: PriceRange[];
  initialSortOptions: string[];
}

const ProductFilterClient: React.FC<ProductFilterClientProps> = ({
  initialProducts,
  initialCategories,
  initialPriceRanges,
  initialSortOptions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Popular");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cart, setCart] = useState<CartItem>({});
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  // Initialize wishlist from localStorage and product data
  useEffect(() => {
    // Get wishlist from localStorage or initialize from product data
    const savedWishlist = localStorage.getItem('wishlist');
    let initialWishlist: Set<string> = new Set();
    
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        initialWishlist = new Set(parsedWishlist);
      } catch (e) {
        console.error("Error parsing wishlist from localStorage", e);
      }
    } else {
      // Initialize from product data
      initialProducts.forEach(product => {
        if (product.is_in_wishlist) {
          initialWishlist.add(product.id);
        }
      });
    }
    
    setWishlist(initialWishlist);
  }, [initialProducts]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (wishlist.size > 0) {
      localStorage.setItem('wishlist', JSON.stringify(Array.from(wishlist)));
    } else {
      localStorage.removeItem('wishlist');
    }
  }, [wishlist]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedPriceRanges, sortBy]);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }, []);

  const togglePriceRange = useCallback((range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSearchTerm("");
    setCurrentPage(1);
  }, []);

  const addToCart = useCallback((productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  }, []);

  const totalCartItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const filteredProducts = useMemo(() => {
    let filtered = initialProducts.filter((p) => {
      const matchesSearch = p.p_Name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category_id);

      const price = parseFloat(p.price);
      let matchesPrice = selectedPriceRanges.length === 0;
      if (selectedPriceRanges.length > 0) {
        matchesPrice = initialPriceRanges.some(
          (range) =>
            selectedPriceRanges.includes(range.label) &&
            price >= range.min &&
            price <= range.max
        );
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);

      switch (sortBy) {
        case "Name A-Z":
          return a.p_Name.localeCompare(b.p_Name);
        case "Name Z-A":
          return b.p_Name.localeCompare(a.p_Name);
        case "Price: Low to High":
          return priceA - priceB;
        case "Price: High to Low":
          return priceB - priceA;
        case "Popular":
        default:
          return b.isTrending === a.isTrending ? 0 : b.isTrending ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategories, selectedPriceRanges, sortBy, initialProducts, initialPriceRanges]);

  const productsPerPage = isMobile ? 12 : 16;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = useCallback((page: number) => {
    if (page === currentPage || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentPage(page);
    
    const scrollToTop = () => {
      const startPosition = window.pageYOffset;
      const targetPosition = 0;
      const distance = targetPosition - startPosition;
      const duration = 500;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          setIsTransitioning(false);
        }
      };
      
      requestAnimationFrame(animation);
    };

    scrollToTop();
  }, [currentPage, isTransitioning]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevPage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextPage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevPage, goToNextPage]);

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-900">
                New Items ({filteredProducts.length})
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  {initialSortOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      Sort by {opt}
                    </option>
                  ))}
                </select>

                <button
                  className="md:hidden flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-all duration-200"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
              </div>
            </div>

            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex">
            <div className="hidden md:block w-64 border-r border-gray-200 bg-white">
              <Filters
                categories={initialCategories}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                priceRanges={initialPriceRanges}
                selectedPriceRanges={selectedPriceRanges}
                togglePriceRange={togglePriceRange}
                clearFilters={clearFilters}
              />
            </div>

            {showFilters && isMobile && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowFilters(false)}>
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                  <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button 
                      onClick={() => setShowFilters(false)} 
                      className="text-gray-500 hover:text-gray-700 text-2xl leading-none w-8 h-8 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                    <Filters
                      categories={initialCategories}
                      selectedCategories={selectedCategories}
                      toggleCategory={toggleCategory}
                      priceRanges={initialPriceRanges}
                      selectedPriceRanges={selectedPriceRanges}
                      togglePriceRange={togglePriceRange}
                      clearFilters={clearFilters}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 bg-white">
              <div className="p-4 sm:p-6">
                {currentProducts.length > 0 ? (
                  <>
                    <div
                      className={`transition-opacity duration-300 ${
                        isTransitioning ? 'opacity-50' : 'opacity-100'
                      }`}
                    >
                      <div
                        className={
                          viewMode === "grid"
                            ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            : "space-y-4"
                        }
                      >
                        {currentProducts.map((product, index) => (
                          <div
                            key={product.id}
                            className="animate-fadeIn"
                            style={{
                              animationDelay: `${index * 50}ms`,
                              animationFillMode: 'both'
                            }}
                          >
                            <ProductCard 
                              product={product}
                              cart={cart}
                              wishlist={wishlist}
                              addToCart={addToCart}
                              removeFromCart={removeFromCart}
                              toggleWishlist={toggleWishlist}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        totalItems={filteredProducts.length}
                        isTransitioning={isTransitioning}
                        isMobile={isMobile}
                        goToPage={goToPage}
                        goToPrevPage={goToPrevPage}
                        goToNextPage={goToNextPage}
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <button
                      onClick={clearFilters}
                      className="bg-[#61503c] text-white px-6 py-2 rounded-md hover:bg-[#695946] transition-all duration-200 transform hover:scale-105"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProductFilterClient;