"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="flex-shrink-0 w-28 sm:w-32 md:w-36 bg-white rounded-xl overflow-hidden cursor-pointer">
      <div className="w-full h-20 sm:h-24 md:h-28 flex items-center justify-center">
        <img
          src={category.image}
          alt={category.name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
        />
      </div>
      <div className="p-2 sm:p-3">
        <h3 className="font-medium text-gray-800 text-xs sm:text-sm text-center leading-tight min-h-[28px] flex items-center justify-center capitalize">
          {category.name}
        </h3>
      </div>
    </div>
  );
};

const TopCategories: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Categories data with your specified image path
  const categories: Category[] = [
    {
      id: "1",
      name: "Rangoli",
      image: "/images/tedee.png"
    },
    {
      id: "2",
      name: "Spiritual",
      image: "/images/tedee.png"
    },
    {
      id: "3",
      name: "Resin",
      image: "/images/tedee.png"
    },
    {
      id: "4",
      name: "Shubh Labh",
      image: "/images/tedee.png"
    },
    {
      id: "5",
      name: "Lapdesk",
      image: "/images/tedee.png"
    },
     {
      id: "6",
      name: "Diya & Thali",
      image: "/images/tedee.png"
    },
    {
      id: "7",
      name: "Decor",
      image: "/images/tedee.png"
    },
     {
      id: "9",
      name: "Diya & Thali",
      image: "/images/tedee.png"
    },
    {
      id: "11",
      name: "Decor",
      image: "/images/tedee.png"
    }
  ];

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll function
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
      
      // Check scroll position after animation
      setTimeout(checkScroll, 300);
    }
  };

  // Initial scroll check
  useEffect(() => {
    checkScroll();
  }, []);

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6  bg-white rounded-sm">        
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full 
                     flex items-center justify-center shadow-lg transition-all duration-200
                     ${canScrollLeft 
                       ? "bg-white text-gray-700 hover:bg-gray-100 hover:scale-110" 
                       : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          <ArrowBackIos fontSize="small" />
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full 
                     flex items-center justify-center shadow-lg transition-all duration-200
                     ${canScrollRight 
                       ? "bg-white text-gray-700 hover:bg-gray-100 hover:scale-110" 
                       : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          <ArrowForwardIos fontSize="small" />
        </button>

        {/* Categories Container */}
        <div className="relative">
          <div 
            ref={scrollContainerRef} 
            className="overflow-x-auto scroll-smooth scrollbar-hide"
            onScroll={checkScroll}
          >
            <div className="flex gap-4 sm:gap-6 w-max py-4 px-2">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopCategories;