"use client";
import React, { useEffect, useState } from "react";

type CategoryFormProps = {
  onSubmit?: (data: { name: string; isActive: boolean }) => void;
  onCancelEdit?: () => void;
  initialData?: { name: string; isActive: boolean } | null;
};

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, onCancelEdit, initialData }) => {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIsActive(initialData.isActive);
    } else {
      setName("");
      setIsActive(true);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ name, isActive });
    setName("");
    setIsActive(true);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">{initialData ? "Edit Category" : "Add Category"}</h2>
        {initialData && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel edit
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Paintings"
            className="w-full rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            required
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            id="active"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 text-gray-600 border-gray-300 rounded"
          />
          <label htmlFor="active" className="text-sm text-gray-700">Active</label>
        </div>
      </div>
      <div className="mt-4">
        <button type="submit" className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black">
          {initialData ? "Update Category" : "Save Category"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;


