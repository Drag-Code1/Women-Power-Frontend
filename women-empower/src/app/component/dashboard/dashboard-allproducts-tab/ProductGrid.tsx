'use client';
import React from "react";
import { Product } from "@/app/types/dashboard-product";
import ProductCard from "./ProductCard";
import { Package } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  showDropdown: string | null;
  onDropdownToggle: (id: string | null) => void;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleTrending: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  showDropdown,
  onDropdownToggle,
  onView,
  onEdit,
  onDelete,
  onToggleTrending,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showDropdown={showDropdown === product.id}
          onDropdownToggle={() =>
            onDropdownToggle(showDropdown === product.id ? null : product.id)
          }
          onView={() => onView(product)}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product.id)}
          onToggleTrending={() => onToggleTrending(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;