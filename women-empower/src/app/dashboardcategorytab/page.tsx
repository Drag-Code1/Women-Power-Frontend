import { Suspense } from 'react';
import CategoryList from '@/app/component/dashboard/dashboardcategorytab/CategoryList';
import { INITIAL_CATEGORIES } from '@/app/data/dashboardcategoriesdata';
// import { getCategories } from '../services/categoryActions';

export const metadata = {
  title: 'Category Management',
  description: 'Manage your product categories',
};

export default async function CategoriesPage() {
  // Server-side data fetching
  // const categories = await getCategories();
  
  // Abhi ke liye initial categories use kar rahe hain
  const categories = INITIAL_CATEGORIES;

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CategoryList initialCategories={categories} />
    </Suspense>
  );
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