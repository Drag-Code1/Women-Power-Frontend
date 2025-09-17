"use client";

import React, { useRef, useState } from "react";
import ArtistCard from "../cart/ArtistCard";
import { allArtists, Artist } from "../../data/allArtists";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"; // ✅ MUI Icons
import "@/app/globals.css"; // ✅ Import global CSS for scrollbar-hide

const TopRatedArtists: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Sort by rating (descending) and take top 10
  const topRatedArtists: Artist[] = [...allArtists]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.children[0] as HTMLElement;
      const cardWidth = firstChild?.clientWidth || 0;
      const gap = 24; // same as gap-6
      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) =>
        direction === "left"
          ? Math.max(0, prev - 1)
          : Math.min(topRatedArtists.length - 1, prev + 1)
      );
    }
  };

  return (
        <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-5 bg-[#f6f0e3] rounded-sm ">
      <div className="mb-4 sm:mb-5 text-left">
        <h3 className="text-black text-2xl sm:text-2xl">Top Rated Artists</h3>
      </div>

      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full 
                     flex items-center justify-center shadow-lg bg-white text-gray-700 
                     hover:bg-gray-100 transition-all"
          aria-label="Scroll Left"
        >
          <ArrowBackIos fontSize="small" />
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full 
                     flex items-center justify-center shadow-lg bg-white text-gray-700 
                     hover:bg-gray-100 transition-all"
          aria-label="Scroll Right"
        >
          <ArrowForwardIos fontSize="small" />
        </button>

        {/* Artists Container */}
        <div className="bg-[#f6f0e3] rounded-lg">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {topRatedArtists.map((artist) => (
              <div
                key={artist.id}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 max-w-sm"
              >
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default TopRatedArtists;
