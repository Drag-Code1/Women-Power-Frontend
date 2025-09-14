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

export const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product.title);
  };
    return(
          <button
            onClick={() => handleAddToCart?.(product)}
            className="w-full bg-[#867259eb] hover:bg-[#61503c] text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCartIcon sx={{ fontSize: 16 }} />
            Add To Cart
          </button>
    )
}