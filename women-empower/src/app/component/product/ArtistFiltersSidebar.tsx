"use client";
import React from "react";

interface ExperienceRange {
  label: string;
  min: number;
  max: number;
}

interface FiltersSidebarProps {
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  experienceRanges: ExperienceRange[];
  selectedExperience: string[];
  toggleExperience: (range: string) => void;
  allArtists: any[];
  clearFilters: () => void;
}

const ArtistFiltersSidebar: React.FC<FiltersSidebarProps> = ({
  categories,
  selectedCategories,
  toggleCategory,
  experienceRanges,
  selectedExperience,
  toggleExperience,
  allArtists,
  clearFilters,
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 min-h-screen">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>

      {/* Categories Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">{category}</span>
              <span className="ml-auto text-xs text-gray-500">
                ({allArtists.filter((a) => a.category === category).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Experience</h3>
        <div className="space-y-3">
          {experienceRanges.map((range) => (
            <label key={range.label} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedExperience.includes(range.label)}
                onChange={() => toggleExperience(range.label)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">{range.label}</span>
              <span className="ml-auto text-xs text-gray-500">
                (
                {
                  allArtists.filter((a) => {
                    const exp = parseInt(a.experience);
                    return exp >= range.min && exp <= range.max;
                  }).length
                }
                )
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategories.length > 0 || selectedExperience.length > 0) && (
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

export default ArtistFiltersSidebar;
