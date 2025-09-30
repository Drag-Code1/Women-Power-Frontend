export interface MenuSubItem {
  name: string;
  href: string;
}

export interface MenuItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: MenuSubItem[];
}





// types.ts
export interface Product {
  id: string;
  p_Name: string;
  p_images: string[];
  category_id: string;
  artist_name: string;
  price: number;
  discount: number;
  review_id: string;
  sell_count: number;
  description: string;
  specification: string;
  isTrending?: boolean;
}

export interface ProductFormData {
  p_Name: string;
  p_images: string[];
  category_id: string;
  artist_name: string;
  price: number;
  discount: number;
  review_id: string;
  sell_count: number;
  description: string;
  specification: string;
}

export type DrawerMode = "add" | "edit" | "view";