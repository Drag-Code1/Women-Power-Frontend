// app/courses/FiltersSidebar.tsx
"use client";
import React from "react";
import "@/app/globals.css";

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

interface FiltersSidebarProps {
  categories: string[];
  levels: string[];
  selectedCategories: string[];
  selectedLevels: string[];
  priceRange: string;
  toggleCategory: (category: string) => void;
  toggleLevel: (level: string) => void;
  setPriceRange: (range: string) => void;
  clearFilters: () => void;
  allCourses: Course[];
  showFilters: boolean;
}

const FiltersSidebar = ({
  categories,
  levels,
  selectedCategories,
  selectedLevels,
  priceRange,
  toggleCategory,
  toggleLevel,
  setPriceRange,
  clearFilters,
  allCourses,
  showFilters,
}: FiltersSidebarProps) => (
  <div
    className={`w-80 bg-white border-r border-gray-200 p-6 max-h-screen overflow-y-auto scrollbar-hide  ${
      showFilters ? "block" : "hidden lg:block"
    }`}
  >
    <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Categories</h3>
      <div className="space-y-1">
        {categories.map((category: string) => (
          <label
            key={category}
            className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">{category}</span>
            <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 rounded-full flex-shrink-0">
              {
                allCourses.filter((c: Course) => c.category_id === category)
                  .length
              }
            </span>
          </label>
        ))}
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Skill Level</h3>
      <div className="space-y-1">
        {levels.map((level: string) => (
          <label
            key={level}
            className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedLevels.includes(level)}
              onChange={() => toggleLevel(level)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
            <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 rounded-full flex-shrink-0">
              {allCourses.filter((c: Course) => c.level === level).length}
            </span>
          </label>
        ))}
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Price Range</h3>
      <div className="space-y-1">
        {[
          { label: "Under ₹100", min: 0, max: 100 },
          { label: "₹100 - ₹250", min: 100, max: 250 },
          { label: "₹250 - ₹500", min: 250, max: 500 },
          { label: "Above ₹500", min: 500, max: Infinity },
        ].map((range) => (
          <label
            key={range.label}
            className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
          >
            <input
              type="radio"
              name="priceRange"
              checked={priceRange === range.label}
              onChange={() =>
                setPriceRange(priceRange === range.label ? "" : range.label)
              }
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">{range.label}</span>
            <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 rounded-full flex-shrink-0">
              {
                allCourses.filter(
                  (c: Course) =>
                    parseFloat(c.price) >= range.min &&
                    parseFloat(c.price) <= range.max
                ).length
              }
            </span>
          </label>
        ))}
      </div>
    </div>

    {(selectedCategories.length > 0 ||
      selectedLevels.length > 0 ||
      priceRange) && (
      <button
        onClick={clearFilters}
        className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
      >
        Clear all filters
      </button>
    )}
  </div>
);

export default FiltersSidebar;
