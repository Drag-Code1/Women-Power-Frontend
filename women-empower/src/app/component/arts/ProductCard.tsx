// components/ProductCard.tsx
"use client";

import React from "react";
import { Heart } from "lucide-react";
import { Product, CartItem } from "@/app/types/product";

interface ProductCardProps {
  product: Product;
  cart: CartItem;
  wishlist: Set<string>;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  cart, 
  wishlist,
  addToCart, 
  removeFromCart,
  toggleWishlist
}) => {
  const priceNum = parseFloat(product.price);
  const discountedPrice = priceNum - (priceNum * product.discount / 100);
  const cartQuantity = cart[product.id] || 0;
  const isInCart = cartQuantity > 0;
  const isInWishlist = wishlist.has(product.id);

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.p_Name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
            {product.discount}% OFF
          </div>
        )}

        {product.isTrending && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium" style={{ marginTop: product.discount > 0 ? '32px' : '0' }}>
            Trending
          </div>
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2 right-2 transition-colors bg-white rounded-full p-1.5 shadow-sm hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 text-sm">
          {product.p_Name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.discount > 0 ? (
              <>
                <div className="text-lg font-semibold text-gray-900">
                  ₹{discountedPrice.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 line-through">
                  ₹{priceNum.toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-lg font-semibold text-gray-900">
                ₹{priceNum.toFixed(2)}
              </div>
            )}
          </div>
          
          <button 
            onClick={() => isInCart ? removeFromCart(product.id) : addToCart(product.id)}
            className={`px-3 py-1.5 rounded text-xs transition-all duration-200 ${
              isInCart 
                ? "bg-green-600 text-white hover:bg-green-700" 
                : "bg-[#695946] text-white hover:bg-[#61503c]"
            }`}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;