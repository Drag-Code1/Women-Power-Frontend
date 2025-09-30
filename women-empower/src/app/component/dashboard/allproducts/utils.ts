// utils.ts
import { Product } from "@/app/types/types";

export const calculateDiscountedPrice = (price: number, discount: number): number => {
  return Math.round(price - (price * discount) / 100);
};

export const getUniqueArtists = (products: Product[]): string[] => {
  const uniqueArtists = Array.from(new Set(products.map(p => p.artist_name)));
  return ["all", ...uniqueArtists];
};

export const filterProducts = (
  products: Product[],
  searchTerm: string,
  selectedCategory: string,
  selectedArtist: string
): Product[] => {
  return products.filter((product: Product) => {
    const matchesSearch: boolean =
      product.p_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory: boolean =
      selectedCategory === "all" || product.category_id === selectedCategory;
    const matchesArtist: boolean =
      selectedArtist === "all" || product.artist_name === selectedArtist;
    return matchesSearch && matchesCategory && matchesArtist;
  });
};

export const formatCategoryName = (category: string): string => {
  if (category === "all") return "All Categories";
  if (category === "shubh_labh") return "Shubh Labh";
  if (category === "diya_thali") return "Diya & Thali";
  return category.charAt(0).toUpperCase() + category.slice(1);
};