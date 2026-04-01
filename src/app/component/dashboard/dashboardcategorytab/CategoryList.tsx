
"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import {
  Category,
  ModalType,
  CategoryFormData,
} from "@/app/types/dashboardcategory";
import CategoryCard from "./CategoryCard";
import CategoryModal from "./CategoryModal";
import { updateCategory, deleteCategory, createCategory } from "@/app/lib/api";
import { uploadToR2, deleteFromR2 } from "@/app/lib/utils/r2Client";

interface CategoryListProps {
  initialCategories: Category[];
}

export default function CategoryList({ initialCategories }: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("create");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const openModal = (type: ModalType, category?: Category) => {
    setModalType(type);
    setSelectedCategory(category || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleSubmit = async (data: CategoryFormData) => {
    if (modalType === "create") {
      try {
        const created = await createCategory({
          name: data.name,
          image: typeof data.image === "string" ? data.image : undefined,
        });
        setCategories([...categories, created as Category]);
      } catch (e) {
        console.error("Failed to create category", e);
      }
    } else if (modalType === "edit" && selectedCategory) {
      try {
        const updated = await updateCategory(selectedCategory.id, {
          name: data.name,
          image: typeof data.image === "string" ? data.image : "",
        });
        setCategories(
          categories.map((cat) =>
            cat.id === selectedCategory.id ? updated : cat
          )
        );
      } catch (e) {
        console.error("Failed to update category", e);
      }
    }
  };

  const handleDelete = async (id: string, image: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      // Try to delete from R2, but don't let it block DB deletion
      try {
        if (image) await deleteFromR2(image);
      } catch (r2Error) {
        console.warn("Failed to delete image from R2, proceeding with DB deletion", r2Error);
      }
      
      await deleteCategory(id); // delete category from DB
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (e) {
      console.error("Failed to delete category", e);
      alert("Failed to delete category. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f2f3f5] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 bg-white shadow-md rounded-lg p-4 md:p-6">
            <h1 className="text-3xl md:text-3xl text-gray-900">
              Category Management
            </h1>
            <button
              onClick={() => openModal("create")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add Category</span>
            </button>
          </div>

          {/* ✅ Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onView={(cat) => openModal("view", cat)}
                onEdit={(cat) => openModal("edit", cat)}
                onDelete={handleDelete} // now receives both id & image
              />
            ))}
          </div>
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        modalType={modalType}
        category={selectedCategory}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}
