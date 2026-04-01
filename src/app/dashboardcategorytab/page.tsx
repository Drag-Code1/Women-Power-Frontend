'use client';
import { useState, useEffect } from 'react';
import CategoryList from '@/app/component/dashboard/dashboardcategorytab/CategoryList';
import { getCategoriesApi } from '@/app/lib/api';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const body = await getCategoriesApi();
        setCategories(body);
      } catch (err) {
        console.error('Failed to items:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingSkeleton />;

  return <CategoryList initialCategories={categories} />;
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#f2f3f5] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-64 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-300 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
