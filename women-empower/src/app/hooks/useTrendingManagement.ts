// hooks/useTrendingManagement.ts
'use client';
import { useState, useCallback } from "react";
import { TrendingProduct,TrendingDrawerMode } from "../types/dashboardtrendingtab";

export const useTrendingManagement = (initialProducts: TrendingProduct[]) => {
  const [products, setProducts] = useState<TrendingProduct[]>(initialProducts);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [drawerMode, setDrawerMode] = useState<TrendingDrawerMode>("view");
  const [selectedProduct, setSelectedProduct] = useState<TrendingProduct | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const openDrawer = useCallback((mode: TrendingDrawerMode, product: TrendingProduct) => {
    setDrawerMode(mode);
    setSelectedProduct(product);
    setShowDropdown(null);
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300);
  }, []);

  const removeFromTrending = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to remove this product from trending?")) {
      setProducts(prev =>
        prev.map((p) =>
          p.id === id ? { ...p, isTrending: false } : p
        )
      );
      setShowDropdown(null);
      if (selectedProduct?.id === id) {
        closeDrawer();
      }
    }
  }, [selectedProduct, closeDrawer]);

  // Filter only trending products
  const trendingProducts = products.filter(p => p.isTrending);

  return {
    products: trendingProducts,
    setProductsList: (items: TrendingProduct[]) => setProducts(items),
    showDrawer,
    drawerMode,
    selectedProduct,
    showDropdown,
    setShowDropdown,
    openDrawer,
    closeDrawer,
    removeFromTrending,
  };
};