"use client";

import React from "react";
import { Category } from "@/app/types/category";
import R2Image from "../dashboard/dashboardallproductstab/R2Image";
import { DEFAULT_THUMBNAIL } from "@/app/data/dashboardproductdata";
import { useRouter } from "next/navigation";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to arts listing, carrying selected category for filtering
    router.push(`/arts?category=${encodeURIComponent(category.id)}`);
  };

  return (
    <div
      className="flex-shrink-0 w-28 sm:w-32 md:w-36 bg-white rounded-xl overflow-hidden cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View ${category.name} in arts`}
    >
      <div className="w-full h-20 sm:h-24 md:h-28 flex items-center justify-center">
        <R2Image
          src={category.image}
          fallbackSrc={DEFAULT_THUMBNAIL}
          alt={category.name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
        />
      </div>
      <div className="p-2 sm:p-3">
        <h3 className="font-medium text-gray-800 text-xs sm:text-sm text-center leading-tight min-h-[28px] flex items-center justify-center capitalize">
          {category.name}
        </h3>
      </div>
    </div>
  );
};
