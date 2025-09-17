"use client";

import React from "react";
import { allProducts } from "../../data/products";

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="flex-shrink-0 w-28 sm:w-32 md:w-36 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-200 hover:border-[#61503c] cursor-pointer relative">
      {category.count > 0 && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
          {category.count.toString().padStart(2, "0")}
        </div>
      )}

      <div className="relative w-full h-24 sm:h-28 md:h-32 bg-gray-50 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-2 sm:p-3">
        <h3 className="font-medium text-gray-800 text-xs sm:text-sm text-center leading-tight min-h-[28px] flex items-center justify-center">
          {category.name}
        </h3>
      </div>
    </div>
  );
};

const TopCategories: React.FC = () => {
  const categoriesMap: Record<string, Category> = {};

  allProducts.forEach((product, index) => {
    if (!categoriesMap[product.category]) {
      categoriesMap[product.category] = {
        id: index + 1,
        name: product.category,
        image: product.image,
        count: 1,
      };
    } else {
      categoriesMap[product.category].count += 1;
    }
  });

  const categories = Object.values(categoriesMap);

  return (
    <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 bg-white">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 sm:gap-5 md:gap-6 pb-4 w-max">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

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
