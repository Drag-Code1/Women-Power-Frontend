// data/products.ts
import { Product } from "../types/product";

export const allProducts: Product[] = [];

export const getPriceRanges = () => [
  { label: "Under ₹500", min: 0, max: 499 },
  { label: "₹500 - ₹750", min: 500, max: 750 },
  { label: "₹750 - ₹1000", min: 751, max: 1000 },
  { label: "₹1000 - ₹1500", min: 1001, max: 1500 },
  { label: "Over ₹1500", min: 1501, max: Infinity },
];

export const getSortOptions = () => [
  "Popular",
  "Price: Low to High",
  "Price: High to Low",
  "Name A-Z",
  "Name Z-A",
];
