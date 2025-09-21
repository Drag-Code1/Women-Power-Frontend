"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { allArtists } from "../data/allArtists";
import ArtistCard from "../component/cart/ArtistCard";
import ArtistFiltersSidebar from "../component/product/ArtistFiltersSidebar";

// Material UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ArtistDirectoryApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Rating");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 6 rows × 2 cards per row

  // ✅ Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedExperience, sortBy]);

  // Categories
  const categories = [...new Set(allArtists.map((artist) => artist.category))];

  // Experience ranges
  const experienceRanges = [
    { label: "0-2 years", min: 0, max: 2 },
    { label: "3-5 years", min: 3, max: 5 },
    { label: "6-10 years", min: 6, max: 10 },
    { label: "10+ years", min: 11, max: Infinity },
  ];

  // Sort options
  const sortOptions = [
    "Rating",
    "Experience",
    "Name A-Z",
    "Name Z-A",
    "Completed Works",
  ];

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const toggleExperience = useCallback((range: string) => {
    setSelectedExperience((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedExperience([]);
    setSearchTerm("");
    setCurrentPage(1);
  }, []);

  // Filter + Sort
  const filteredArtists = useMemo(() => {
    let filtered = allArtists.filter((artist) => {
      const matchesSearch =
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.speciality.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(artist.category);

      let matchesExperience = selectedExperience.length === 0;
      if (selectedExperience.length > 0) {
        matchesExperience = experienceRanges.some((range) => {
          if (selectedExperience.includes(range.label)) {
            const expYears = parseInt(artist.experience);
            return expYears >= range.min && expYears <= range.max;
          }
          return false;
        });
      }

      return matchesSearch && matchesCategory && matchesExperience;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "Name A-Z":
          return a.name.localeCompare(b.name);
        case "Name Z-A":
          return b.name.localeCompare(a.name);
        case "Experience":
          return parseInt(b.experience) - parseInt(a.experience);
        case "Completed Works":
          return b.completedWorks - a.completedWorks;
        case "Rating":
        default:
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategories, selectedExperience, sortBy]);

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredArtists.length / itemsPerPage);

  const paginatedArtists = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredArtists.slice(start, end);
  }, [filteredArtists, currentPage]);

  // Enhanced page navigation with smooth transition
  const goToPage = useCallback((page: number) => {
    if (page === currentPage || isTransitioning || page < 1 || page > totalPages) return;
    
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
  }, [currentPage, isTransitioning, totalPages]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

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

  // Calculate display range
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredArtists.length);

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          {/* Header: Title + Buttons */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Artists ({filteredArtists.length})
            </h1>

            {/* Mobile: Filters + Sort together */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              {/* Filters Button: shown only on mobile */}
              <button
                onClick={() => setShowFilters(true)}
                className="flex lg:hidden items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-all duration-200"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    Sort by {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search artists by name, specialty, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex">
          {/* Sidebar (Desktop only) */}
          <div className="hidden lg:block w-64 border-r border-gray-200 bg-white">
            <ArtistFiltersSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              experienceRanges={experienceRanges}
              selectedExperience={selectedExperience}
              toggleExperience={toggleExperience}
              allArtists={allArtists}
              clearFilters={clearFilters}
            />
          </div>

          {/* Mobile Filters Dialog */}
          <Dialog
            open={showFilters}
            onClose={() => setShowFilters(false)}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              style: {
                maxHeight: "90vh", // mobile safety limit
                height: "auto", // jitna content utna hi
              },
            }}
          >
            <DialogTitle className="flex justify-between items-center border-b">
              <span className="text-lg font-semibold">Filters</span>
              <IconButton onClick={() => setShowFilters(false)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent
              dividers
              sx={{
                padding: 2,
                maxHeight: "70vh", // scroll agar zyada content ho
              }}
            >
              <ArtistFiltersSidebar
                categories={categories}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                experienceRanges={experienceRanges}
                selectedExperience={selectedExperience}
                toggleExperience={toggleExperience}
                allArtists={allArtists}
                clearFilters={clearFilters}
              />
            </DialogContent>
          </Dialog>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {paginatedArtists.length > 0 ? (
              <>
                {/* Artists Grid with fade transition */}
                <div
                  className={`transition-opacity duration-300 ${
                    isTransitioning ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedArtists.map((artist, index) => (
                      <div
                        key={artist.id}
                        className="animate-fadeIn"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animationFillMode: 'both'
                        }}
                      >
                        <ArtistCard artist={artist} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* ✅ Enhanced Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                    {/* Page info */}
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1}-{endIndex} of {filteredArtists.length} artists
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
                <div className="text-6xl mb-4">👨‍🎨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No artists found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#61503c] text-white px-6 py-2 rounded-md hover:bg-[#7a5b3e] transition-all duration-200 transform hover:scale-105"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
    </div>
  );
};

export default ArtistDirectoryApp;