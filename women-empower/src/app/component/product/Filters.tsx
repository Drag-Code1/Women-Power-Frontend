// app/components/Filters.tsx
"use client";
import React from "react";

interface Props {
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;

  priceRanges: { label: string; min: number; max: number }[];
  selectedPriceRanges: string[];
  togglePriceRange: (range: string) => void;

  clearFilters: () => void;
}

const Filters: React.FC<Props> = ({
  categories,
  selectedCategories,
  toggleCategory,
  priceRanges,
  selectedPriceRanges,
  togglePriceRange,
  clearFilters,
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 min-h-screen">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(range.label)}
                onChange={() => togglePriceRange(range.label)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedPriceRanges.length > 0) && (
        <button
          onClick={clearFilters}
          className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default Filters;
