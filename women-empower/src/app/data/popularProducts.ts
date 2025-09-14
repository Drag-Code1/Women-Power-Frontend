// data/popularProducts.ts
export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice: number | null;
  image: string;
  isOnSale: boolean;
  discount?: number;
}

export const popularProducts: Product[] = [
  {
    id: 1,
    title: "Green Kundan rangoli with hanging",
    category: "Circle Rangoli",
    price: 1900,
    originalPrice: 2100,
    image: "/images/demo1.jpg",
    isOnSale: true,
    discount: 20,
  },
  {
    id: 2,
    title: "Pink and purple flower rangoli",
    category: "Multicolour Rangoli",
    price: 1800,
    originalPrice: null,
    image: "/images/demo1.jpg",
    isOnSale: false,
  },
  {
    id: 3,
    title: "Paan Rangoli",
    category: "Circle Rangoli",
    price: 950,
    originalPrice: null,
    image: "/images/demo1.jpg",
    isOnSale: false,
  },
  {
    id: 4,
    title: "Ganesha Rangoli with Idol",
    category: "Rangolis",
    price: 2750,
    originalPrice: null,
    image: "/images/demo1.jpg",
    isOnSale: false,
  },
  {
    id: 5,
    title: "Shanku chakra and naman Venkateshwara mandala",
    category: "Rangolis",
    price: 950,
    originalPrice: null,
    image: "/images/demo1.jpg",
    isOnSale: false,
  },
  {
    id: 6,
    title: "Radha Krishna Rangoli",
    category: "Rangolis",
    price: 3000,
    originalPrice: null,
    image: "/images/demo1.jpg",
    isOnSale: false,
  },
  {
    id: 7,
    title: "Beautiful Handcrafted kalash diya Set",
    category: "Handmade Diya and Thali",
    price: 500,
    originalPrice: null,
    image: "/images/demo1.jpg",
    isOnSale: false,
  },
  {
    id: 8,
    title: "Shubh labh",
    category: "Shubh Labh",
    price: 575,
    originalPrice: null,
    image: "/images/demo1.jpg",
    isOnSale: false,
  },
];
