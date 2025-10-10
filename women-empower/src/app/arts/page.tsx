// app/products/page.tsx
import { allProducts, getPriceRanges, getSortOptions  } from "../data/products";
import ProductFilterClient from "../component/arts/ProductFilterClient";

// Server-side data processing
const getCategories = () => {
  return [...new Set(allProducts.map((p) => p.category_id))];
};

// Main page component (Server Component)
export default function ProductsPage() {
  // Process data on the server
  const categories = getCategories();
  const priceRanges = getPriceRanges();
  const sortOptions = getSortOptions();

  return (
    <ProductFilterClient
      initialProducts={allProducts}
      initialCategories={categories}
      initialPriceRanges={priceRanges}
      initialSortOptions={sortOptions}
    />
  );
}