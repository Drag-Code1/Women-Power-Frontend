// "use client";
import React from "react";
import { Play, Star, Users, BookOpen, Calendar } from "lucide-react";

type Course = {
  id: number;
  title: string;
  instructor: string;
  instructorImage: string;
  thumbnail: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  description: string;
  tags: string[];
  isPopular: boolean;
  language: string;
  startDate: string;
};

const CourseCard = ({ course }: { course: Course }) => (
  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
    {/* Thumbnail */}
    <div className="relative overflow-hidden">
      <img src={course.thumbnail} alt={course.title}
        className="w-full h-38 object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
        <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black bg-opacity-50 rounded-full p-3" />
      </div>

      {course.isPopular && (
        <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Popular
        </div>
      )}

      <div className="absolute top-3 right-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl px-2 py-1">
        <div className="flex items-center gap-1">
          <span className="text-xs text-green-600">₹</span>
          <span className="text-sm font-bold text-gray-900">{course.price}</span>
        </div>
        {course.originalPrice && (
          <div className="text-xs text-gray-500 line-through">₹{course.originalPrice}</div>
        )}
      </div>

      <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs">
        {course.duration}
      </div>
    </div>

    {/* Content */}
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-2 rounded-full">
          {course.category}
        </span>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-full">
          {course.level}
        </span>
      </div>

      <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 leading-tight">
        {course.title}
      </h3>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-600 font-medium">{course.instructor}</span>
      </div>

      <p className="text-gray-600 text-sm mb-2 line-clamp-2 leading-relaxed">{course.description}</p>

      <div className="flex items-center gap-6 mb-5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-gray-900">{course.rating}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{course.students.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>{course.lessons} lessons</span>
        </div>
      </div>
    </div>
  </div>
);

export default CourseCard;