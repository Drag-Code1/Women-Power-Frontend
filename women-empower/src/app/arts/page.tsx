
import {
 
  SlidersHorizontal,
} from "lucide-react";
import { allProducts } from "../data/products";
import ProductCardNew from "../component/cart/ProductCardNew";
import Filters from "../component/product/Filters";

// Material UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { SortList } from "../component/arts/SortList";
import { SearchBar } from "../component/arts/SearchBar";
import { Pagination } from "../component/arts/Pagination";
import { ClearFilter } from "../component/arts/ClearFilter";
import { ProductContainer } from "../component/arts/ProductsContainer";
import { ViewMode } from "../component/arts/ViewMode";
import { MobileView } from "../component/arts/MobileView";
import { MobileViewFilter } from "../component/arts/MobileViewFilter";
async function getArts(searched:string) {
  console.log(searched);
  
  // const query = searched ? `?search=${encodeURIComponent(searched)}` : "";
  const query = searched ? `?search=${encodeURIComponent(searched)}` : "";
  const res = await fetch(`http://localhost:5000/api/products${query}`, {
    cache: "no-store", // better for live searching
  });

  return res.json()
}
const ProductFilterApp = async({ searchParams }: { searchParams: { search?: string, page?: string } }) => {
  const searched = searchParams.search;
  const page = Number(searchParams.page) > 0 ? Number(searchParams.page) : 1;
  const pageSize = 16; // items per page
  const arts = await getArts(searched);

  const totalItems = Array.isArray(arts) ? arts.length : 0;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / pageSize) : 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = Array.isArray(arts) ? arts.slice(startIndex, endIndex) : [];
  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
    <div className="min-h-screen bg-white">
      {/* Main Container with proper max-width and centering */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              New Items 
              ({totalItems})
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              {/* View toggle */}
             
<ViewMode />
              {/* Sort select */}
              <SortList />
             

              {/* Mobile filter button */}
              {/* <button
                className="md:hidden flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-all duration-200"
                // onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button> */}

              <MobileView />
            </div>
          </div>

          {/* Search bar */}
          <SearchBar />
   
        </div>

        <div className="flex">
          {/* Sidebar (desktop) */}
          <div className="hidden md:block w-64 border-r border-gray-200 bg-white">
            <Filters
            />
          </div>

          {/* Mobile Filters Modal */}
     
<MobileViewFilter />
          {/* Main Content Area */}
      
          <ProductContainer currentProducts={currentProducts} totalPages={totalPages} viewMode={'grid'} />
        </div>
      </div>

      {/* CSS for animations */}
 
    </div>
    </div>
  );
};

export default ProductFilterApp;


// app/ProductFilterApp.tsx
// "use client";
// import React, { useMemo, useState, useEffect, useCallback } from "react";
// import {
//   Search,
//   Grid,
//   List,
//   SlidersHorizontal,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { allProducts } from "../data/products";
// import ProductCardNew from "../component/cart/ProductCardNew";
// import Filters from "../component/product/Filters";

// // Material UI
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { SortList } from "../component/arts/SortList";
// import { SearchBar } from "../component/arts/SearchBar";
// import { Pagination } from "../component/arts/Pagination";
// import { ClearFilter } from "../component/arts/ClearFilter";
// import { ProductContainer } from "../component/arts/ProductsContainer";

// const ProductFilterApp = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
//   const [sortBy, setSortBy] = useState("Popular");
//   const [viewMode, setViewMode] = useState("grid");
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, selectedCategories, selectedPriceRanges, sortBy]);

//   // const categories = [...new Set(allProducts.map((p) => p.category))];

//   // const priceRanges = [
//   //   { label: "Under ₹500", min: 0, max: 499 },
//   //   { label: "₹500 - ₹750", min: 500, max: 750 },
//   //   { label: "₹750 - ₹1000", min: 751, max: 1000 },
//   //   { label: "₹1000 - ₹1500", min: 1001, max: 1500 },
//   //   { label: "Over ₹1500", min: 1501, max: Infinity },
//   // ];

