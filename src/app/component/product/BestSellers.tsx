"use client";
import { useEffect, useState } from "react";
import { getBestSellers } from "@/app/api/bestsellersproduct";
import type { Product } from "@/app/types/product";
import { BestSellersClient } from "../bestsellers/BestSellersClient";

export const BestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBestSellers();
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching best sellers:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch best sellers');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#f1f2f4] py-2 sm:py-3 px-2 sm:px-4">
        <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-5 bg-white rounded-sm overflow-hidden animate-pulse">
          <div className="h-8 bg-gray-200 w-48 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded"></div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-3 px-2 sm:px-4">
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-5 bg-white rounded-sm overflow-hidden">
        <div className="mb-3 sm:mb-4 text-left px-2 sm:px-0">
          <h2 className="text-black text-xl sm:text-2xl md:text-3xl font-bold">Best Sellers</h2>
        </div>

        {error ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">⚠️</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Error loading best sellers
            </h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-block bg-[#61503c] text-white px-4 sm:px-6 py-2 rounded-md hover:bg-[#7a5b3e] transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        ) : products.length > 0 ? (
          <div className="px-0 sm:px-0">
            <BestSellersClient products={products} />
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">📦</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No best sellers found
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Check back later for our top products!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
