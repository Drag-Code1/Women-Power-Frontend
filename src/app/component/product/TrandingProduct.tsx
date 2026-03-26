import { getTrendingProducts } from "@/app/api/trandingproducts";
import type { Product } from "@/app/types/product";
import { TrendingProductsClient } from "../trandingproducts/TrendingProductsClient";

export const TrendingProducts = async () => {
  // Fetch data on the server
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getTrendingProducts();
  } catch (err) {
    console.error('Error fetching trending products:', err);
    error = err instanceof Error ? err.message : 'Failed to fetch trending products';
  }

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-3 px-2 sm:px-4">
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-5 bg-white rounded-sm overflow-hidden">
        <div className="mb-3 sm:mb-4 text-left px-2 sm:px-0">
          <h2 className="text-black text-xl sm:text-2xl md:text-3xl font-bold">Trending Products</h2>
        </div>

        {error ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">⚠️</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Error loading trending products
            </h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              {error}
            </p>
            <a
              href="/"
              className="inline-block bg-[#61503c] text-white px-4 sm:px-6 py-2 rounded-md hover:bg-[#7a5b3e] transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              Try Again
            </a>
          </div>
        ) : products.length > 0 ? (
          <div className="px-0 sm:px-0">
            <TrendingProductsClient products={products} />
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🔥</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No trending products found
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Check back later for trending items!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
