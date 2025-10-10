// types/product.ts
export interface Product {
  id: string;
  p_Name: string;
  thumbnail: string;
  category_id: string;
  price: string;
  discount: number;
  isTrending: boolean;
  is_in_wishlist: boolean;
}

export interface CartItem {
  [key: string]: number;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}