// app/components/Filters.tsx
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
interface category{
id:string,
name:string,
image:string

}
const Filters: React.FC = () => {
  const router = useRouter();
const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const allParams = params.getAll('category');
 const searchParam = searchParams.get("search");
console.log(allParams,"allParams");
type CategoryObj = { categoryName: string; isChecked: boolean };
const [categoriesData, setCategoriesData] = useState<CategoryObj[]>([]);

useEffect(() => {
  
  fetchData();
}, []);
async function fetchData() {
    try {
      const res = await fetch('http://localhost:7000/v1/category');
      const categoriesData_ = await res.json();
      console.log(categoriesData_);
    const categoryObject= categoriesData_.data.map((cat:  category ) => ({ categoryName: cat.name,categoryID:cat.id, isChecked:allParams.find((item)=>item==cat.id)? true:false }))
console.log("categoryObject :",categoryObject)
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
    const index = tempCategoryStatus.findIndex(cat => cat.categoryID === category);
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
   const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
 useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const min = params.get("min-pr");
    const max = params.get("max-pr");

    if (min) setMinPrice(Number(min));
    if (max) setMaxPrice(Number(max));
  }, []);

  const updateUrl = (newMin: number, newMax: number) => {
    const params = new URLSearchParams(searchParams.toString());
   params.delete('search');
    if (newMin) params.set("min-pr", String(newMin));
    else params.delete("min-pr");

    if (newMax) params.set("max-pr", String(newMax));
    else params.delete("max-pr");

    const newUrl = `?${params.toString()}`;

    // 👇 Replaces the current URL (does not add to history)
    router.replace(newUrl, { scroll: false });
  };



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
                  onChange={(e) => toggleCategory(category.categoryID, e)}
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
         <div className="flex flex-col gap-3">
        {/* 🧮 Min Price */}
        <label className="text-sm text-gray-600">
          Min: ₹{minPrice}
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            onMouseUp={() => updateUrl(minPrice, maxPrice)}       // 🧠 only on release
            onTouchEnd={() => updateUrl(minPrice, maxPrice)}       // mobile support
            className="w-full accent-blue-600"
          />
        </label>

        {/* 💰 Max Price */}
        <label className="text-sm text-gray-600">
          Max: ₹{maxPrice}
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            onMouseUp={() => updateUrl(minPrice, maxPrice)}       // 🧠 only on release
            onTouchEnd={() => updateUrl(minPrice, maxPrice)}       // mobile support
            className="w-full accent-blue-600"
          />
        </label>

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>₹{minPrice}</span>
          <span>₹{maxPrice}</span>
        </div>
      </div>
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

export default React.memo(Filters);
