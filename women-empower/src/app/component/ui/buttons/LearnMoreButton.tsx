"use client"
import React from "react";
import { Category } from "@/app/data/categoriesData";
interface LearnMoreButtonProps {
  categoryName: string;
}
export const LearnMoreButton: React.FC<LearnMoreButtonProps> = ({ categoryName }) => {
   const handleLearnMore = (categoryName: string) => {
    console.log("Learn more about:", categoryName);
  };
  
    return(
           <button
          onClick={() => handleLearnMore(categoryName)}
          className="w-full bg-[#867259eb] hover:bg-[#61503c] text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
        >
          Learn More
        </button>
    )
}