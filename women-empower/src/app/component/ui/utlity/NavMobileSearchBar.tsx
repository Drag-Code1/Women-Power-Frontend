"use client"
import { Close, SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
  

 export const NavMobileSearchBar = () => {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
  const suggestions = [
    "Modern Art",
    "Oil Paintings",
    "Sketch Artists",
    "Sculptures",
    "Digital Arts",
    "Photography",
  ];
  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
   const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
   }
    return(
    <div className="w-full animate-fadeIn">
      <div className="max-w-3xl mx-auto px-4 py-3 relative">
        <button
          onClick={toggleSearch}
          className="absolute right-6 top-5 text-gray-300 hover:text-white lg:block hidden"
        >
          <Close className="w-6 h-6" />
        </button>

        <div className="flex items-center bg-transparent border border-white rounded-lg px-3 py-2">
          <SearchOutlined className="text-white mr-2" />
          <input
            type="text"
            placeholder="Search for products, artists..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-300 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        {searchQuery && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {s}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    )
};