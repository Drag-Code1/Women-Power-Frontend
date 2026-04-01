"use client";
import { useState, useEffect } from "react";
import { getTopCategories } from "@/app/api/category";
import type { Category } from "@/app/types/category";
import { TopCategoriesClient } from '../categories/TopCategoriesClient';

export const TopCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getTopCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return (
    <div className="bg-[#f1f2f4] py-16 text-center">
      <div className="animate-pulse text-gray-400">Loading categories...</div>
    </div>
  );

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 bg-white rounded-sm">
        {error ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading categories</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-[#61503c] text-white px-6 py-2 rounded-md">Try Again</button>
          </div>
        ) : categories.length > 0 ? (
          <TopCategoriesClient categories={categories} />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Check back later for available categories!</p>
          </div>
        )}
      </section>
    </div>
  );
};
