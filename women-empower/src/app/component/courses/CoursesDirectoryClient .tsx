"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CourseCard from "./CourseCard";
import FiltersSidebar from "./FiltersSidebar";

interface Course {
  id: string;
  thumbnail: string;
  course_coordinator: string;
  category_id: string;
  title: string;
  description: string;
  lessons: number;
  level: string;
  price: string;
  discount: number;
}

interface Props {
  initialCourses: Course[];
  categories: string[];
  levels: string[];
}

const CoursesDirectoryClient = ({ initialCourses, categories, levels }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("");
  const [sortBy, setSortBy] = useState("Latest");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const sortOptions = ["Latest", "Price: Low to High", "Price: High to Low"];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedLevels, priceRange, sortBy]);

  const toggleCategory = useCallback((c: string) => {
    setSelectedCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }, []);

  const toggleLevel = useCallback((l: string) => {
    setSelectedLevels((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setPriceRange("");
    setSearchTerm("");
    setCurrentPage(1);
  }, []);

  const filteredCourses = useMemo(() => {
    let filtered = initialCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.course_coordinator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category_id);
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);

      let matchesPrice = true;
      if (priceRange) {
        const price = parseFloat(course.price);
        if (priceRange === "Under ₹100") matchesPrice = price < 100;
        else if (priceRange === "₹100 - ₹250") matchesPrice = price >= 100 && price <= 250;
        else if (priceRange === "₹250 - ₹500") matchesPrice = price >= 250 && price <= 500;
        else if (priceRange === "Above ₹500") matchesPrice = price > 500;
      }

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "Price: Low to High":
          return parseFloat(a.price) - parseFloat(b.price);
        case "Price: High to Low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "Latest":
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategories, selectedLevels, priceRange, sortBy, initialCourses]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(start, start + itemsPerPage);
  }, [filteredCourses, currentPage]);

  const goToPage = useCallback((page: number) => {
    if (page === currentPage || isTransitioning || page < 1 || page > totalPages) return;
    setIsTransitioning(true);
    setCurrentPage(page);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentPage, isTransitioning, totalPages]);

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
        if (startPage === 1) endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        else startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      for (let i = startPage; i <= endPage; i++) pages.push(i);
    }
    return pages;
  }, [totalPages, currentPage, isMobile]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredCourses.length);

  return (
    <div className="bg-[#f1f2f4] py-2 px-2 sm:py-2 sm:px-4 min-h-screen">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Online Courses</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  {filteredCourses.length} courses available
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 bg-gray-100 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      Sort by {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl pl-10 sm:pl-12 pr-4 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="flex">
            <div className="hidden lg:block">
              <FiltersSidebar
                categories={categories}
                levels={levels}
                selectedCategories={selectedCategories}
                selectedLevels={selectedLevels}
                priceRange={priceRange}
                toggleCategory={toggleCategory}
                toggleLevel={toggleLevel}
                setPriceRange={setPriceRange}
                clearFilters={clearFilters}
                allCourses={initialCourses}
                showFilters={true}
              />
            </div>

            <Dialog open={showFilters} onClose={() => setShowFilters(false)} fullWidth maxWidth="sm">
              <DialogTitle className="flex justify-between items-center border-b">
                <span className="text-lg font-semibold">Filters</span>
                <IconButton onClick={() => setShowFilters(false)} size="small">
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers sx={{ padding: 2, maxHeight: "70vh" }}>
                <FiltersSidebar
                  categories={categories}
                  levels={levels}
                  selectedCategories={selectedCategories}
                  selectedLevels={selectedLevels}
                  priceRange={priceRange}
                  toggleCategory={toggleCategory}
                  toggleLevel={toggleLevel}
                  setPriceRange={setPriceRange}
                  clearFilters={clearFilters}
                  allCourses={initialCourses}
                  showFilters={true}
                />
              </DialogContent>
            </Dialog>

            <div className="flex-1 p-6">
              {paginatedCourses.length > 0 ? (
                <>
                  <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
                      {paginatedCourses.map((course) => (
                        <div key={course.id} className="h-full">
                          <CourseCard course={course} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                      <div className="text-sm text-gray-600 order-2 sm:order-1">
                        Showing {startIndex + 1}-{endIndex} of {filteredCourses.length} courses
                      </div>
                      <div className="flex justify-center items-center gap-2 order-1 sm:order-2">
                        <button
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1 || isTransitioning}
                          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                            currentPage === 1 || isTransitioning ? "text-gray-400 cursor-not-allowed opacity-50" : "text-gray-700 hover:bg-gray-100"
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
                              className={`px-3 py-2 rounded-md text-sm font-medium ${
                                currentPage === pageNum ? "bg-[#61503c] text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
                              } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages || isTransitioning}
                          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                            currentPage === totalPages || isTransitioning ? "text-gray-400 cursor-not-allowed opacity-50" : "text-gray-700 hover:bg-gray-100"
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
                <div className="text-center py-20">
                  <div className="text-8xl mb-6">📚</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No courses found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">Try adjusting your filters or search terms.</p>
                  <button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDirectoryClient;