"use client";
import React from "react";
import { TbShoppingCartDiscount } from "react-icons/tb";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

export const AddToCartIconButton: React.FC<{ product: Product }> = ({ product }) => {
   const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product.title);
  }
    return(
       <button
            onClick={() => handleAddToCart?.(product)}
            className="w-9 h-9 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-md"
          >
            <ShoppingCartIcon sx={{ fontSize: 18 }} />
          </button>
    )
}


