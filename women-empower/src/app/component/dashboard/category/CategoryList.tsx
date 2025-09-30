"use client";
import React from "react";

export type Category = {
  id: string;
  name: string;
  productsCount: number;
  isActive: boolean;
  imageUrl?: string;
};

type CategoryListProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
};

const CategoryList: React.FC<CategoryListProps> = (props) => {
  const { categories, onEdit } = props;

  return (
    <div className="bg-transparent">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Categories</h2>
        <span className="text-sm text-gray-500">{categories.length} total</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition relative">
            <div className="aspect-square bg-gray-100">
              <img
                src={cat.imageUrl && cat.imageUrl.trim() !== "" ? cat.imageUrl : "/images/thumbnail.jpg"}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status badge */}
            <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold ${cat.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
              {cat.isActive ? "Active" : "Inactive"}
            </div>
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="font-medium text-gray-900 truncate">{cat.name}</div>
              <button onClick={() => onEdit(cat)} className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-100 text-sm">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;