//   // const sortOptions = [
//   //   "Popular",
//   //   "Price: Low to High",
//   //   "Price: High to Low",
//   //   "Name A-Z",
//   //   "Name Z-A",
//   //   "Rating",
//   // ];

//   // const toggleCategory = useCallback((category: string) => {
//   //   setSelectedCategories((prev) =>
//   //     prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
//   //   );
//   // }, []);

//   // const togglePriceRange = useCallback((range: string) => {
//   //   setSelectedPriceRanges((prev) =>
//   //     prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
//   //   );
//   // }, []);

//   // const clearFilters = useCallback(() => {
//   //   setSelectedCategories([]);
//   //   setSelectedPriceRanges([]);
//   //   setSearchTerm("");
//   //   setCurrentPage(1);
//   // }, []);

//   const filteredProducts = useMemo(() => {
//     let filtered = allProducts.filter((p) => {
//       const matchesSearch =
//         p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         p.description.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesCategory =
//         selectedCategories.length === 0 || selectedCategories.includes(p.category);

//       let matchesPrice = selectedPriceRanges.length === 0;
//       if (selectedPriceRanges.length > 0) {
//         matchesPrice = priceRanges.some(
//           (range) =>
//             selectedPriceRanges.includes(range.label) &&
//             p.price >= range.min &&
//             p.price <= range.max
//         );
//       }

//       return matchesSearch && matchesCategory && matchesPrice;
//     });

//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "Name A-Z":
//           return a.title.localeCompare(b.title);
//         case "Name Z-A":
//           return b.title.localeCompare(a.title);
//         case "Price: Low to High":
//           return a.price - b.price;
//         case "Price: High to Low":
//           return b.price - a.price;
//         case "Rating":
//           return b.rating - a.rating;
//         case "Popular":
//         default:
//           return b.rating - a.rating;
//       }
//     });

//     return filtered;
//   }, [searchTerm, selectedCategories, selectedPriceRanges, sortBy]);

//   const productsPerPage = isMobile ? 12 : 16;
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const startIndex = (currentPage - 1) * productsPerPage;
//   const endIndex = startIndex + productsPerPage;
//   const currentProducts = filteredProducts.slice(startIndex, endIndex);

//   // // Enhanced page navigation with smooth transition
//   // const goToPage = useCallback((page: number) => {
//   //   if (page === currentPage || isTransitioning) return;
    
//   //   setIsTransitioning(true);
//   //   setCurrentPage(page);
    
//   //   // Smooth scroll to top
//   //   const scrollToTop = () => {
//   //     const startPosition = window.pageYOffset;
//   //     const targetPosition = 0;
//   //     const distance = targetPosition - startPosition;
//   //     const duration = 500; // 500ms animation
//   //     let startTime: number | null = null;

//   //     const animation = (currentTime: number) => {
//   //       if (startTime === null) startTime = currentTime;
//   //       const timeElapsed = currentTime - startTime;
//   //       const progress = Math.min(timeElapsed / duration, 1);
        
//   //       // Easing function for smooth animation
//   //       const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
//   //       window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));
        
//   //       if (timeElapsed < duration) {
//   //         requestAnimationFrame(animation);
//   //       } else {
//   //         setIsTransitioning(false);
//   //       }
//   //     };
      
//   //     requestAnimationFrame(animation);
//   //   };

//   //   scrollToTop();
//   // }, [currentPage, isTransitioning]);

//   // const goToPrevPage = useCallback(() => {
//   //   if (currentPage > 1) {
//   //     goToPage(currentPage - 1);
//   //   }
//   // }, [currentPage, goToPage]);

//   // const goToNextPage = useCallback(() => {
//   //   if (currentPage < totalPages) {
//   //     goToPage(currentPage + 1);
//   //   }
//   // }, [currentPage, totalPages, goToPage]);

//   // // Enhanced page numbers calculation
//   // const getPageNumbers = useCallback(() => {
//   //   const pages = [];
//   //   const maxVisiblePages = isMobile ? 3 : 5;
    
//   //   if (totalPages <= maxVisiblePages) {
//   //     for (let i = 1; i <= totalPages; i++) pages.push(i);
//   //   } else {
//   //     const sidePages = Math.floor(maxVisiblePages / 2);
//   //     let startPage = Math.max(1, currentPage - sidePages);
//   //     let endPage = Math.min(totalPages, currentPage + sidePages);
      
