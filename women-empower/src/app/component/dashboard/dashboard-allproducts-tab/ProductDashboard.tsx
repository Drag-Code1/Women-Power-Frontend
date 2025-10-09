'use client';
import React, { useState, useEffect } from "react";
import { Product, ProductFormData, DrawerMode } from "@/app/types/dashboard-product";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import ProductDrawer from "./ProductDrawer";
import { filterProducts } from "@/app/lib/utils/dashboardproduct-utils";

interface ProductDashboardProps {
  initialProducts: Product[];
}

const ProductDashboard: React.FC<ProductDashboardProps> = ({
  initialProducts,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedArtist, setSelectedArtist] = useState<string>("all");
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("add");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const filteredProducts = filterProducts(products, {
    searchTerm,
    category: selectedCategory,
    artist: selectedArtist,
  });

  const openDrawer = (mode: DrawerMode, product?: Product): void => {
    setDrawerMode(mode);
    setSelectedProduct(product || null);
    setShowDropdown(null);
    setShowDrawer(true);
  };

  const closeDrawer = (): void => {
    setShowDrawer(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300);
  };

  const handleSave = async (formData: ProductFormData): Promise<void> => {
    setLoading(true);
    try {
      if (drawerMode === "add") {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        
        if (result.success && result.data) {
          setProducts([...products, result.data]);
        }
      } else if (drawerMode === "edit" && selectedProduct) {
        const response = await fetch(`/api/products/${selectedProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        
        if (result.success && result.data) {
          setProducts(
            products.map((p) =>
              p.id === selectedProduct.id ? result.data : p
            )
          );
        }
      }
      closeDrawer();
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      
      if (result.success) {
        setProducts(products.filter((p) => p.id !== id));
        setShowDropdown(null);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTrending = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
      });
      const result = await response.json();
      
      if (result.success && result.data) {
        setProducts(
          products.map((p) => (p.id === id ? result.data : p))
        );
        setShowDropdown(null);
      }
    } catch (error) {
      console.error("Failed to toggle trending:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <ProductFilters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedArtist={selectedArtist}
          products={products}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onArtistChange={setSelectedArtist}
          onAddProduct={() => openDrawer("add")}
        />

        {showDropdown && (
          <div
            className="fixed inset-0"
            onClick={() => setShowDropdown(null)}
          />
        )}

        <ProductGrid
          products={filteredProducts}
          showDropdown={showDropdown}
          onDropdownToggle={setShowDropdown}
          onView={(product) => openDrawer("view", product)}
          onEdit={(product) => openDrawer("edit", product)}
          onDelete={handleDelete}
          onToggleTrending={toggleTrending}
        />
      </div>

      {showDrawer && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-opacity-20 transition-all duration-300 ease-in-out z-40"
          onClick={closeDrawer}
        />
      )}

      <ProductDrawer
        isOpen={showDrawer}
        mode={drawerMode}
        product={selectedProduct}
        onClose={closeDrawer}
        onSave={handleSave}
        loading={loading}
      />
    </div>
  );
};

export default ProductDashboard;