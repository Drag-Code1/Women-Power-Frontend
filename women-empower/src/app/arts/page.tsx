"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  Search,
  Grid,
  List,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";

// Product Interface
export interface Product {
  id: string;
  p_Name: string;
  thumbnail: string;
  category_id: string;
  price: string;
  discount: number;
  isTrending: boolean;
  is_in_wishlist: boolean;
}

// All Products Data
export const allProducts: Product[] = [
  {
    "id": "0",
    "p_Name": "Sunset Overdrive flowers2",
    "thumbnail": "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
    "category_id": "shubhlabh",
    "price": "699.00",
    "discount": 15,
    "isTrending": false,
    "is_in_wishlist": false
  },
  {
    "id": "1",
    "p_Name": "Big Peacock Rangoli",
    "thumbnail": "https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg",
    "category_id": "rangoli",
    "price": "450.00",
    "discount": 10,
    "isTrending": true,
    "is_in_wishlist": false
  },
  {
    "id": "2",
    "p_Name": "Elephant Rangoli",
    "thumbnail": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg",
    "category_id": "rangoli",
    "price": "325.00",
    "discount": 7,
    "isTrending": false,
    "is_in_wishlist": true
  },
  {
    "id": "3",
    "p_Name": "Lotus Rangoli",
    "thumbnail": "https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg",
    "category_id": "rangoli",
    "price": "550.00",
    "discount": 8,
    "isTrending": true,
    "is_in_wishlist": true
  },
  {
    "id": "4",
    "p_Name": "Diwali Peacock Rangoli",
    "thumbnail": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg",
    "category_id": "rangoli",
    "price": "600.00",
    "discount": 8,
    "isTrending": true,
    "is_in_wishlist": true
  },
  {
    "id": "5",
    "p_Name": "Buddha Picture Frame",
    "thumbnail": "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
    "category_id": "spiritual",
    "price": "1750.00",
    "discount": 12,
    "isTrending": true,
    "is_in_wishlist": false
  },
  {
    "id": "6",
    "p_Name": "Buddha Rangoli",
    "thumbnail": "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
    "category_id": "spiritual",
    "price": "950.00",
    "discount": 5,
    "isTrending": false,
    "is_in_wishlist": false
  },
  {
    "id": "7",
    "p_Name": "Traditional Diya Set",
    "thumbnail": "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg",
    "category_id": "shubhlabh",
    "price": "299.00",
    "discount": 20,
    "isTrending": true,
    "is_in_wishlist": false
  },
  {
    "id": "8",
    "p_Name": "Ganesh Idol Small",
    "thumbnail": "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
    "category_id": "spiritual",
    "price": "450.00",
    "discount": 12,
    "isTrending": false,
    "is_in_wishlist": true
  },
  {
    "id": "9",
    "p_Name": "Flower Rangoli Stencil",
    "thumbnail": "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
    "category_id": "rangoli",
    "price": "199.00",
    "discount": 15,
    "isTrending": false,
    "is_in_wishlist": false
  },
  {
    "id": "10",
    "p_Name": "Om Symbol Wall Decor",
    "thumbnail": "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
    "category_id": "spiritual",
    "price": "899.00",
    "discount": 10,
    "isTrending": true,
    "is_in_wishlist": false
  },
  {
    "id": "11",
    "p_Name": "Colorful Rangoli Powder Set",
    "thumbnail": "https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg",
    "category_id": "rangoli",
    "price": "249.00",
    "discount": 5,
    "isTrending": false,
    "is_in_wishlist": true
  },
  {
    "id": "12",
    "p_Name": "Shubh Labh Wall Hanging",
    "thumbnail": "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg",
    "category_id": "shubhlabh",
    "price": "599.00",
    "discount": 12,
    "isTrending": true,
    "is_in_wishlist": false
  },
  {
    "id": "13",
    "p_Name": "Laxmi Ganesh Murti",
    "thumbnail": "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
    "category_id": "spiritual",
    "price": "1250.00",
    "discount": 8,
    "isTrending": true,
    "is_in_wishlist": true
  },
  {
    "id": "14",
    "p_Name": "Designer Rangoli Mat",
    "thumbnail": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg",
    "category_id": "rangoli",
    "price": "799.00",
    "discount": 18,
    "isTrending": false,
    "is_in_wishlist": false
  },
  {
    "id": "15",
    "p_Name": "Swastik Door Hanging",
    "thumbnail": "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg",
    "category_id": "shubhlabh",
    "price": "349.00",
    "discount": 11,
    "isTrending": false,
    "is_in_wishlist": false
  },
  {
    "id": "16",
    "p_Name": "Mandala Rangoli Design",
    "thumbnail": "https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg",
    "category_id": "rangoli",
    "price": "425.00",
    "discount": 10,
    "isTrending": true,
    "is_in_wishlist": false
  },
  {
    "id": "17",
    "p_Name": "Spiritual Incense Holder",
    "thumbnail": "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
    "category_id": "spiritual",
    "price": "299.00",
    "discount": 15,
    "isTrending": false,
    "is_in_wishlist": true
  },
  {
    "id": "18",
    "p_Name": "Kalash Decorative Set",
    "thumbnail": "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg",
    "category_id": "shubhlabh",
    "price": "699.00",
    "discount": 5,
    "isTrending": true,
    "is_in_wishlist": false
  },
  {
    "id": "19",
    "p_Name": "Peacock Feather Rangoli",
    "thumbnail": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg",
    "category_id": "rangoli",
    "price": "375.00",
    "discount": 12,
    "isTrending": false,
    "is_in_wishlist": true
  }
];

