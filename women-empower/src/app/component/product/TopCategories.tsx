"use client";

import React, { useRef, useState } from "react";
import { allProducts } from "../../data/products";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"; // ✅ MUI Icons
import "@/app/globals.css"; 

interface Category {
  id: number;
  name: string;
  count: number;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="flex-shrink-0 w-28 sm:w-32 md:w-36 bg-white rounded-xl transition duration-300 overflow-hidden cursor-pointer relative">
      <div className="relative w-full h-24 sm:h-28 md:h-32 overflow-hidden flex items-center justify-center">
        <img
          src="/images/tedee.png"
          alt={category.name}
          className="w-20 h-20 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-1 sm:p-1">
        <h3 className="font-medium text-gray-800 text-xs sm:text-sm text-center leading-tight min-h-[28px] flex items-center justify-center">
          {category.name}
        </h3>
      </div>
    </div>
  );
};

const TopCategories: React.FC = () => {
  const categoriesMap: Record<string, Category> = {};
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  allProducts.forEach((product, index) => {
    if (!categoriesMap[product.category]) {
      categoriesMap[product.category] = {
        id: index + 1,
        name: product.category,
        count: 1,
      };
    } else {
      categoriesMap[product.category].count += 1;
    }
  });

  const categories = Object.values(categoriesMap);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.children[0] as HTMLElement;
      const cardWidth = firstChild?.clientWidth || 0;
      const gap = 24; // same as gap-6 (1.5rem)
      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) =>
        direction === "left"
          ? Math.max(0, prev - 1)
          : Math.min(categories.length - 1, prev + 1)
      );
    }
  };

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 bg-white rounded-sm relative">
        
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full 
                     flex items-center justify-center shadow-md bg-white text-gray-700 
                     hover:bg-gray-100 transition-all"
        >
          <ArrowBackIos fontSize="small" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full 
                     flex items-center justify-center shadow-md bg-white text-gray-700 
                     hover:bg-gray-100 transition-all"
        >
          <ArrowForwardIos fontSize="small" />
        </button>

        {/* Scrollable Categories */}
        <div ref={scrollContainerRef} className="overflow-x-auto scroll-smooth scrollbar-hide">
          <div className="flex gap-4 sm:gap-5 md:gap-6 w-max">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopCategories;
