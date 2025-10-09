
export interface Product {
  id: number;
  title: string;
  description: string;
  netPrice: number;      // Original MRP
  offerPrice?: number;   // Discounted price (optional)
  currency: string;
  image: string;
  category: string;
  stock: boolean;
  rating: number;
  isTrending: boolean;
  price:number;
  isPopular: boolean;
}