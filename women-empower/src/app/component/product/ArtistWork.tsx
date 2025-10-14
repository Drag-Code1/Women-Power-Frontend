"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Visibility,
} from "@mui/icons-material";
import "@/app/globals.css";

interface ArtworkItem {
  p_Name: string;
  thumbnail: string;
  category_id: string;
  artist_id: string;
  price: string;
  discount: number;
  isTrending: boolean;
}

interface ArtistWorkProps {
  artistId: string;
  artworks?: ArtworkItem[];
}

const ArtistWork: React.FC<ArtistWorkProps> = ({ artistId, artworks = [] }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // If no artworks provided, use sample data with your structure
  const sampleArtworks: ArtworkItem[] = artworks.length > 0 
    ? artworks 
    : [
      {
        p_Name: "beautiful",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQBESsb7kwEVAH_xogjxKLR-YoBummE1-rA&s",
        category_id: "3ed5e785-e7e9-439c-b7a8-1f84b6fb6886",
        artist_id: "98a1befd-f06f-45ee-aedf-17fbdf15e2f4",
        price: "400.00",
        discount: 5,
        isTrending: false
      },
      {
        p_Name: "traditional art",
        thumbnail: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=300&fit=crop",
        category_id: "3ed5e785-e7e9-439c-b7a8-1f84b6fb6887",
        artist_id: "98a1befd-f06f-45ee-aedf-17fbdf15e2f4",
        price: "500.00",
        discount: 10,
        isTrending: true
      },
      {
        p_Name: "floral design",
        thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        category_id: "3ed5e785-e7e9-439c-b7a8-1f84b6fb6888",
        artist_id: "98a1befd-f06f-45ee-aedf-17fbdf15e2f4",
        price: "350.00",
        discount: 0,
        isTrending: false
      },
      {
        p_Name: "geometric pattern",
        thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&sat=-100",
        category_id: "3ed5e785-e7e9-439c-b7a8-1f84b6fb6889",
        artist_id: "98a1befd-f06f-45ee-aedf-17fbdf15e2f4",
        price: "450.00",
        discount: 15,
        isTrending: true
      },
      {
        p_Name: "festival special",
        thumbnail: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=300&fit=crop&hue=rotate-90",
        category_id: "3ed5e785-e7e9-439c-b7a8-1f84b6fb6890",
        artist_id: "98a1befd-f06f-45ee-aedf-17fbdf15e2f4",
        price: "600.00",
        discount: 20,
        isTrending: true
      },
      {
        p_Name: "modern rangoli",
        thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&hue=rotate-180",
        category_id: "3ed5e785-e7e9-439c-b7a8-1f84b6fb6891",
        artist_id: "98a1befd-f06f-45ee-aedf-17fbdf15e2f4",
        price: "550.00",
        discount: 5,
        isTrending: false
      }
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

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", checkScrollButtons);
    return () => container?.removeEventListener("scroll", checkScrollButtons);
  }, []);

  // Calculate discounted price
  const calculateDiscountedPrice = (price: string, discount: number) => {
    const originalPrice = parseFloat(price);
    const discountAmount = originalPrice * (discount / 100);
    return (originalPrice - discountAmount).toFixed(2);
  };

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
            {sampleArtworks.map((artwork, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm hover:shadow-xl 
                         transition-all duration-300 overflow-hidden group"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={artwork.thumbnail}
                    alt={artwork.p_Name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 
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

                  {/* Trending Badge */}
                  {artwork.isTrending && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Trending
                      </span>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {artwork.discount > 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {artwork.discount}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
                    {artwork.p_Name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    {artwork.discount > 0 ? (
                      <>
                        <span className="text-lg font-bold text-gray-900">
                          ₹{calculateDiscountedPrice(artwork.price, artwork.discount)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{artwork.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ₹{artwork.price}
                      </span>
                    )}
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