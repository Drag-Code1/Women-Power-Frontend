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

export const DEFAULT_THUMBNAIL = "";

export const INITIAL_FORM_DATA = {
  p_Name: "",
  thumbnail: "",
  p_images: ["", ""],
  category_id: "",
  artist_id: "",
  price: 0,
  discount: 0,
  description: "",
  specification: "",
};