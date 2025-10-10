// app/components/ArtistDirectoryContent.tsx (Client Component)

"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, Calendar, Briefcase } from "lucide-react";
import { Artist } from "@/app/api/artists/route";

// ============================================
// TYPES
// ============================================

interface ExperienceRange {
  label: string;
  min: number;
  max: number;
}

interface ArtistDirectoryContentProps {
  initialArtists: Artist[];
  initialCategories: string[];
}

// ============================================
// ARTIST CARD COMPONENT
// ============================================

const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => {
  const formattedDate = new Date(artist.joining_date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 
                 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 
                 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto h-full"
    >
      <div className="flex-shrink-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={artist.artist_profile_pic}
            alt={artist.artist_Name}
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-between text-center sm:text-left">
        <div>
          <h3 className="font-semibold text-lg sm:text-xl text-black mb-1 truncate">
            {artist.artist_Name}
          </h3>
          <p className="text-[#61503c] text-xs sm:text-sm font-medium mb-3">
            {artist.category}
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
              <Briefcase className="w-4 h-4 text-[#61503c]" />
              <span>{artist.experience} year{artist.experience !== 1 ? 's' : ''} experience</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
              <Calendar className="w-4 h-4 text-[#61503c]" />
              <span>Joined {formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// FILTERS SIDEBAR COMPONENT
// ============================================

const ArtistFiltersSidebar: React.FC<{
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  experienceRanges: ExperienceRange[];
  selectedExperience: string[];
  toggleExperience: (range: string) => void;
  allArtists: Artist[];
  clearFilters: () => void;
}> = ({
  categories,
  selectedCategories,
  toggleCategory,
  experienceRanges,
  selectedExperience,
  toggleExperience,
  allArtists,
  clearFilters,
}) => {
  const getCategoryCount = (category: string) => {
    return allArtists.filter((a) => a.category === category).length;
  };

  const getExperienceCount = (range: ExperienceRange) => {
    return allArtists.filter((a) => {
      return a.experience >= range.min && a.experience <= range.max;
    }).length;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 min-h-screen">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <label
                key={category}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{category}</span>
                <span className="ml-auto text-xs text-gray-500">
                  ({getCategoryCount(category)})
                </span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No categories available</p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Experience</h3>
        <div className="space-y-3">
          {experienceRanges && experienceRanges.length > 0 ? (
            experienceRanges.map((range) => (
              <label key={range.label} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedExperience.includes(range.label)}
                  onChange={() => toggleExperience(range.label)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{range.label}</span>
                <span className="ml-auto text-xs text-gray-500">
                  ({getExperienceCount(range)})
                </span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No experience ranges available</p>
          )}
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedExperience.length > 0) && (
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

// ============================================
// MAIN CLIENT COMPONENT
// ============================================

const ArtistDirectoryContent: React.FC<ArtistDirectoryContentProps> = ({
  initialArtists,
  initialCategories,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Experience");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedExperience, sortBy]);

  const experienceRanges = useMemo(
    () => [
      { label: "0-2 years", min: 0, max: 2 },
      { label: "3-5 years", min: 3, max: 5 },
      { label: "6-10 years", min: 6, max: 10 },
      { label: "10+ years", min: 11, max: Infinity },
    ],
    []
  );

  const sortOptions = [
    "Name A-Z",
    "Name Z-A",
    "Experience",
    "Newest Joined",
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

  const filteredArtists = useMemo(() => {
    let filtered = initialArtists.filter((artist) => {
      const matchesSearch =
        artist.artist_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (artist.category && artist.category.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategories.length === 0 ||
        (artist.category && selectedCategories.includes(artist.category));

      let matchesExperience = selectedExperience.length === 0;
      if (selectedExperience.length > 0) {
        matchesExperience = experienceRanges.some((range) => {
          if (selectedExperience.includes(range.label)) {
            return artist.experience >= range.min && artist.experience <= range.max;
          }
          return false;
        });
      }

      return matchesSearch && matchesCategory && matchesExperience;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "Name A-Z":
          return a.artist_Name.localeCompare(b.artist_Name);
        case "Name Z-A":
          return b.artist_Name.localeCompare(a.artist_Name);
        case "Experience":
          return b.experience - a.experience;
        case "Newest Joined":
          return new Date(b.joining_date).getTime() - new Date(a.joining_date).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategories, selectedExperience, sortBy, initialArtists, experienceRanges]);

  const totalPages = Math.ceil(filteredArtists.length / itemsPerPage);

  const paginatedArtists = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredArtists.slice(start, end);
  }, [filteredArtists, currentPage]);

  const goToPage = useCallback((page: number) => {
    if (page === currentPage || isTransitioning || page < 1 || page > totalPages) return;
    
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredArtists.length);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Artists ({filteredArtists.length})
          </h1>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button
              onClick={() => setShowFilters(true)}
              className="flex lg:hidden items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-all duration-200"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

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

        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search artists by name or category..."
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
            categories={initialCategories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            experienceRanges={experienceRanges}
            selectedExperience={selectedExperience}
            toggleExperience={toggleExperience}
            allArtists={initialArtists}
            clearFilters={clearFilters}
          />
        </div>

{/* Mobile Filters Dialog */}
{showFilters && (
  <div className="fixed inset-0 z-50 lg:hidden flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="relative w-[90%] max-w-md max-h-[70vh] bg-white rounded-xl shadow-2xl overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 flex justify-between items-center border-b bg-white p-4 z-10">
        <span className="text-lg font-semibold text-gray-900">Filters</span>
        <button
          onClick={() => setShowFilters(false)}
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-all"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <ArtistFiltersSidebar
          categories={initialCategories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          experienceRanges={experienceRanges}
          selectedExperience={selectedExperience}
          toggleExperience={toggleExperience}
          allArtists={initialArtists}
          clearFilters={clearFilters}
        />
      </div>
    </div>
  </div>
)}




        {/* Main Content */}
        <div className="flex-1 p-6">
          {paginatedArtists.length > 0 ? (
            <>
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

              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{endIndex} of {filteredArtists.length} artists
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
  );
};

export default ArtistDirectoryContent;