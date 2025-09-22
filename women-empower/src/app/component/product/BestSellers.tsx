"use client";

import React, { useState, useRef } from "react";
import ProductCardNew, { Product } from "../cart/ProductCardNew";
import { allProducts } from "../../data/products";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { TitleContainer } from "../title-headings/Title";

// interface childrenProp{

//   children:React.ReactElement
// }

const ProductsGrid: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const popularProducts = allProducts.filter((p) => p.isPopular);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.children[0]?.clientWidth || 0;
      const gap = 24;
      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.children[0]?.clientWidth || 0;
      const gap = 24;
      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) =>
        Math.min(popularProducts.length - 1, prev + 1)
      );
    }
  };

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-5 bg-white rounded-sm">
        <div className="mb-4 sm:mb-5 text-left">
          {/* <h3 className="text-black text-2xl sm:text-2xl">Best Sellers</h3> */}

          <TitleContainer>

            Best Sellers
          </TitleContainer>
        </div>

        <div className="relative">
          {/* Left Navigation */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-black"
          >
            <ChevronLeft />
          </button>

          {/* Right Navigation */}
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-black"
          >
            <ChevronRight />
          </button>

          {/* Products */}
          <div className="bg-white rounded-lg">
         
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {popularProducts.map((product: Product) => (
                <div key={product.id} className="flex-shrink-0 w-64 sm:w-72">
                  <ProductCardNew product={product} />
                
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    </div>
  );
};

export default ProductsGrid;
