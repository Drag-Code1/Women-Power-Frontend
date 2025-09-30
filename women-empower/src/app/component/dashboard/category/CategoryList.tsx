"use client";
import React from "react";

export type Category = {
  id: string;
  name: string;
  productsCount: number;
  isActive: boolean;
};

type CategoryListProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
  onToggleActive,
}) => {

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Categories</h2>
        <span className="text-sm text-gray-500">{categories.length} total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{cat.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">{cat.productsCount}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${cat.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {cat.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                  <div className="inline-flex gap-2">
                    <button onClick={() => onEdit(cat)} className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-100">Edit</button>
                    <button onClick={() => onToggleActive(cat.id)} className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-100">
                      {cat.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => onDelete(cat.id)} className="px-3 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;


