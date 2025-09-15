import React from "react";

interface Category {
  id: number;
  name: string;
  image: string;
  count?: number;
}

interface CategoryCardProps {
  category: Category;
  onLearnMore: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onLearnMore }) => {
  return (
    <div className="flex-shrink-0 w-32 sm:w-36 md:w-40 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#61503c] group cursor-pointer">
      {/* Count Badge */}
      {category.count && (
        <div className="absolute top-2 right-2 z-10 bg-[#fdc700] text-[#61503c] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
          {category.count}
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full h-20 sm:h-24 md:h-28 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={category.image || "https://via.placeholder.com/150x150?text=No+Image"}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-medium text-gray-800 text-xs sm:text-sm text-center leading-tight mb-3 min-h-[32px] flex items-center justify-center">
          {category.name}
        </h3>
        
        <button
          onClick={() => onLearnMore(category)}
          className="w-full bg-[#61503c] hover:bg-[#4a3e30] text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#61503c] focus:ring-opacity-50"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;