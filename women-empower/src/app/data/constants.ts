// constants.ts
import { Product } from "../types/types";

export const CATEGORIES: string[] = [
  "all",
  "rangoli",
  "spiritual",
  "resin",
  "shubh_labh",
  "lapdesk",
  "diya_thali",
  "decor",
  "gift",
];

export const ARTISTS: string[] = [
  "Rajesh Kumar",
  "Priya Sharma", 
  "Amit Patel",
  "Meera Agarwal",
  "Vikash Singh",
  "Sunita Devi",
  "Rohit Jain",
  "Kavita Rani",
  "Neha Gupta",
  "Arjun Singh"
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    p_Name: "Spiritual Wall Art",
    p_images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400"
    ],
    category_id: "spiritual",
    artist_name: "Rajesh Kumar",
    price: 2999,
    discount: 15,
    review_id: "4.5",
    sell_count: 156,
    description: "Beautiful spiritual artwork for meditation spaces",
    specification: "Canvas print, 24x36 inches, Premium quality",
    isTrending: true,
  },
  {
    id: "2",
    p_Name: "Rangoli Stencil Set",
    p_images: [
      "https://images.unsplash.com/photo-1604608672516-f1b7919aa817?w=400",
      "https://images.unsplash.com/photo-1635776062043-223faf322554?w=400",
      "https://images.unsplash.com/photo-1608896838107-90d2baf1e4e9?w=400"
    ],
    category_id: "rangoli",
    artist_name: "Priya Sharma",
    price: 899,
    discount: 20,
    review_id: "4.2",
    sell_count: 89,
    description: "Complete rangoli stencil set for festivals",
    specification: "Plastic stencils, 12 designs, Reusable",
  },
  {
    id: "3",
    p_Name: "Handcrafted Resin Ganesha",
    p_images: [
      "https://images.unsplash.com/photo-1583241800698-9c8652dcbdcf?w=400",
      "https://images.unsplash.com/photo-1595050006260-9b7a93bc2dd0?w=400",
      "https://images.unsplash.com/photo-1514496959998-c01c40915c5e?w=400"
    ],
    category_id: "resin",
    artist_name: "Amit Patel",
    price: 1899,
    discount: 10,
    review_id: "4.7",
    sell_count: 234,
    description: "Beautiful handcrafted resin Ganesha statue",
    specification: "Eco-friendly resin, Hand painted, 6 inches",
    isTrending: false,
  },
  {
    id: "4",
    p_Name: "Shubh Labh Door Hanging",
    p_images: [
      "https://images.unsplash.com/photo-1593184066642-6df72e8fd7a9?w=400",
      "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400"
    ],
    category_id: "shubh_labh",
    artist_name: "Meera Agarwal",
    price: 599,
    discount: 25,
    review_id: "4.3",
    sell_count: 67,
    description: "Traditional Shubh Labh door hanging for prosperity",
    specification: "Fabric and beads, Handmade, 12 inches",
  },
  {
    id: "5",
    p_Name: "Table Lamp with Shade",
    p_images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
    ],
    category_id: "lapdesk",
    artist_name: "Vikash Singh",
    price: 1299,
    discount: 0,
    review_id: "4.8",
    sell_count: 445,
    description: "Elegant table lamp perfect for study desk",
    specification: "LED bulb included, Adjustable height, Modern design",
  },
  {
    id: "6",
    p_Name: "Brass Diya Set",
    p_images: [
      "https://images.unsplash.com/photo-1604846592298-3df2ee5abfe1?w=400",
      "https://images.unsplash.com/photo-1574936754519-6e8d87b27b30?w=400",
      "https://images.unsplash.com/photo-1604608672516-f1b7919aa817?w=400"
    ],
    category_id: "diya_thali",
    artist_name: "Sunita Devi",
    price: 799,
    discount: 15,
    review_id: "4.6",
    sell_count: 178,
    description: "Traditional brass diya and thali set for festivals",
    specification: "Pure brass, Set of 5 diyas with thali, Handcrafted",
  },
  {
    id: "7",
    p_Name: "Home Decor Wall Hanging",
    p_images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400"
    ],
    category_id: "decor",
    artist_name: "Rohit Jain",
    price: 1599,
    discount: 20,
    review_id: "4.4",
    sell_count: 89,
    description: "Modern wall hanging for home decoration",
    specification: "Metal and wood, Contemporary design, Easy to hang",
  },
  {
    id: "8",
    p_Name: "Handmade Gift Box Set",
    p_images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"
    ],
    category_id: "gift",
    artist_name: "Kavita Rani",
    price: 1199,
    discount: 30,
    review_id: "4.5",
    sell_count: 156,
    description: "Beautiful handmade gift box set for special occasions",
    specification: "Decorative paper, Set of 3 boxes, Ribbon included",
  },
];

export const DEFAULT_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400";