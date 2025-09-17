"use client";
import React from "react";

interface FiltersSidebarProps {
  categories: string[];
  levels: string[];
  languages: string[];
  priceRanges: { label: string; min: number; max: number }[];
  selectedCategories: string[];
  selectedLevels: string[];
  selectedLanguages: string[];
  priceRange: string;
  toggleCategory: (c: string) => void;
  toggleLevel: (l: string) => void;
  toggleLanguage: (l: string) => void;
  setPriceRange: (val: string) => void;
  clearFilters: () => void;
  allCourses: any[];
  showFilters: boolean;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  categories,
  levels,
  languages,
  priceRanges,
  selectedCategories,
  selectedLevels,
  selectedLanguages,
  priceRange,
  toggleCategory,
  toggleLevel,
  toggleLanguage,
  setPriceRange,
  clearFilters,
  allCourses,
  showFilters,
}) => (
  <div
    className={`w-80 bg-white border-r border-gray-200 p-6 min-h-screen overflow-y-auto ${
      showFilters ? "block" : "hidden lg:block"
    }`}
  >
    <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

    {/* Categories */}
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Categories</h3>
      <div className="space-y-1">
        {categories.map((category) => (
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
            <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 rounded-full">
              {allCourses.filter((c) => c.category === category).length}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Levels */}
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Skill Level</h3>
      <div className="space-y-1">
        {levels.map((level) => (
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
            <span className="ml-2 text-sm text-gray-700">{level}</span>
            <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 rounded-full">
              {allCourses.filter((c) => c.level === level).length}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Languages */}
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Language</h3>
      <div className="space-y-1">
        {languages.map((language) => (
          <label
            key={language}
            className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedLanguages.includes(language)}
              onChange={() => toggleLanguage(language)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">{language}</span>
            <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 rounded-full">
              {allCourses.filter((c) => c.language === language).length}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Price */}
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Price Range</h3>
      <div className="space-y-1">
        {priceRanges.map((range) => (
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
            <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 rounded-full">
              {
                allCourses.filter(
                  (c) => c.price >= range.min && c.price <= range.max
                ).length
              }
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Clear */}
    {(selectedCategories.length > 0 ||
      selectedLevels.length > 0 ||
      selectedLanguages.length > 0 ||
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
