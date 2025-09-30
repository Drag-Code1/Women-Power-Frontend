"use client";
import React, { useState } from "react";
import DashboardNavbar from "@/app/component/ui/utlity/DashboardNavbar";
import DashboardSidebar from "@/app/component/ui/utlity/DashboardSidebar";
import CategoryForm from "@/app/component/dashboard/category/CategoryForm";
import CategoryList, { Category } from "@/app/component/dashboard/category/CategoryList";

const CategoryPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Paintings", productsCount: 128, isActive: true, imageUrl: "" },
    { id: "2", name: "Sculptures", productsCount: 54, isActive: true, imageUrl: "" },
    { id: "3", name: "Handicrafts", productsCount: 92, isActive: false, imageUrl: "" },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <DashboardNavbar
        onMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <CategoryForm
              initialData={editingId ? categories.find(c => c.id === editingId) ? { name: categories.find(c => c.id === editingId)!.name, isActive: categories.find(c => c.id === editingId)!.isActive, imageUrl: categories.find(c => c.id === editingId)!.imageUrl } : undefined : null}
              onCancelEdit={() => setEditingId(null)}
              onSubmit={(data) => {
                if (editingId) {
                  setCategories(prev => prev.map(c => c.id === editingId ? { ...c, name: data.name, isActive: data.isActive, imageUrl: data.imageUrl } : c));
                  setEditingId(null);
                } else {
                  const newCat: Category = {
                    id: Date.now().toString(),
                    name: data.name,
                    isActive: data.isActive,
                    imageUrl: data.imageUrl,
                    productsCount: 0,
                  };
                  setCategories(prev => [newCat, ...prev]);
                }
              }}
            />
            <CategoryList
              categories={categories}
              onEdit={(cat) => setEditingId(cat.id)}
              onDelete={(id) => setCategories(prev => prev.filter(c => c.id !== id))}
              onToggleActive={(id) => setCategories(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c))}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;


