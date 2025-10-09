// hooks/useProductManagement.ts
'use client';
import { useState, useCallback } from "react";
import { Product, ProductFormData, DrawerMode } from "@/app/types/dashboardproduct";
import { INITIAL_FORM_DATA, DEFAULT_THUMBNAIL } from "@/app/data/dashboardproductdata";

export const useProductManagement = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("add");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);

  const openDrawer = useCallback((mode: DrawerMode, product?: Product) => {
    setDrawerMode(mode);
    setSelectedProduct(product || null);
    setShowDropdown(null);

    if (product) {
      // Map only the fields that ProductFormData expects
      const mappedData = {
        p_Name: product.p_Name || "",
        thumbnail: product.thumbnail || "",
        p_images: product.p_images || [],
        category_id: String(product.category_id || ""),
        artist_id: String(product.artist_id || ""),
        price: product.price || 0,
        discount: product.discount || 0,
        description: product.description || "",
        specification: product.specification || "",
      };
      console.log("Setting form data for edit:", mappedData);
      console.log("Product data:", product);
      setFormData(mappedData);
    } else {
      setFormData(INITIAL_FORM_DATA);
    }
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setTimeout(() => {
      setSelectedProduct(null);
      setFormData(INITIAL_FORM_DATA);
    }, 300);
  }, []);

  const handleSave = useCallback((thumbnailPreview: string, imagePreview: string[]) => {
    const finalThumbnail = thumbnailPreview.trim() !== "" ? thumbnailPreview : DEFAULT_THUMBNAIL;
    const validImages = imagePreview.filter(img => img.trim() !== "");

    if (drawerMode === "add") {
      const newProduct: Product = {
        ...formData,
        id: Date.now().toString(),
        thumbnail: finalThumbnail,
        p_images: validImages,
        review_id: "",
        sell_count: 0,
        isTrending: false,
      };
      setProducts(prev => [...prev, newProduct]);
    } else if (drawerMode === "edit" && selectedProduct) {
      setProducts(prev =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                ...formData,
                thumbnail: finalThumbnail,
                p_images: validImages,
              }
            : p
        )
      );
    }
    closeDrawer();
  }, [drawerMode, formData, selectedProduct, closeDrawer]);

  const handleDelete = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter((p) => p.id !== id));
      setShowDropdown(null);
    }
  }, []);

  const toggleTrending = useCallback((id: string) => {
    setProducts(prev =>
      prev.map((p) =>
        p.id === id ? { ...p, isTrending: !p.isTrending } : p
      )
    );
    setShowDropdown(null);
  }, []);

  const handleInputChange = useCallback((field: keyof ProductFormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  return {
    products,
    showDrawer,
    drawerMode,
    selectedProduct,
    showDropdown,
    setShowDropdown,
    formData,
    openDrawer,
    closeDrawer,
    handleSave,
    handleDelete,
    toggleTrending,
    handleInputChange,
  };
};