"use client";
import React from "react";

import VisibilityIcon from '@mui/icons-material/Visibility';
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice: number | null;
  image: string;
  isOnSale: boolean;
  discount?: number;
}

export const VisibilityIconButton: React.FC<{ product: Product }> = ({ product }) => {
  const handleQuickView = (product: Product) => {
    console.log("Quick view:", product.title);
  };

    return(
      <button
            onClick={() => handleQuickView?.(product)}
            className="w-9 h-9 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-800 hover:text-white transition-all duration-200 shadow-md"
          >
            <VisibilityIcon sx={{ fontSize: 18 }} />
          </button>
    )
}


