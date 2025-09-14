"use client";

import { categoriesData, Category } from "../../data/categoriesData";
import CategoryCard from "../cart/CategoryCard";

const TopCategories: React.FC = () => {
  const handleLearnMore = (category: Category) => {
    console.log("Learn more about:", category.name);
  };

  return (
    <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-gray-900 text-2xl sm:text-2xl">
            Top <span className="text-[#61503c]">Categories</span>
          </h2>
          <div className="mt-2 w-16 h-1 bg-[#61503c] rounded mx-auto"></div>
        </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
        {categoriesData.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onLearnMore={handleLearnMore}
          />
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
