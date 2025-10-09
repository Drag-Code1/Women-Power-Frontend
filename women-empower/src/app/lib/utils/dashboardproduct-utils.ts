// utils/product.ts
import { Product, ProductFilters } from "@/app/types/dashboard-product";

export const calculateDiscountedPrice = (
  price: number,
  discount: number
): number => {
  return Math.round(price - (price * discount) / 100);
};

export const filterProducts = (
  products: Product[],
  filters: ProductFilters
): Product[] => {
  return products.filter((product) => {
    const matchesSearch =
      !filters.searchTerm ||
      product.p_Name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesCategory =
      !filters.category ||
      filters.category === "all" ||
      product.category_id === filters.category;

    const matchesArtist =
      !filters.artist ||
      filters.artist === "all" ||
      product.artist_id === filters.artist;

    return matchesSearch && matchesCategory && matchesArtist;
  });
};

export const getUniqueArtists = (products: Product[]): string[] => {
  const uniqueArtists = Array.from(new Set(products.map((p) => p.artist_id)));
  return ["all", ...uniqueArtists];
};

export const getCategoryLabel = (categoryId: string): string => {
  if (categoryId === "all") return "All Categories";
  if (categoryId === "shubh_labh") return "Shubh Labh";
  if (categoryId === "diya_thali") return "Diya & Thali";
  return categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};