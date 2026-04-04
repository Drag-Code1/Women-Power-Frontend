"use client";
import { useEffect, useState } from "react";
import { getAllProducts, getPriceRanges, getSortOptions, getCategoriesWithDetails } from "../api/products";
import ProductFilterClient from "../component/arts/ProductFilterClient";
import { Product } from "../types/product";

export default function ArtsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Array<{id: string; name: string; image: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const productsData = await getAllProducts();
        const categoriesData = await getCategoriesWithDetails(productsData);
        setProducts(productsData || []);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Error fetching products or categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const priceRanges = getPriceRanges();
  const sortOptions = getSortOptions();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f1f2f4]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#61503c]"></div>
      </div>
    );
  }

  return (
    <ProductFilterClient
      initialProducts={products}
      initialCategories={categories}
      initialPriceRanges={priceRanges}
      initialSortOptions={sortOptions}
      error={error}
    />
  );
}
