"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Visibility,
  Star as StarIcon,
} from "@mui/icons-material";
import "@/app/globals.css";

interface ArtworkItem {
  id: number;
  title: string;
  image: string;
  rating: number;
  likes: number;
  category: string;
}

interface ArtistWorkProps {
  artistId: string;
  workImages?: string[];
}

const ArtistWork: React.FC<ArtistWorkProps> = ({ artistId, workImages = [] }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Sample artwork data
  const sampleArtworks: ArtworkItem[] = [
    {
      id: 1,
      title: "Beautiful Rangoli Design",
      image:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=300&fit=crop",
      rating: 4.8,
      likes: 125,
      category: "Traditional",
    },
    {
      id: 2,
      title: "Floral Rangoli Art",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rating: 4.9,
      likes: 89,
      category: "Floral",
    },
    {
      id: 3,
      title: "Geometric Pattern",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&sat=-100",
      rating: 4.7,
      likes: 156,
      category: "Geometric",
    },
    {
      id: 4,
      title: "Festival Special",
      image:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=300&fit=crop&hue=rotate-90",
      rating: 5.0,
      likes: 203,
      category: "Festival",
    },
    {
      id: 5,
      title: "Modern Rangoli",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&hue=rotate-180",
      rating: 4.6,
      likes: 97,
      category: "Modern",
    },
    {
      id: 6,
      title: "Peacock Design",
      image:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=300&fit=crop&hue=rotate-45",
      rating: 4.9,
      likes: 178,
      category: "Traditional",
    },
    {
      id: 7,
      title: "Lotus Rangoli",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&hue=rotate-270",
      rating: 4.8,
      likes: 134,
      category: "Spiritual",
    },
    {
      id: 8,
      title: "Abstract Art",
      image:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=300&fit=crop&brightness=1.2",
      rating: 4.7,
      likes: 112,
      category: "Abstract",
    },
  ];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 280;
      const scrollAmount = cardWidth * 2;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      setTimeout(checkScrollButtons, 400);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        fontSize="small"
        className={`${
          i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
        }`}
      />
    ));
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", checkScrollButtons);
    return () => container?.removeEventListener("scroll", checkScrollButtons);
  }, []);

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <section className="relative p-4 sm:p-6 bg-gray-50 rounded-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl text-black mb-2">
            Artist Work's
          </h2>
        </div>

        <div className="relative">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-white text-gray-700 hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-white text-gray-700 hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sampleArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm hover:shadow-xl 
                         transition-all duration-300 overflow-hidden group"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 
                               transition-all duration-300 flex items-center justify-center">
                    <button
                      className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 
                               px-4 py-2 rounded-full font-semibold flex items-center gap-2
                               transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <Visibility fontSize="small" />
                      View Details
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                      {artwork.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">by Artist Name</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {renderStars(artwork.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {artwork.rating} ({artwork.likes})
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center">
                    <button className="bg-[#695946] hover:bg-[#61503c] text-white px-6 py-2 rounded-full text-sm font-semibold transition-all w-full">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistWork;
