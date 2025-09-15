"use client";

import React from "react";

const categoriesData = [
  {
    id: 1,
    name: "Rangoli",
    image:"/images/demo4.jpg",
    count: 12,
  },
  {
    id: 2,
    name: "Spiritual",
    image: "/images/images.jpg",
    count: 25,
  },
  {
    id: 3,
    name: "Resin",
    image: "/images/images.jpg",
    count: 18,
  },
  {
    id: 4,
    name: "Shubh Labh",
    image: "/images/images.jpg",
    count: 30,
  },
  {
    id: 5,
    name: "Lapdesk",
    image: "/images/images.jpg",
    count: 22,
  },
  {
    id: 6,
    name: "Diya & Thali",
    image: "/images/demo4.jpg",
    count: 15,
  },
  {
    id: 7,
    name: "Decor",
    image: "/images/demo4.jpg",
    count: 8,
  },
  {
    id: 8,
    name: "Gift",
    image: "/images/images.jpg",
    count: 35,
  },
  {
    id: 9,
    name: "Lapdesk",
    image: "/images/images.jpg",
    count: 40,
  },
  {
    id: 10,
    name: "Diya & Thali",
    image: "/images/images.jpg",
    count: 40,
  },
];

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

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onLearnMore,
}) => {
  return (
    <div className="flex-shrink-0 w-28 sm:w-32 md:w-36 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#61503c] group cursor-pointer relative">
      {/* Count Badge */}
      {category.count && (
        <div className="absolute top-2 right-2 z-10 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
          {category.count.toString().padStart(2, "0")}
        </div>
      )}

      {/* Larger Image Container */}
      <div className="relative w-full h-24 sm:h-28 md:h-32 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Compact Content */}
      <div className="p-2 sm:p-3">
        <h3 className="font-medium text-gray-800 text-xs sm:text-sm text-center leading-tight mb-2 min-h-[28px] flex items-center justify-center">
          {category.name}
        </h3>

        <button
          onClick={() => onLearnMore(category)}
          className="w-full bg-[#61503c] hover:bg-[#4a3e30] text-white text-xs font-medium py-1.5 px-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#61503c] focus:ring-opacity-50"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

const TopCategories: React.FC = () => {
  const handleLearnMore = (category: Category) => {
    console.log("Learn more about:", category.name);
  };

  return (
    <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-5 bg-[#f8f8f8]">
      {/* Scrollable Categories Container */}
      <div className="relative">
        {/* Horizontal Scrolling Container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div
            className="flex gap-4 sm:gap-5 md:gap-6 pb-4"
            style={{ width: "max-content" }}
          >
            {categoriesData.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onLearnMore={handleLearnMore}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Hide Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TopCategories;
