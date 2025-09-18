// app/ProductFilterApp.tsx
"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  Search,
  Grid,
  List,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { allProducts } from "../data/products";
import ProductCardNew from "../component/cart/ProductCardNew";
import Filters from "../component/product/Filters";

// Material UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ProductFilterApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Popular");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedPriceRanges, sortBy]);

  const categories = [...new Set(allProducts.map((p) => p.category))];

  const priceRanges = [
    { label: "Under ₹500", min: 0, max: 499 },
    { label: "₹500 - ₹750", min: 500, max: 750 },
    { label: "₹750 - ₹1000", min: 751, max: 1000 },
    { label: "₹1000 - ₹1500", min: 1001, max: 1500 },
    { label: "Over ₹1500", min: 1501, max: Infinity },
  ];

  const sortOptions = [
    "Popular",
    "Price: Low to High",
    "Price: High to Low",
    "Name A-Z",
    "Name Z-A",
    "Rating",
  ];

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

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);

      let matchesPrice = selectedPriceRanges.length === 0;
      if (selectedPriceRanges.length > 0) {
        matchesPrice = priceRanges.some(
          (range) =>
            selectedPriceRanges.includes(range.label) &&
            p.price >= range.min &&
            p.price <= range.max
        );
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "Name A-Z":
          return a.title.localeCompare(b.title);
        case "Name Z-A":
          return b.title.localeCompare(a.title);
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Rating":
          return b.rating - a.rating;
        case "Popular":
        default:
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategories, selectedPriceRanges, sortBy]);

  const productsPerPage = isMobile ? 12 : 16;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Enhanced page navigation with smooth transition
  const goToPage = useCallback((page: number) => {
    if (page === currentPage || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentPage(page);
    
    // Smooth scroll to top
    const scrollToTop = () => {
      const startPosition = window.pageYOffset;
      const targetPosition = 0;
      const distance = targetPosition - startPosition;
      const duration = 500; // 500ms animation
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
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

  // Enhanced page numbers calculation
  const getPageNumbers = useCallback(() => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const sidePages = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - sidePages);
      let endPage = Math.min(totalPages, currentPage + sidePages);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        } else {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
      }
      
      for (let i = startPage; i <= endPage; i++) pages.push(i);
    }
    return pages;
  }, [totalPages, currentPage, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return; // Don't interfere with input fields
      
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
    <div className="min-h-screen bg-gray-50">
      {/* Main Container with proper max-width and centering */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              New Items ({filteredProducts.length})
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              {/* View toggle */}
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

              {/* Sort select */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    Sort by {opt}
                  </option>
                ))}
              </select>

              {/* Mobile filter button */}
              <button
                className="md:hidden flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-all duration-200"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          {/* Search bar */}
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
          {/* Sidebar (desktop) */}
          <div className="hidden md:block w-64 border-r border-gray-200 bg-white">
            <Filters
              categories={categories}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              priceRanges={priceRanges}
              selectedPriceRanges={selectedPriceRanges}
              togglePriceRange={togglePriceRange}
              clearFilters={clearFilters}
            />
          </div>

          {/* Mobile Filters Modal */}
          <Dialog
            open={showFilters}
            onClose={() => setShowFilters(false)}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              style: {
                height: "auto",
                maxHeight: "90vh",
              },
            }}
          >
            <DialogTitle className="flex justify-between items-center">
              Filters
              <IconButton onClick={() => setShowFilters(false)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent
              dividers
              sx={{
                padding: 2,
                maxHeight: "70vh",
              }}
            >
              <Filters
                categories={categories}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                priceRanges={priceRanges}
                selectedPriceRanges={selectedPriceRanges}
                togglePriceRange={togglePriceRange}
                clearFilters={clearFilters}
              />
            </DialogContent>
          </Dialog>

          {/* Main Content Area */}
          <div className="flex-1 bg-white">
            <div className="p-4 sm:p-6">
              {currentProducts.length > 0 ? (
                <>
                  {/* Products Grid with fade transition */}
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
                          <ProductCardNew
                            product={{
                              ...product,
                              netPrice: product.netPrice ?? product.price,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                      {/* Page info */}
                      <div className="text-sm text-gray-600">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                      </div>

                      {/* Pagination controls */}
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={goToPrevPage}
                          disabled={currentPage === 1 || isTransitioning}
                          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                            currentPage === 1 || isTransitioning
                              ? "text-gray-400 cursor-not-allowed opacity-50"
                              : "text-gray-700 hover:bg-gray-100 hover:scale-105"
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="hidden sm:inline">Previous</span>
                        </button>

                        <div className="flex gap-1">
                          {getPageNumbers().map((pageNum) => (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              disabled={isTransitioning}
                              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                                currentPage === pageNum
                                  ? "bg-[#61503c] text-white shadow-md"
                                  : "text-gray-700 hover:bg-gray-100"
                              } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages || isTransitioning}
                          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                            currentPage === totalPages || isTransitioning
                              ? "text-gray-400 cursor-not-allowed opacity-50"
                              : "text-gray-700 hover:bg-gray-100 hover:scale-105"
                          }`}
                        >
                          <span className="hidden sm:inline">Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
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

      {/* CSS for animations */}
      <style jsx>{`
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

export default ProductFilterApp;