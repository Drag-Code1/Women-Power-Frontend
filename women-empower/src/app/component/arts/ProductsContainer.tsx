import React from "react";
import ProductCardNew from "../cart/ProductCardNew";
import { Pagination } from "./Pagination";
import { ClearFilter } from "./ClearFilter";
import { Product } from "@/app/types/product";
interface productContainerProps{
currentProducts:Product[]
totalPages:number;
viewMode:string;
}
export const ProductContainer:React.FC<productContainerProps>=({currentProducts,totalPages,viewMode})=>{
    return(


         <div className="flex-1 bg-white">
            <div className="p-4 sm:p-6">
              {currentProducts.length > 0 ? (
                <>
                  {/* Products Grid with fade transition */}
                  <div
                    className={`transition-opacity duration-300
                         ${
                     'opacity-100'
                    }
                    
                    `}
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
                    // <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                    //   {/* Page info */}
                    //   <div className="text-sm text-gray-600">
                    //     Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                    //   </div>

                    //   {/* Pagination controls */}
                    //   <div className="flex justify-center items-center gap-2">
                    //     <button
                    //       onClick={goToPrevPage}
                    //       disabled={currentPage === 1 || isTransitioning}
                    //       className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    //         currentPage === 1 || isTransitioning
                    //           ? "text-gray-400 cursor-not-allowed opacity-50"
                    //           : "text-gray-700 hover:bg-gray-100 hover:scale-105"
                    //       }`}
                    //     >
                    //       <ChevronLeft className="w-4 h-4" />
                    //       <span className="hidden sm:inline">Previous</span>
                    //     </button>

                    //     <div className="flex gap-1">
                    //       {getPageNumbers().map((pageNum) => (
                    //         <button
                    //           key={pageNum}
                    //           onClick={() => goToPage(pageNum)}
                    //           disabled={isTransitioning}
                    //           className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                    //             currentPage === pageNum
                    //               ? "bg-[#61503c] text-white shadow-md"
                    //               : "text-gray-700 hover:bg-gray-100"
                    //           } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    //         >
                    //           {pageNum}
                    //         </button>
                    //       ))}
                    //     </div>

                    //     <button
                    //       onClick={goToNextPage}
                    //       disabled={currentPage === totalPages || isTransitioning}
                    //       className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    //         currentPage === totalPages || isTransitioning
                    //           ? "text-gray-400 cursor-not-allowed opacity-50"
                    //           : "text-gray-700 hover:bg-gray-100 hover:scale-105"
                    //       }`}
                    //     >
                    //       <span className="hidden sm:inline">Next</span>
                    //       <ChevronRight className="w-4 h-4" />
                    //     </button>
                    //   </div>
                    // </div>

                  
                  // to be uncommented
                    // <Pagination filteredProducts={filteredProducts}  currentPage={currentPage} />
<h1>pagination</h1>

                    //
                  )}
                </>
              ) : (
                // <div className="text-center py-16">
                //   <div className="text-6xl mb-4">🔍</div>
                //   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                //     No products found
                //   </h3>
                //   <p className="text-gray-600 mb-4">
                //     Try adjusting your filters or search terms
                //   </p>
                //   <button
                //     onClick={clearFilters}
                //     className="bg-[#61503c] text-white px-6 py-2 rounded-md hover:bg-[#695946] transition-all duration-200 transform hover:scale-105"
                //   >
                //     Clear all filters
                //   </button>
                // </div>
                <ClearFilter />
              )}
            </div>
          </div>
    )
}