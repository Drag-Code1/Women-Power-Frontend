"use client";

import React, { useRef, useState } from "react";
import { Play, Star, Users, BookOpen, ArrowLeft, ArrowRight } from "lucide-react";

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
  isPopular?: boolean;
}

// Sample courses data - Replace with your actual data
const allCourses: Course[] = [
  {
    id: "6960b9ee-74a6-4067-a95e-f338413201c4",
    thumbnail: "images/treditional.png",
    course_coordinator: "Dhananday Kumar",
    category_id: "Programming",
    title: "Advanced Python Programming",
    description: "Dive deep into advanced Python topics like generators, decorators, multithreading, and performance optimization.",
    lessons: 11,
    level: "advance",
    price: "249.50",
    discount: 15,
    isPopular: true
  },
  {
    id: "2",
    thumbnail: "images/treditional.png",
    course_coordinator: "Priya Sharma",
    category_id: "Design",
    title: "UI/UX Design Masterclass",
    description: "Learn the fundamentals of user interface and user experience design from industry experts.",
    lessons: 24,
    level: "intermediate",
    price: "199.00",
    discount: 20,
    isPopular: true
  },
  {
    id: "3",
    thumbnail: "images/treditional.png",
    course_coordinator: "Rahul Verma",
    category_id: "Web Development",
    title: "Full Stack Web Development",
    description: "Build complete web applications using modern technologies like React, Node.js, and MongoDB.",
    lessons: 32,
    level: "intermediate",
    price: "299.00",
    discount: 25,
    isPopular: true
  },
  {
    id: "4",
    thumbnail: "images/treditional.png",
    course_coordinator: "Anita Desai",
    category_id: "Marketing",
    title: "Digital Marketing Strategy",
    description: "Master digital marketing techniques including SEO, social media, email marketing, and analytics.",
    lessons: 18,
    level: "beginner",
    price: "149.00",
    discount: 10,
    isPopular: true
  }
];

const CourseCard = ({ course }: { course: Course }) => {
  const originalPrice = parseFloat(course.price);
  const discountedPrice = (originalPrice * (1 - course.discount / 100)).toFixed(2);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group h-full flex flex-col">
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-40 flex-shrink-0 bg-gray-200">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0  transition-all duration-300 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black bg-opacity-50 rounded-full p-3" />
        </div>

        {/* Popular Badge */}
        {course.isPopular && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Popular
          </div>
        )}

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
          <div className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {course.discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2 gap-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full truncate">
            {course.category_id}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0">
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
        </div>

        <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2 leading-tight h-12">
          {course.title}
        </h3>

        <div className="mb-3">
          <span className="text-sm text-gray-600 font-medium line-clamp-1">{course.course_coordinator}</span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed flex-1">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularCourses = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only popular courses
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
    <div className="bg-[#f1f2f4] py-2 px-4">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 sm:py-4 bg-[#f6f0e3] rounded-lg">
        {/* Title */}
        <div className="mb-6 text-left">
          <h2 className="text-black text-3xl font-bold">Popular Courses</h2>
        </div>

        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            disabled={currentIndex === 0}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full 
                       flex items-center justify-center shadow-md bg-white text-gray-700 
                       hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Scroll Left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            disabled={currentIndex >= popularCourses.length - 1}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full 
                       flex items-center justify-center shadow-md bg-white text-gray-700 
                       hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Scroll Right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Courses Container */}
          <div className="px-0">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {popularCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm"
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