// Product Card Component
const ProductCardNew = ({ 
  product, 
  cart, 
  wishlist,
  addToCart, 
  removeFromCart,
  toggleWishlist
}: { 
  product: Product;
  cart: {[key: string]: number};
  wishlist: Set<string>;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
}) => {
  const priceNum = parseFloat(product.price);
  const discountedPrice = priceNum - (priceNum * product.discount / 100);
  const cartQuantity = cart[product.id] || 0;
  const isInCart = cartQuantity > 0;
  const isInWishlist = wishlist.has(product.id);

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.p_Name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
            {product.discount}% OFF
          </div>
        )}

        {product.isTrending && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium" style={{ marginTop: product.discount > 0 ? '32px' : '0' }}>
            Trending
          </div>
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2 right-2 transition-colors bg-white rounded-full p-1.5 shadow-sm hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 text-sm">
          {product.p_Name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.discount > 0 ? (
              <>
                <div className="text-lg font-semibold text-gray-900">
                  ₹{discountedPrice.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 line-through">
                  ₹{priceNum.toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-lg font-semibold text-gray-900">
                ₹{priceNum.toFixed(2)}
              </div>
            )}
          </div>
          
          <button 
            onClick={() => isInCart ? removeFromCart(product.id) : addToCart(product.id)}
            className={`px-3 py-1.5 rounded text-xs transition-all duration-200 ${
              isInCart 
                ? "bg-green-600 text-white hover:bg-green-700" 
                : "bg-[#695946] text-white hover:bg-[#61503c]"
            }`}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Filters Component
const Filters = ({
  categories,
  selectedCategories,
  toggleCategory,
  priceRanges,
  selectedPriceRanges,
  togglePriceRange,
  clearFilters,
}: {
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  priceRanges: { label: string; min: number; max: number }[];
  selectedPriceRanges: string[];
  togglePriceRange: (range: string) => void;
  clearFilters: () => void;
}) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(range.label)}
                onChange={() => togglePriceRange(range.label)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedPriceRanges.length > 0) && (
        <button
          onClick={clearFilters}
          className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

// Main App Component
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
  const [cart, setCart] = useState<{[key: string]: number}>({});
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
      allProducts.forEach(product => {
        if (product.is_in_wishlist) {
          initialWishlist.add(product.id);
        }
      });
    }
    
    setWishlist(initialWishlist);
  }, []);

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

  const categories = [...new Set(allProducts.map((p) => p.category_id))];

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
    let filtered = allProducts.filter((p) => {
      const matchesSearch = p.p_Name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category_id);

      const price = parseFloat(p.price);
      let matchesPrice = selectedPriceRanges.length === 0;
      if (selectedPriceRanges.length > 0) {
        matchesPrice = priceRanges.some(
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
  }, [searchTerm, selectedCategories, selectedPriceRanges, sortBy]);

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
                  {sortOptions.map((opt) => (
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
                categories={categories}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                priceRanges={priceRanges}
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
                      categories={categories}
                      selectedCategories={selectedCategories}
                      toggleCategory={toggleCategory}
                      priceRanges={priceRanges}
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
                            <ProductCardNew 
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
                      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                        <div className="text-sm text-gray-600">
                          Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                        </div>

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

export default ProductFilterApp;