import React from "react";
import Image from "next/image";
import { Category } from "@/app/data/categoriesData";

interface CategoryCardProps {
  category: Category;
  onLearnMore: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onLearnMore }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {category.count && (
        <div className="absolute top-3 right-3 z-10 bg-[#fdc700] text-[#61503c] text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
          {category.count.toString().padStart(2, "0")}
        </div>
      )}

      <div className="relative w-full h-32 sm:h-40 bg-gray-100 overflow-hidden">
        <Image
          src={category.image || "/placeholder-image.jpg"}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-3 text-center leading-tight">
          {category.name}
        </h3>
        <button
          onClick={() => onLearnMore(category)}
          className="w-full bg-[#867259eb] hover:bg-[#61503c] text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 hover:scale-105"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
