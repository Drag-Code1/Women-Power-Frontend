// app/courses/CourseCard.tsx
"use client";
import React from "react";
import R2Image from "../dashboard/dashboardallproductstab/R2Image";
import { DEFAULT_THUMBNAIL } from "@/app/data/dashboardproductdata";

interface Course {
  id: string;
  thumbnail: string;
  course_coordinator: string;
  category_id: string;
  title: string;
  description: string;
  lessons: number;
  level: string;
  price: string;
  discount: number;
}

import { useCategoryDetails } from "../../hooks/useCategoryDetails";

const CourseCard = ({ course }: { course: Course }) => {
  const originalPrice = parseFloat(course.price);
  const discountedPrice = (originalPrice * (1 - course.discount / 100)).toFixed(2);
  const { details, loading } = useCategoryDetails(course.category_id);

  // WhatsApp redirect handler for button
  const handleEnrollClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    const whatsappGroupUrl = "https://chat.whatsapp.com/FWVKMPyz3QuKBcbv3jnmOm";
    window.open(whatsappGroupUrl, '_blank');
  };

  // WhatsApp redirect handler for card
  const handleCardClick = () => {
    const whatsappGroupUrl = "https://chat.whatsapp.com/FWVKMPyz3QuKBcbv3jnmOm";
    window.open(whatsappGroupUrl, '_blank');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group h-full flex flex-col cursor-pointer relative"
    >
      {/* Thumbnail - Fixed Height */}
      <div className="relative overflow-hidden h-40 flex-shrink-0 bg-gray-200">
        <R2Image 
          src={course.thumbnail} 
          fallbackSrc={DEFAULT_THUMBNAIL}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        
        {/* Price Tag */}
        <div className="absolute top-3 right-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl px-3 py-2">
          <div className="flex items-center gap-1">
            <span className="text-xs text-green-600">₹</span>
            <span className="text-sm font-bold text-gray-900">{discountedPrice}</span>
          </div>
          {course.discount > 0 && (
            <div className="text-xs text-gray-500 line-through">₹{course.price}</div>
          )}
        </div>

        {/* Discount Badge */}
        {course.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {course.discount}% OFF
          </div>
        )}

        {/* WhatsApp Indicator on Image */}
        <div className="absolute bottom-3 right-3 bg-green-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          <svg 
            className="w-4 h-4 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>
      </div>

      {/* Content - Fixed Height */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2 gap-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full truncate">
            {loading ? "Loading..." : (details?.name || course.category_id)}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0">
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight h-14">
          {course.title}
        </h3>

        <div className="mb-3">
          <span className="text-sm text-gray-600 font-medium line-clamp-1">{course.course_coordinator}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
          {course.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 pt-3 border-t border-gray-100">
          <span>📚</span>
          <span>{course.lessons} lessons</span>
        </div>

        {/* Enroll Button with WhatsApp */}
        <button
          onClick={handleEnrollClick}
          className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors bg-green-500 text-white hover:bg-green-600 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <svg 
            className="w-4 h-4" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Enroll via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
