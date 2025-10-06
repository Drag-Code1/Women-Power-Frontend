// components/ProductCard.tsx
'use client';
import React from "react";
import { Star, TrendingUp, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import { Product, DrawerMode } from "@/app/types/dashboardproduct";
import { calculateDiscountedPrice } from "@/app/lib/utils/dashboardproduct-utils";
import { DEFAULT_THUMBNAIL } from "@/app/data/dashboardproductdata";

interface ProductCardProps {
  product: Product;
  showDropdown: string | null;
  onToggleDropdown: (id: string | null) => void;
  onOpenDrawer: (mode: DrawerMode, product: Product) => void;
  onToggleTrending: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
  artistNameMap?: Record<string, string>;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showDropdown,
  onToggleDropdown,
  onOpenDrawer,
  onToggleTrending,
  onDelete,
  onViewDetails,
  artistNameMap,
}) => {
  return (
    <div
      className="bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 group h-[300px] flex flex-col"
      data-product-id={product.id}
    >
      <div className="relative">
        <img
          src={product.thumbnail || DEFAULT_THUMBNAIL}
          alt={product.p_Name}
          className="w-full h-40 object-cover rounded-t-md"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-medium">
            -{product.discount}%
          </div>
        )}
        {product.isTrending && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded flex items-center gap-1 text-xs font-medium">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )}

        <div className="absolute top-2 right-2 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleDropdown(showDropdown === product.id ? null : product.id);
            }}
            className="bg-white hover:bg-gray-50 text-gray-700 p-1.5 rounded-full shadow-md transition-all duration-150 hover:shadow-lg"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <div>
          <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 h-10">
            {product.p_Name}
          </h3>
          { (artistNameMap?.[product.artist_id] || product.artist_id) ? (
            <p className="text-xs text-gray-600 mb-2">by {artistNameMap?.[product.artist_id] || product.artist_id}</p>
          ) : null }
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-base font-bold text-gray-900">
            ₹{calculateDiscountedPrice(product.price, product.discount).toLocaleString()}
          </span>
          {product.discount > 0 && (
            <span className="text-xs text-gray-500 line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {showDropdown === product.id && (
        <div
          className="fixed z-50 w-52 bg-white rounded-lg shadow-2xl border border-gray-200 py-2"
          style={{
            top: `${
              (document.querySelector(`[data-product-id="${product.id}"]`) as HTMLElement)
                ?.getBoundingClientRect().top || 0
            }px`,
            left: `${
              ((document.querySelector(`[data-product-id="${product.id}"]`) as HTMLElement)
                ?.getBoundingClientRect().right || 0) - 208
            }px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => (onViewDetails ? onViewDetails(product.id) : onOpenDrawer("view", product))}
            className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center gap-3 text-sm text-gray-700 transition-colors"
          >
            <Eye className="w-4 h-4 text-blue-600" />
            <span>View Details</span>
          </button>
          <button
            onClick={() => onOpenDrawer("edit", product)}
            className="w-full text-left px-4 py-2.5 hover:bg-green-50 flex items-center gap-3 text-sm text-gray-700 transition-colors"
          >
            <Edit className="w-4 h-4 text-green-600" />
            <span>Edit Product</span>
          </button>
          <button
            onClick={() => onToggleTrending(product.id)}
            className="w-full text-left px-4 py-2.5 hover:bg-orange-50 flex items-center gap-3 text-sm text-gray-700 transition-colors"
          >
            <TrendingUp className="w-4 h-4 text-orange-600" />
            <span>{product.isTrending ? "Remove from Trending" : "Add to Trending"}</span>
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={() => onDelete(product.id)}
            className="w-full text-left px-4 py-2.5 hover:bg-red-50 flex items-center gap-3 text-sm text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Product</span>
          </button>
        </div>
      )}
    </div>
  );
};