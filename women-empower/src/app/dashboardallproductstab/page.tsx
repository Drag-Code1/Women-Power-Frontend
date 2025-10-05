"use client";
import React, { useState, useEffect } from "react";
import { Product } from "@/app/types/dashboardproduct";
import { useProductManagement } from "../hooks/useProductManagement";
import { useImageUpload } from "@/app/hooks/useImageUpload";
import {
  getUniqueArtists,
  filterProducts,
  getAllImages,
} from "@/app/lib/utils/dashboardproduct-utils";
import { SearchControls } from "../component/dashboard/dashboardallproductstab/SearchControls";
import { ProductGrid } from "../component/dashboard/dashboardallproductstab/ProductGrid";
import { ProductDrawer } from "../component/dashboard/dashboardallproductstab/ProductDrawer";
import { productService } from "@/app/lib/productapi";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedArtist, setSelectedArtist] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    showDrawer,
    drawerMode,
    selectedProduct,
    showDropdown,
    setShowDropdown,
    formData,
    openDrawer,
    closeDrawer,
    handleInputChange,
    toggleTrending,
  } = useProductManagement(products);

  const {
    thumbnailPreview,
    imagePreview,
    currentImageIndex,
    setCurrentImageIndex,
    handleThumbnailSelect,
    handleImageSelect,
    handleThumbnailUrlChange,
    handleImageUrlChange,
    removeThumbnail,
    removeImage,
    resetImages,
    nextImage,
    prevImage,
  } = useImageUpload();

  // ✅ Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError("");
      try {
        const apiProducts = await productService.getAllProducts();
        setProducts(apiProducts);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Reset images when drawer opens
  useEffect(() => {
    if (showDrawer && selectedProduct) {
      resetImages(
        selectedProduct.thumbnail || "",
        selectedProduct.p_images && selectedProduct.p_images.length > 0
          ? selectedProduct.p_images
          : ["", ""]
      );
    } else if (showDrawer && !selectedProduct) {
      resetImages("", ["", ""]);
    }
  }, [showDrawer, selectedProduct, resetImages]);

  const filteredProducts = filterProducts(
    products,
    searchTerm,
    selectedCategory,
    selectedArtist
  );
  const uniqueArtists = getUniqueArtists(products);

  // ✅ Save (Add / Edit)
  const handleSave = async () => {
    // Basic validation
    if (!formData.p_Name || !formData.p_Name.trim()) {
      alert("Product name is required!");
      return;
    }

    if (!formData.category_id) {
      alert("Please select a category!");
      return;
    }

    if (!formData.artist_id) {
      alert("Please select an artist!");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      alert("Please enter a valid price!");
      return;
    }

    try {
      if (drawerMode === "add") {
        const newProduct: Partial<Product> = {
          p_Name: formData.p_Name,
          thumbnail: thumbnailPreview || "",
          p_images: imagePreview.filter((img) => img && img.trim() !== ""),
          category_id: formData.category_id,
          artist_id: formData.artist_id,
          price: Number(formData.price),
          discount: Number(formData.discount) || 0,
          description: formData.description || "",
          specification: formData.specification || "",
          isTrending: false,
        };

        const created = await productService.createProduct(newProduct);

        if (created) {
          setProducts((prev) => [...prev, created]);
          alert("✅ Product created successfully!");
          closeDrawer();
        } else {
          alert("❌ Failed to create product. Please try again.");
        }
      } else if (drawerMode === "edit" && selectedProduct) {
        const updatedData: Partial<Product> = {
          p_Name: formData.p_Name,
          thumbnail: thumbnailPreview || "",
          p_images: imagePreview.filter((img) => img && img.trim() !== ""),
          category_id: formData.category_id,
          artist_id: formData.artist_id,
          price: Number(formData.price),
          discount: Number(formData.discount) || 0,
          description: formData.description || "",
          specification: formData.specification || "",
        };

        const updated = await productService.updateProduct(
          selectedProduct.id,
          updatedData
        );

        if (updated) {
          setProducts((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
          );
          alert("✅ Product updated successfully!");
          closeDrawer();
        } else {
          alert("❌ Failed to update product. Please try again.");
        }
      }
    } catch (error: any) {
      console.error("Save error:", error);
      alert(
        error?.message ||
          "❌ An error occurred. Please check your connection and try again."
      );
    }
  };

  // ✅ Delete
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const success = await productService.deleteProduct(id);

      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        alert("✅ Product deleted successfully!");
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      alert(error?.message || "❌ Failed to delete product. Please try again.");
    }
  };

  // ✅ View product details (opens drawer in view mode)
  const handleProductDetails = async (id: string) => {
    try {
      const productDetails = await productService.getProductDetails(id);

      if (productDetails) {
        openDrawer("view", productDetails);
      } else {
        alert("❌ Failed to fetch product details.");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      alert("❌ An error occurred while fetching product details.");
    }
  };

  // ✅ Toggle trending
  const handleToggleTrending = async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    try {
      const updated = await productService.toggleTrending(
        id,
        !product.isTrending
      );

      if (updated) {
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      }
    } catch (error: any) {
      console.error("Toggle trending error:", error);
      alert(error?.message || "❌ Failed to update trending status.");
    }
  };

  // ✅ Image navigation
  const handleNextImage = () => {
    const allImages = getAllImages(selectedProduct);
    if (allImages.length > 0) {
      nextImage(allImages.length);
    }
  };

  const handlePrevImage = () => {
    const allImages = getAllImages(selectedProduct);
    if (allImages.length > 0) {
      prevImage(allImages.length);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SearchControls
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedArtist={selectedArtist}
          uniqueArtists={uniqueArtists}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onArtistChange={setSelectedArtist}
          onAddProduct={() => openDrawer("add")}
        />

        {products.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products available. Click "Add Product" to create your first
              product.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products match your search criteria.
            </p>
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            showDropdown={showDropdown}
            onToggleDropdown={setShowDropdown}
            onOpenDrawer={openDrawer}
            onToggleTrending={handleToggleTrending}
            onDelete={handleDeleteProduct}
            onViewDetails={handleProductDetails}
          />
        )}
      </div>

      <ProductDrawer
        showDrawer={showDrawer}
        drawerMode={drawerMode}
        selectedProduct={selectedProduct}
        formData={formData}
        thumbnailPreview={thumbnailPreview}
        imagePreview={imagePreview}
        currentImageIndex={currentImageIndex}
        onClose={closeDrawer}
        onSave={handleSave}
        onInputChange={handleInputChange}
        onThumbnailSelect={handleThumbnailSelect}
        onImageSelect={handleImageSelect}
        onThumbnailUrlChange={handleThumbnailUrlChange}
        onImageUrlChange={handleImageUrlChange}
        onRemoveThumbnail={removeThumbnail}
        onRemoveImage={removeImage}
        onNextImage={handleNextImage}
        onPrevImage={handlePrevImage}
        onSetImageIndex={setCurrentImageIndex}
        onViewDetails={handleProductDetails}
      />
    </div>
  );
}
