// constants/product.ts
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

export const DEFAULT_THUMBNAIL = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400";

export const INITIAL_FORM_DATA = {
  p_Name: "",
  p_thumbnail: "",
  p_images: ["", ""],
  category_id: "",
  artist_name: "",
  price: 0,
  discount: 0,
  review_id: "0",
  sell_count: 0,
  description: "",
  specification: "",
};