//   //     if (endPage - startPage + 1 < maxVisiblePages) {
//   //       if (startPage === 1) {
//   //         endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
//   //       } else {
//   //         startPage = Math.max(1, endPage - maxVisiblePages + 1);
//   //       }
//   //     }
      
//   //     for (let i = startPage; i <= endPage; i++) pages.push(i);
//   //   }
//   //   return pages;
//   // }, [totalPages, currentPage, isMobile]);

//   // Keyboard navigation
//   // useEffect(() => {
//   //   const handleKeyDown = (e: KeyboardEvent) => {
//   //     if (e.target instanceof HTMLInputElement) return; // Don't interfere with input fields
      
//   //     switch (e.key) {
//   //       case 'ArrowLeft':
//   //         e.preventDefault();
//   //         goToPrevPage();
//   //         break;
//   //       case 'ArrowRight':
//   //         e.preventDefault();
//   //         goToNextPage();
//   //         break;
//   //     }
//   //   };

//   //   window.addEventListener('keydown', handleKeyDown);
//   //   return () => window.removeEventListener('keydown', handleKeyDown);
//   // }, [goToPrevPage, goToNextPage]);

//   return (
//     <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
//     <div className="min-h-screen bg-white">
//       {/* Main Container with proper max-width and centering */}
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <h1 className="text-2xl font-bold text-gray-900">
//               New Items ({filteredProducts.length})
//             </h1>

//             <div className="flex flex-wrap items-center gap-3">
//               {/* View toggle */}
//               <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 rounded-md transition-all duration-200 ${
//                     viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
//                   }`}
//                 >
//                   <Grid className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 rounded-md transition-all duration-200 ${
//                     viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
//                   }`}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Sort select */}
//               <SortList />
             

//               {/* Mobile filter button */}
//               <button
//                 className="md:hidden flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-all duration-200"
//                 onClick={() => setShowFilters(true)}
//               >
//                 <SlidersHorizontal className="w-4 h-4" /> Filters
//               </button>
//             </div>
//           </div>

//           {/* Search bar */}
//           <SearchBar />
   
//         </div>

//         <div className="flex">
//           {/* Sidebar (desktop) */}
//           <div className="hidden md:block w-64 border-r border-gray-200 bg-white">
//             <Filters
//               // categories={categories}
//               // selectedCategories={selectedCategories}
//               // toggleCategory={toggleCategory}
//               // priceRanges={priceRanges}
//               // selectedPriceRanges={selectedPriceRanges}
//               // togglePriceRange={togglePriceRange}
//               // clearFilters={clearFilters}
//             />
//           </div>

//           {/* Mobile Filters Modal */}
//           <Dialog
//             open={showFilters}
//             onClose={() => setShowFilters(false)}
//             fullWidth
//             maxWidth="sm"
//             PaperProps={{
//               style: {
//                 height: "auto",
//                 maxHeight: "90vh",
//               },
//             }}
//           >
//             <DialogTitle className="flex justify-between items-center">
//               Filters
//               <IconButton onClick={() => setShowFilters(false)}>
//                 <CloseIcon />
//               </IconButton>
//             </DialogTitle>
//             <DialogContent
//               dividers
//               sx={{
//                 padding: 2,
//                 maxHeight: "70vh",
//               }}
//             >
//               <Filters
//                 // categories={categories}
//                 // selectedCategories={selectedCategories}
//                 // toggleCategory={toggleCategory}
//                 // priceRanges={priceRanges}
//                 // selectedPriceRanges={selectedPriceRanges}
//                 // togglePriceRange={togglePriceRange}
//                 // clearFilters={clearFilters}
//               />
//             </DialogContent>
//           </Dialog>

//           {/* Main Content Area */}
      
//           <ProductContainer currentProducts={currentProducts} totalPages={2} viewMode={viewMode} />
//         </div>
//       </div>

//       {/* CSS for animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.4s ease-out;
//         }
//       `}</style>
//     </div>
//     </div>
//   );
// };

// export default ProductFilterApp;


