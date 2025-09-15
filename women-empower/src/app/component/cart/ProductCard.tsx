// components/ProductCardNew.tsx
"use client";
import React, { useState } from "react";
import { Star, Heart } from "lucide-react";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number; // Original price
  currency: string;
  netPrice: number; // Actual product price
  offerPrice?: number; // Discounted price (optional)
  image: string;
  category: string;
  stock: boolean;
  rating: number;
  isTrending: boolean;
  isPopular: boolean;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Calculate discount percentage
  const discountPercentage = product.offerPrice
    ? Math.round(((product.netPrice - product.offerPrice) / product.netPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isTrending && discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
            {discountPercentage}% OFF
          </div>
        )}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-2 right-2 transition-colors bg-white rounded-full p-1.5 shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">{product.rating}</span>
          </div>
        </div>

        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
          {product.title}
        </h3>

        <p className="text-gray-600 text-xs mb-3 line-clamp-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.offerPrice ? (
              <>
                <div className="text-lg font-semibold text-gray-900">
                  ₹{product.offerPrice.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 line-through">
                  ₹{product.netPrice.toLocaleString()}
                </div>
              </>
            ) : (
              <div className="text-lg font-semibold text-gray-900">
                ₹{product.netPrice.toLocaleString()}
              </div>
            )}
          </div>
          <button className="bg-[#695946] text-white px-3 py-1.5 rounded text-xs hover:bg-[#61503c] transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;