// "use client";
import React, {} from "react";
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { allCourses } from "../data/courses";
import CourseCard from "../component/cart/CourseCard";
import FiltersSidebar from "../component/product/FiltersSidebar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CourseFilter } from "../component/ui/button/CourseFilter";
import { CourseMobileSidebarFilter } from "../component/courses/CoursesMobileSidebar";
import { CoursesContainer } from "../component/courses/CoursesContainer";
import { CoursesSearchBar, CouserSearchBar } from "../component/courses/CoursesSearchBar";
import { fetchCourses } from "../lib/api";

const CoursesDirectoryApp = async() => {

  const coursesData=await fetchCourses();
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  // const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  // const [priceRange, setPriceRange] = useState<string>("");
  // const [sortBy, setSortBy] = useState("Popular");
  // const [showFilters, setShowFilters] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);
  // const [isTransitioning, setIsTransitioning] = useState(false);

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 9;

  // useEffect(() => {
  //   const checkMobile = () => setIsMobile(window.innerWidth < 1024);
  //   checkMobile();
  //   window.addEventListener("resize", checkMobile);
  //   return () => window.removeEventListener("resize", checkMobile);
  // }, []);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [searchTerm, selectedCategories, selectedLevels, selectedLanguages, priceRange, sortBy]);

  // const categories = [...new Set(allCourses.map((c) => c.category))];
  // const levels = [...new Set(allCourses.map((c) => c.level))];
  // const languages = [...new Set(allCourses.map((c) => c.language))];

  // const priceRanges = [
  //   { label: "Under ₹1000", min: 0, max: 999 },
  //   { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
  //   { label: "₹2000 - ₹3000", min: 2000, max: 3000 },
  //   { label: "Above ₹3000", min: 3000, max: Infinity },
  // ];

  const sortOptions = ["Popular", "Rating", "Price: Low to High", "Price: High to Low", "Newest", "Most Students"];

  // const toggleCategory = useCallback((c: string) => {
  //   setSelectedCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  // }, []);

  // const toggleLevel = useCallback((l: string) => {
  //   setSelectedLevels((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));
  // }, []);

  // const toggleLanguage = useCallback((l: string) => {
  //   setSelectedLanguages((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));
  // }, []);

  // const clearFilters = useCallback(() => {
  //   setSelectedCategories([]);
  //   setSelectedLevels([]);
  //   setSelectedLanguages([]);
  //   setPriceRange("");
  //   setSearchTerm("");
  //   setCurrentPage(1);
  // }, []);

//    filteredCourses = useMemo(() => {
//     let filtered = allCourses.filter((course) => {
//       const matchesSearch =
//         course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

//       const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
//       const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
//       const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(course.language);

//       let matchesPrice = true;
//       if (priceRange) {
//         const range = priceRanges.find((r) => r.label === priceRange);
//         if (range) matchesPrice = course.price >= range.min && course.price <= range.max;
//       }

//       return matchesSearch && matchesCategory && matchesLevel && matchesLanguage && matchesPrice;
//     });

//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "Rating": return b.rating - a.rating;
//         case "Price: Low to High": return a.price - b.price;
//         case "Price: High to Low": return b.price - a.price;
//         case "Most Students": return b.students - a.students;
//         case "Newest": return b.id - a.id;
//         case "Popular":
//         default:
//           if (a.isPopular !== b.isPopular) return b.isPopular ? 1 : -1;
//           return b.rating - a.rating;
//       }
//     });
//     return filtered;
//   }, [searchTerm, selectedCategories, selectedLevels, selectedLanguages, priceRange, sortBy]);

//   const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

//   const paginatedCourses = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredCourses.slice(start, start + itemsPerPage);
//   }, [filteredCourses, currentPage]);

//   const goToPage = useCallback((page: number) => {
//     if (page === currentPage || isTransitioning || page < 1 || page > totalPages) return;
//     setIsTransitioning(true);
//     setCurrentPage(page);

//     const startPosition = window.pageYOffset;
//     const duration = 500;
//     let startTime: number | null = null;

//     const animation = (currentTime: number) => {
//       if (startTime === null) startTime = currentTime;
//       const timeElapsed = currentTime - startTime;
//       const progress = Math.min(timeElapsed / duration, 1);
//       const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
//       window.scrollTo(0, startPosition * (1 - ease));
//       if (timeElapsed < duration) requestAnimationFrame(animation);
//       else setIsTransitioning(false);
//     };
//     requestAnimationFrame(animation);
//   }, [currentPage, isTransitioning, totalPages]);

//   const goToNextPage = useCallback(() => {
//     if (currentPage < totalPages) goToPage(currentPage + 1);
//   }, [currentPage, totalPages, goToPage]);

//   const goToPrevPage = useCallback(() => {
//     if (currentPage > 1) goToPage(currentPage - 1);
//   }, [currentPage, goToPage]);

//   const getPageNumbers = useCallback(() => {
//     const pages = [];
//     const maxVisiblePages = isMobile ? 3 : 5;
//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       const sidePages = Math.floor(maxVisiblePages / 2);
//       let startPage = Math.max(1, currentPage - sidePages);
//       let endPage = Math.min(totalPages, currentPage + sidePages);
//       if (endPage - startPage + 1 < maxVisiblePages) {
//         if (startPage === 1) endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
//         else startPage = Math.max(1, endPage - maxVisiblePages + 1);
//       }
//       for (let i = startPage; i <= endPage; i++) pages.push(i);
//     }
//     return pages;
//   }, [totalPages, currentPage, isMobile]);
// const
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = Math.min(startIndex + itemsPerPage, filteredCourses.length);

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Online Courses</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {5} courses available
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              
              <CourseFilter />
              <select
                // value={sortBy}
                // onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-200"
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
            {/* <input
              type="text"
              placeholder="Search courses..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl pl-10 sm:pl-12 pr-4 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 text-sm sm:text-base"
            /> */}
            <CouserSearchBar />
          </div>
        </div>

        <div className="flex">
          <div className="hidden lg:block">
            <FiltersSidebar
            
            />
          </div>

          {/* <Dialog open={true}
          //  onClose={() => setShowFilters(false)} 
           fullWidth maxWidth="sm">
            <DialogTitle className="flex justify-between items-center border-b">
              <span className="text-lg font-semibold">Filters</span>
              <IconButton 
              // onClick={() => setShowFilters(false)}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ padding: 2, maxHeight: "70vh" }}>
              <FiltersSidebar
                // categories={categories}
                // levels={levels}
                // languages={languages}
                // priceRanges={priceRanges}
                // selectedCategories={selectedCategories}
                // selectedLevels={selectedLevels}
                // selectedLanguages={selectedLanguages}
                // priceRange={priceRange}
                // toggleCategory={toggleCategory}
                // toggleLevel={toggleLevel}
                // toggleLanguage={toggleLanguage}
                // setPriceRange={setPriceRange}
                // clearFilters={clearFilters}
                // allCourses={allCourses}
                // showFilters={true}
              />
            </DialogContent>
          </Dialog> */}
<CourseMobileSidebarFilter />
          <div className="flex-1 p-6">
            {coursesData.data.length > 0 ? (
              <>
                {/* <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedCourses.map((course, index) => (
                      <div
                        key={course.id}
                        className="animate-fadeIn"
                        style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
                      >
                        <CourseCard course={course} />
                      </div>
                    ))}
                  </div>
                </div> */}
                <CoursesContainer courses={coursesData.data} />
<h3>pagination goes here</h3>
               
                   
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">📚</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No courses found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">Try adjusting your filters or search terms.</p>
                <button
                  // onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
      `}</style> */}
    </div>
    </div>
  );
};

export default CoursesDirectoryApp;
