// import React, { useCallback, useState } from 'react';
// import { Product } from '@/app/types/product';
// import { ChevronLeft, ChevronRight } from '@mui/icons-material';
// interface PaginationProp{
// filteredProducts:Product[],
// currentPage:number

// }
// export const Pagination:React.FC<PaginationProp>=({filteredProducts})=>{
    
//       const [currentPage, setCurrentPage] = useState(1);
//       const [isMobile, setIsMobile] = useState(false);
//       const [isTransitioning, setIsTransitioning] = useState(false);
//   const productsPerPage = isMobile ? 12 : 16;
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const startIndex = (currentPage - 1) * productsPerPage;
//   const endIndex = startIndex + productsPerPage;
//   const currentProducts = filteredProducts.slice(startIndex, endIndex);
//     const goToPage = useCallback((page: number) => {
//       if (page === currentPage || isTransitioning) return;
      
//       setIsTransitioning(true);
//       setCurrentPage(page);
      
//       // Smooth scroll to top
//       const scrollToTop = () => {
//         const startPosition = window.pageYOffset;
//         const targetPosition = 0;
//         const distance = targetPosition - startPosition;
//         const duration = 500; // 500ms animation
//         let startTime: number | null = null;
  
//         const animation = (currentTime: number) => {
//           if (startTime === null) startTime = currentTime;
//           const timeElapsed = currentTime - startTime;
//           const progress = Math.min(timeElapsed / duration, 1);
          
//           // Easing function for smooth animation
//           const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          
//           window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));
          
//           if (timeElapsed < duration) {
//             requestAnimationFrame(animation);
//           } else {
//             setIsTransitioning(false);
//           }
//         };
        
//         requestAnimationFrame(animation);
//       };
  
//       scrollToTop();
//     }, [currentPage, isTransitioning]);
  
//     const goToPrevPage = useCallback(() => {
//       if (currentPage > 1) {
//         goToPage(currentPage - 1);
//       }
//     }, [currentPage, goToPage]);
  
//     const goToNextPage = useCallback(() => {
//       if (currentPage < totalPages) {
//         goToPage(currentPage + 1);
//       }
//     }, [currentPage, totalPages, goToPage]);
  
//     // Enhanced page numbers calculation
//     const getPageNumbers = useCallback(() => {
//       const pages = [];
//       const maxVisiblePages = isMobile ? 3 : 5;
      
//       if (totalPages <= maxVisiblePages) {
//         for (let i = 1; i <= totalPages; i++) pages.push(i);
//       } else {
//         const sidePages = Math.floor(maxVisiblePages / 2);
//         let startPage = Math.max(1, currentPage - sidePages);
//         let endPage = Math.min(totalPages, currentPage + sidePages);
        
//         if (endPage - startPage + 1 < maxVisiblePages) {
//           if (startPage === 1) {
//             endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
//           } else {
//             startPage = Math.max(1, endPage - maxVisiblePages + 1);
//           }
//         }
        
//         for (let i = startPage; i <= endPage; i++) pages.push(i);
//       }
//       return pages;
//     }, [totalPages, currentPage, isMobile]);
  
//     return  <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
//                           {/* Page info */}
//                           <div className="text-sm text-gray-600">
//                             Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
//                           </div>
    
//                           {/* Pagination controls */}
//                           <div className="flex justify-center items-center gap-2">
//                             <button
//                               onClick={goToPrevPage}
//                               disabled={currentPage === 1 || isTransitioning}
//                               className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
//                                 currentPage === 1 || isTransitioning
//                                   ? "text-gray-400 cursor-not-allowed opacity-50"
//                                   : "text-gray-700 hover:bg-gray-100 hover:scale-105"
//                               }`}
//                             >
//                               <ChevronLeft className="w-4 h-4" />
//                               <span className="hidden sm:inline">Previous</span>
//                             </button>
    
//                             <div className="flex gap-1">
//                               {getPageNumbers().map((pageNum) => (
//                                 <button
//                                   key={pageNum}
//                                   onClick={() => goToPage(pageNum)}
//                                   disabled={isTransitioning}
//                                   className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
//                                     currentPage === pageNum
//                                       ? "bg-[#61503c] text-white shadow-md"
//                                       : "text-gray-700 hover:bg-gray-100"
//                                   } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 >
//                                   {pageNum}
//                                 </button>
//                               ))}
//                             </div>
    
//                             <button
//                               onClick={goToNextPage}
//                               disabled={currentPage === totalPages || isTransitioning}
//                               className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
//                                 currentPage === totalPages || isTransitioning
//                                   ? "text-gray-400 cursor-not-allowed opacity-50"
//                                   : "text-gray-700 hover:bg-gray-100 hover:scale-105"
//                               }`}
//                             >
//                               <span className="hidden sm:inline">Next</span>
//                               <ChevronRight className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
    
// }

"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const goToPrevPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  // If only 1 page, disable pagination
  const disablePagination = totalPages <= 1;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
      {/* Page info */}
      <div className="text-sm text-gray-600">
        Showing page {currentPage} of {totalPages}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1 || disablePagination}
          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentPage === 1 || disablePagination
              ? "text-gray-400 cursor-not-allowed opacity-50"
              : "text-gray-700 hover:bg-gray-100 hover:scale-105"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex gap-1">
          {[currentPage].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              disabled={disablePagination}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                currentPage === pageNum
                  ? "bg-[#61503c] text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              } ${disablePagination ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages || disablePagination}
          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentPage === totalPages || disablePagination
              ? "text-gray-400 cursor-not-allowed opacity-50"
              : "text-gray-700 hover:bg-gray-100 hover:scale-105"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
