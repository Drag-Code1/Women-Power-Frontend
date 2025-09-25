import React from 'react';

export const SortList:React.FC=()=>{
 const sortOptions = [
    "Popular",
    "Price: Low to High",
    "Price: High to Low",
    "Name A-Z",
    "Name Z-A",
    "Rating",
  ];
return(
 <select
                // value={sortBy}
                // onChange={(e) => setSortBy(e.target.value)}
                className="border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    Sort by {opt}
                  </option>
                ))}
              </select>

)

}