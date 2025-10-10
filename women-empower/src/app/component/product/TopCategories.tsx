import { getTopCategories } from "@/app/api/category";
import { TopCategoriesClient } from '../categories/TopCategoriesClient';

export const TopCategories = async () => {
  // Fetch data on the server
  const categories = await getTopCategories();

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 bg-white rounded-sm">
        {/* Pass data to client component */}
        <TopCategoriesClient categories={categories} />
      </section>
    </div>
  );
};