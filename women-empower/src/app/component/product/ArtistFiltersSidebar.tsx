"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState,useEffect, useCallback } from "react";

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

const ArtistFiltersSidebar: React.FC<FiltersSidebarProps> = () => {

  const router = useRouter();
const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const allParams = params.getAll('artist-category');
 const searchParam = searchParams.get("artist-search");
console.log(allParams,"allParams");
type CategoryObj = { categoryName: string; isChecked: boolean };
const [categoriesData, setCategoriesData] = useState<CategoryObj[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);

useEffect(() => {
  
  fetchData();
}, []);
async function fetchData() {
    try {
      const res = await fetch('http://localhost:5000/api/category');
      const categoriesData_ = await res.json();
      console.log(categoriesData_);
     const categoryObject= categoriesData_.map((cat:  string ) => ({ categoryName: cat, isChecked:allParams.includes(cat)? true:false }))
setCategoriesData(categoryObject);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

const toggleCategory = useCallback((category: string, e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.checked) {
     params.delete("artist-search");
    router.replace(`?${params.toString()}`, { scroll: false });
    // If not already present, append
    if (!allParams.includes(category)) {
      params.append('artist-category', category);
    }
  } else {
    // If present, remove all instances
    const filtered = allParams.filter(cat => cat !== category);
    params.delete('artist-category');
    filtered.forEach(cat => params.append('artist-category', cat));
  }
  
  router.replace(`?${params.toString()}`, { scroll: false });

    const tempCategoryStatus = [...categoriesData];
    const index = tempCategoryStatus.findIndex(cat => cat.categoryName === category);
    tempCategoryStatus[index].isChecked = !tempCategoryStatus[index].isChecked;
    setCategoriesData(tempCategoryStatus);
}, [searchParams, categoriesData]);

  const clearFilters = useCallback(() => {
//       if (searchParam) {
//         console.log("Search param exists:", searchParam);
// setCategoriesData(categoriesData.map(cat => ({ ...cat, isChecked: false })));
//       }
    // setSelectedCategories([]);
    // setSelectedPriceRanges([]);
    // setSearchTerm("");
    // setCurrentPage(1);
  }, [searchParam]);

  useEffect(() => {
      if (searchParam) {
        console.log("Search param exists:", searchParam);
setCategoriesData(categoriesData.map(cat => ({ ...cat, isChecked: false })));
      }
    }, [searchParam]);
  const experienceRanges = [
    { label: "0-2 years", min: 0, max: 2 },
    { label: "3-5 years", min: 3, max: 5 },
    { label: "6-10 years", min: 6, max: 10 },
    { label: "10+ years", min: 11, max: Infinity },
  ];


  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 min-h-screen">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>

      {/* Categories Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categoriesData.map((category) => (
            <label
              key={category.categoryName}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={category.isChecked}
                onChange={(e) => toggleCategory(category.categoryName, e)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">{category.categoryName}</span>
              <span className="ml-auto text-xs text-gray-500">
                {/* ({allArtists.filter((a) => a.category === category).length}) */}
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
                // onChange={() => toggleExperience(range.label)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">{range.label}</span>
              <span className="ml-auto text-xs text-gray-500">
                (
                {/* {
                  allArtists.filter((a) => {
                    const exp = parseInt(a.experience);
                    return exp >= range.min && exp <= range.max;
                  }).length
                } */}
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


// "use client";
// import React from "react";

// interface ExperienceRange {
//   label: string;
//   min: number;
//   max: number;
// }

// interface FiltersSidebarProps {
//   categories: string[];
//   selectedCategories: string[];
//   toggleCategory: (category: string) => void;
//   experienceRanges: ExperienceRange[];
//   selectedExperience: string[];
//   toggleExperience: (range: string) => void;
//   allArtists: any[];
//   clearFilters: () => void;
// }

// const ArtistFiltersSidebar: React.FC<FiltersSidebarProps> = ({
//   categories,
//   selectedCategories,
//   toggleCategory,
//   experienceRanges,
//   selectedExperience,
//   toggleExperience,
//   allArtists,
//   clearFilters,
// }) => {
//   return (
//     <div className="w-64 bg-white border-r border-gray-200 p-6 min-h-screen">
//       <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>

//       {/* Categories Filter */}
//       <div className="mb-8">
//         <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
//         <div className="space-y-3">
//           {categories.map((category) => (
//             <label
//               key={category}
//               className="flex items-center cursor-pointer"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(category)}
//                 onChange={() => toggleCategory(category)}
//                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="ml-3 text-sm text-gray-700">{category}</span>
//               <span className="ml-auto text-xs text-gray-500">
//                 ({allArtists.filter((a) => a.category === category).length})
//               </span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Experience Filter */}
//       <div className="mb-8">
//         <h3 className="text-sm font-medium text-gray-900 mb-4">Experience</h3>
//         <div className="space-y-3">
//           {experienceRanges.map((range) => (
//             <label key={range.label} className="flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={selectedExperience.includes(range.label)}
//                 onChange={() => toggleExperience(range.label)}
//                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <span className="ml-3 text-sm text-gray-700">{range.label}</span>
//               <span className="ml-auto text-xs text-gray-500">
//                 (
//                 {
//                   allArtists.filter((a) => {
//                     const exp = parseInt(a.experience);
//                     return exp >= range.min && exp <= range.max;
//                   }).length
//                 }
//                 )
//               </span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Clear Filters */}
//       {(selectedCategories.length > 0 || selectedExperience.length > 0) && (
//         <button
//           onClick={clearFilters}
//           className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm"
//         >
//           Clear all filters
//         </button>
//       )}
//     </div>
//   );
// };

// export default ArtistFiltersSidebar;
