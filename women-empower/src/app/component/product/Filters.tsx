// app/components/Filters.tsx
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Filters: React.FC = () => {
  const router = useRouter();
const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const allParams = params.getAll('category');
 const searchParam = searchParams.get("search");

type CategoryObj = { categoryName: string; isChecked: boolean };
const [categoriesData, setCategoriesData] = useState<CategoryObj[]>([]);

useEffect(() => {
  
  fetchData();
}, []);
async function fetchData() {
    try {
      const res = await fetch('http://localhost:5000/api/category');
      const categoriesData_ = await res.json();
      console.log(categoriesData_);
     const categoryObject= categoriesData_.map((cat: { name: string }) => ({ categoryName: cat, isChecked: false }))
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
     params.delete("search");
    router.replace(`?${params.toString()}`, { scroll: false });
    // If not already present, append
    if (!allParams.includes(category)) {
      params.append('category', category);
    }
  } else {
    // If present, remove all instances
    const filtered = allParams.filter(cat => cat !== category);
    params.delete('category');
    filtered.forEach(cat => params.append('category', cat));
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
  const priceRanges = [
    { label: "Under ₹500", min: 0, max: 499 },
    { label: "₹500 - ₹750", min: 500, max: 750 },
    { label: "₹750 - ₹1000", min: 751, max: 1000 },
    { label: "₹1000 - ₹1500", min: 1001, max: 1500 },
    { label: "Over ₹1500", min: 1501, max: Infinity },
  ];




  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 min-h-screen">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categoriesData.map((category) => (
              <label key={category.categoryName} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={category.isChecked}
                  onChange={(e) => toggleCategory(category.categoryName, e)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{category.categoryName}</span>
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
