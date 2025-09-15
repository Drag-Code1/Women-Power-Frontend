"use client";
import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import reviewsData from "@/app/data/reviewsData";

const CustomerReviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviewsData.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  return (
    <div className="bg-[#f8f8f8] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-gray-900 text-2xl sm:text-2xl">
            What Our <span className="text-[#61503c]">Customers Say</span>
          </h2>
          <div className="mt-2 w-16 h-1 bg-[#61503c] rounded mx-auto"></div>
        </div>

        <div
          className="flex flex-col lg:flex-row items-center gap-10"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          <div className="lg:w-1/2 flex justify-center">
            <div
              key={activeIndex}
              className="animate-fade-in max-w-xs w-full bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center"
            >
              <Avatar
                src={reviewsData[activeIndex].avatar}
                alt={reviewsData[activeIndex].name}
                sx={{ width: 80, height: 80, margin: "0 auto", mb: 2 }}
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {reviewsData[activeIndex].name}
              </h3>
              <p className="text-gray-500 text-xs">Verified Customer</p>
              <p className="text-[#61503c] text-xs mt-1">
                {reviewsData[activeIndex].date}
              </p>
              <div className="flex justify-center mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    fontSize="small"
                    className={`${
                      star <= Math.floor(reviewsData[activeIndex].rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 min-h-[200px] flex flex-col justify-center">
              <FormatQuoteIcon className="text-[#61503c] text-5xl mb-2" />
              <p
                key={activeIndex}
                className="animate-fade-in text-gray-700 text-base leading-relaxed mb-4"
              >
                {reviewsData[activeIndex].review}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    {reviewsData[activeIndex].name}
                  </h4>
                  <div className="flex items-center mt-1 text-xs">
                    <StarIcon className="text-yellow-500" fontSize="small" />
                    <span className="ml-1 text-[#61503c] font-medium">
                      {reviewsData[activeIndex].rating}
                    </span>
                    <span className="ml-2 text-gray-500">
                      {reviewsData[activeIndex].date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CustomerReviews;
 