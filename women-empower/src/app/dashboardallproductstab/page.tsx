// app/products/page.tsx
import { Suspense } from "react";
import ProductDashboard from "../component/dashboard/dashboard-allproducts-tab/ProductDashboard";
import { productApi } from "../lib/productapi";

// Loading component
function ProductsLoading() {
  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 animate-pulse">
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-md shadow-sm h-[280px] animate-pulse">
              <div className="bg-gray-200 h-40 rounded-t-md"></div>
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Async function to fetch products (Server Component)
async function ProductsContent() {
  const result = await productApi.getAllProducts();
  const products = result.success ? result.data || [] : [];

  return <ProductDashboard initialProducts={products} />;
}

// Main page component with SSR
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  );
}

// Metadata for SEO
export const metadata = {
  title: "Product Dashboard | Admin Panel",
  description: "Manage your products, categories, and inventory",
};