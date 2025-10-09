// data/products.ts
import { Product } from "../types/dashboard-product";

// ✅ Dummy Products
// export const DUMMY_PRODUCTS: Product[] = [
//   {
//     id: "1",
//     p_Name: "Spiritual Wall Art",
//     p_thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
//     p_images: [
//       "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
//       "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400"
//     ],
//     category_id: "spiritual",
//     artist_name: "Rajesh Kumar",
//     price: 2999,
//     discount: 15,
//     description: "Beautiful spiritual artwork for meditation spaces",
//     specification: ["Canvas print", "24x36 inches", "Premium quality"],
//     isTrending: true,
//   },
//   {
//     id: "2",
//     p_Name: "Rangoli Stencil Set",
//     p_thumbnail: "https://images.unsplash.com/photo-1604608672516-f1b7919aa817?w=400",
//     p_images: [
//       "https://images.unsplash.com/photo-1635776062043-223faf322554?w=400",
//       "https://images.unsplash.com/photo-1608896838107-90d2baf1e4e9?w=400"
//     ],
//     category_id: "rangoli",
//     artist_name: "Priya Sharma",
//     price: 899,
//     discount: 20,
//     description: "Complete rangoli stencil set for festivals",
//     specification: ["Plastic stencils", "12 designs", "Reusable"],
//   },
//   {
//     id: "3",
//     p_Name: "Handcrafted Resin Ganesha",
//     p_thumbnail: "https://images.unsplash.com/photo-1583241800698-9c8652dcbdcf?w=400",
//     p_images: [
//       "https://images.unsplash.com/photo-1595050006260-9b7a93bc2dd0?w=400",
//       "https://images.unsplash.com/photo-1514496959998-c01c40915c5e?w=400"
//     ],
//     category_id: "resin",
//     artist_name: "Amit Patel",
//     price: 1899,
//     discount: 10,
//     description: "Beautiful handcrafted resin Ganesha statue",
//     specification: ["Eco-friendly resin", "Hand painted", "6 inches"],
//     isTrending: false,
//   },
//   {
//     id: "4",
//     p_Name: "Diwali Diya Set",
//     p_thumbnail: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400",
//     p_images: [
//       "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400",
//       "https://images.unsplash.com/photo-1609250291044-f41b257f08e0?w=400"
//     ],
//     category_id: "diya_thali",
//     artist_name: "Meera Agarwal",
//     price: 1299,
//     discount: 25,
//     description: "Traditional handcrafted diya set for festivals",
//     specification: ["Clay diyas", "Set of 12", "Hand-painted designs"],
//     isTrending: true,
//   },
//   {
//     id: "5",
//     p_Name: "Shubh Labh Wall Hanging",
//     p_thumbnail: "https://images.unsplash.com/photo-1582735689249-0c4e8a951d5e?w=400",
//     p_images: [
//       "https://images.unsplash.com/photo-1582735689369-4fe2e1846d57?w=400"
//     ],
//     category_id: "shubh_labh",
//     artist_name: "Vikash Singh",
//     price: 599,
//     discount: 10,
//     description: "Auspicious Shubh Labh symbol for doorway decoration",
//     specification: ["Metal finish", "14 inches", "Easy to hang"],
//     isTrending: false,
//   },
// ];

// ✅ Categories
export const CATEGORIES = [
  "all",
  "rangoli",
  "spiritual",
  "resin",
  "shubh_labh",
  "lapdesk",
  "diya_thali",
  "decor",
  "gift",
] as const;

// ✅ Artists
export const ARTISTS = [
  "Rajesh Kumar",
  "Priya Sharma",
  "Amit Patel",
  "Meera Agarwal",
  "Vikash Singh",
  "Sunita Devi",
  "Rohit Jain",
  "Kavita Rani",
  "Neha Gupta",
  "Arjun Singh",
] as const;

// ✅ Default Image
export const DEFAULT_PRODUCT_IMAGE =
  "";

// ✅ Category Labels
export const CATEGORY_LABELS: Record<string, string> = {
  all: "All Categories",
  rangoli: "Rangoli",
  spiritual: "Spiritual",
  resin: "Resin",
  shubh_labh: "Shubh Labh",
  lapdesk: "Lap Desk",
  diya_thali: "Diya & Thali",
  decor: "Decor",
  gift: "Gift",
};
