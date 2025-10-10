import { Category } from "../types/category";

// This would typically fetch from your database or API
export const getTopCategories = async (): Promise<Category[]> => {
  // Sample categories data - Replace with your actual data fetching logic
  const categories: Category[] = [
    {
      id: "1",
      name: "Rangoli",
      image: "/images/tedee.png"
    },
    {
      id: "2",
      name: "Spiritual",
      image: "/images/tedee.png"
    },
    {
      id: "3",
      name: "Resin",
      image: "/images/tedee.png"
    },
    {
      id: "4",
      name: "Shubh Labh",
      image: "/images/tedee.png"
    },
    {
      id: "5",
      name: "Lapdesk",
      image: "/images/tedee.png"
    },
    {
      id: "6",
      name: "Diya & Thali",
      image: "/images/tedee.png"
    },
    {
      id: "7",
      name: "Decor",
      image: "/images/tedee.png"
    },
    {
      id: "9",
      name: "Diya & Thali",
      image: "/images/tedee.png"
    },
    {
      id: "11",
      name: "Decor",
      image: "/images/tedee.png"
    }
  ];

  // In a real application, you might sort or filter the categories here
  return categories;
};