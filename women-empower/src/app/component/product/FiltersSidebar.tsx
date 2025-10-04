// "use client";
// import React, { useCallback, useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";

// const FiltersSidebar: React.FC = () => {
//   const router = useRouter();
// const searchParams = useSearchParams();

//   const params = new URLSearchParams(searchParams.toString());
//   const allParams = params.getAll('category');
//  const searchParam = searchParams.get("search");
// console.log(allParams,"allParams");
// type CategoryObj = { categoryName: string; isChecked: boolean };
// const [categoriesData, setCategoriesData] = useState<CategoryObj[]>([]);

// useEffect(() => {
  
//   fetchData();
// }, []);
// async function fetchData() {
//     try {
//       const res = await fetch('http://localhost:5000/api/category');
//       const categoriesData_ = await res.json();
//       console.log(categoriesData_);
//      const categoryObject= categoriesData_.map((cat:  string ) => ({ categoryName: cat, isChecked:allParams.includes(cat)? true:false }))
// setCategoriesData(categoryObject);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   }
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

// const toggleCategory = useCallback((category: string, e: React.ChangeEvent<HTMLInputElement>) => {
//   if (e.target.checked) {
//      params.delete("course-search");
//     router.replace(`?${params.toString()}`, { scroll: false });
//     // If not already present, append
//     if (!allParams.includes(category)) {
//       params.append('course-category', category);
//     }
//   } else {
//     // If present, remove all instances
//     const filtered = allParams.filter(cat => cat !== category);
//     params.delete('course-category');
//     filtered.forEach(cat => params.append('course-category', cat));
//   }
  
//   router.replace(`?${params.toString()}`, { scroll: false });

//     const tempCategoryStatus = [...categoriesData];
//     const index = tempCategoryStatus.findIndex(cat => cat.categoryName === category);
//     tempCategoryStatus[index].isChecked = !tempCategoryStatus[index].isChecked;
//     setCategoriesData(tempCategoryStatus);
// }, [searchParams, categoriesData]);

//   const clearFilters = useCallback(() => {
// //       if (searchParam) {
// //         console.log("Search param exists:", searchParam);
// // setCategoriesData(categoriesData.map(cat => ({ ...cat, isChecked: false })));
// //       }
//     // setSelectedCategories([]);
//     // setSelectedPriceRanges([]);
//     // setSearchTerm("");
//     // setCurrentPage(1);
//   }, [searchParam]);

//   useEffect(() => {
//       if (searchParam) {
//         console.log("Search param exists:", searchParam);
// setCategoriesData(categoriesData.map(cat => ({ ...cat, isChecked: false })));
//       }
//     }, [searchParam]);
//   const priceRanges = [
//     { label: "Under ₹500", min: 0, max: 499 },
//     { label: "₹500 - ₹750", min: 500, max: 750 },
//     { label: "₹750 - ₹1000", min: 751, max: 1000 },
//     { label: "₹1000 - ₹1500", min: 1001, max: 1500 },
//     { label: "Over ₹1500", min: 1501, max: Infinity },
//   ];



//   return(
//   <div
//     className={`w-80 bg-white border-r border-gray-200 p-6 min-h-screen overflow-y-auto ${
//       true ? "block" : "hidden lg:block"
//     }`}
//   >
//     <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

//     {/* Categories */}
//     <div className="mb-6">
//       <h3 className="text-sm font-semibold text-gray-900 mb-2">Categories</h3>
//       <div className="space-y-1">
//         {categoriesData.map((category) => (
//           <label
//             key={category.categoryName}
//             className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
//           >
//             <input
//               type="checkbox"
//               // checked={selectedCategories.includes(category)}
//               onChange={(e) => toggleCategory(category.categoryName,e)}
//               className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//             />
//             <span className="ml-2 text-sm text-gray-700">{category.categoryName}</span>
//             <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 rounded-full">
//               {/* {categoriesData.filter((c) => c.category === category).length} */}
//             </span>
//           </label>
//         ))}
//       </div>
//     </div>

//     {/* Levels */}
//     <div className="mb-6">
//       <h3 className="text-sm font-semibold text-gray-900 mb-2">Skill Level</h3>
//       <div className="space-y-1">
     
//       </div>
//     </div>

//     {/* Languages */}
//     {/* <div className="mb-6">
//       <h3 className="text-sm font-semibold text-gray-900 mb-2">Language</h3>
//       <div className="space-y-1">
//         {languages.map((language) => (
//           <label
//             key={language}
//             className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
//           >
//             <input
//               type="checkbox"
//               // checked={selectedLanguages.includes(language)}
//               // onChange={() => toggleLanguage(language)}
//               className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//             />
//             <span className="ml-2 text-sm text-gray-700">{language}</span>
//             <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 rounded-full">
//               {allCourses.filter((c) => c.language === language).length}
//             </span>
//           </label>
//         ))}
//       </div>
//     </div> */}

//     {/* Price */}
//     {/* <div className="mb-6">
//       <h3 className="text-sm font-semibold text-gray-900 mb-2">Price Range</h3>
//       <div className="space-y-1">
//         {priceRanges.map((range) => (
//           <label
//             key={range.label}
//             className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
//           >
//             <input
//               type="radio"
//               name="priceRange"
//               // checked={priceRange === range.label}
//               // onChange={() =>
//               //   setPriceRange(priceRange === range.label ? "" : range.label)
//               // }
//               className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//             />
//             <span className="ml-2 text-sm text-gray-700">{range.label}</span>
//             <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 rounded-full">
//               {
//                 allCourses.filter(
//                   (c) => c.price >= range.min && c.price <= range.max
//                 ).length
//               }
//             </span>
//           </label>
//         ))}
//       </div>
//     </div> */}

//     {/* Clear */}
//     {/* {(selectedCategories.length > 0 ||
//       selectedLevels.length > 0 ||
//       selectedLanguages.length > 0 ||
//       priceRange) && ( */}
//       <button
//         onClick={clearFilters}
//         className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
//       >
//         Clear all filters
//       </button>
//     {/* )} */}
//   </div>
//   )
// };

// export default FiltersSidebar;
//   //  {levels.map((level) => (
//   //         <label
//   //           key={level}
//   //           className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
//   //         >
//   //           <input
//   //             type="checkbox"
//   //             // checked={selectedLevels.includes(level)}
//   //             // onChange={() => toggleLevel(level)}
//   //             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//   //           />
//   //           <span className="ml-2 text-sm text-gray-700">{level}</span>
//   //           <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 rounded-full">
//   //             {allCourses.filter((c) => c.level === level).length}
//   //           </span>
//   //         </label>
//   //       ))}
// app/components/Filters.tsx
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const FiltersSidebar: React.FC = () => {
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
                // onChange={() => togglePriceRange(range.label)}
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

export default React.memo(FiltersSidebar);
