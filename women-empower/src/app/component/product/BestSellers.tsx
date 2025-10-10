import { getBestSellers } from "@/app/api/bestsellersproduct";
import { BestSellersClient } from "../bestsellers/BestSellersClient";

export const BestSellers = async () => {
  // Fetch data on the server
  const products = await getBestSellers();

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-5 bg-white rounded-sm">
        <div className="mb-4 sm:mb-5 text-left">
          <h2 className="text-black text-2xl sm:text-3xl font-bold">Best Sellers</h2>
        </div>

        {/* Pass data to client component */}
        <BestSellersClient products={products} />
      </section>
    </div>
  );
};