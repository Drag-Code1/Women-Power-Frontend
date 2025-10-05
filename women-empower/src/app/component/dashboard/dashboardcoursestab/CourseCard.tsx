// components/CourseCard.tsx
'use client';
import React from 'react';
import { MoreVertical, Eye, Edit2, Trash2 } from 'lucide-react';
import { Course } from '@/app/types/dashboardcoursetab';
import { calculateDiscountedPrice } from '@/app/lib/utils/dashboardcourse-utils';

interface CourseCardProps {
  course: Course;
  onView: (course: Course) => void;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onView,
  onEdit,
  onDelete,
  isMenuOpen,
  onMenuToggle
}) => {
  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden hover:shadow-sm transition-shadow">
      <div className="relative h-48 bg-gray-200">
        <img 
          src={course.thumbnail} 
          alt={course.courseName} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={onMenuToggle}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <MoreVertical size={18} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-10 border">
              <button
                onClick={() => onView(course)}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left rounded-t-lg"
              >
                <Eye size={16} /> View
              </button>
              <button
                onClick={() => onEdit(course)}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left"
              >
                <Edit2 size={16} /> Edit
              </button>
              <button
                onClick={() => onDelete(course.id)}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 text-left rounded-b-lg"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {course.category}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {course.level}
          </span>
        </div>
        <h3 className="text-gray-900 mb-1 line-clamp-2">{course.courseName}</h3>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-gray-900">
            ₹{calculateDiscountedPrice(course.price, course.discount)}
          </span>
          <span className="text-sm text-gray-400 line-through">₹{course.price}</span>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
            {course.discount}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;