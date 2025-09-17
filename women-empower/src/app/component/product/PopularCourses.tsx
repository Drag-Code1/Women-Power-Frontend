"use client";

import React, { useRef, useState } from "react";
import CourseCard from "../cart/CourseCard";
import { allCourses } from "@/app/data/courses";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"; 
import "@/app/globals.css";

const PopularCourses: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ sirf popular courses filter karo
  const popularCourses = allCourses.filter((course) => course.isPopular);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.children[0] as HTMLElement;
      const cardWidth = firstChild?.clientWidth || 0;
      const gap = 24; // gap-6 = 1.5rem = 24px
      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) =>
        direction === "left"
          ? Math.max(0, prev - 1)
          : Math.min(popularCourses.length - 1, prev + 1)
      );
    }
  };

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-5 bg-[#f6f0e3] rounded-sm  ">
        {/* Title */}
       <div className="mb-4 sm:mb-5 text-left">
        <h3 className="text-black text-2xl sm:text-2xl">Popular Courses</h3>
      </div>

        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full 
                       flex items-center justify-center shadow-md bg-white text-gray-700 
                       hover:bg-gray-100 transition-all"
            aria-label="Scroll Left"
          >
            <ArrowBackIos fontSize="small" />
          </button>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full 
                       flex items-center justify-center shadow-md bg-white text-gray-700 
                       hover:bg-gray-100 transition-all"
            aria-label="Scroll Right"
          >
            <ArrowForwardIos fontSize="small" />
          </button>

          {/* Courses Container */}
          <div className="bg-[#f6f0e3] rounded-lg">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
            >
              {popularCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 max-w-sm"
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularCourses;
