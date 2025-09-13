"use client";

export interface Category {
  id: number;
  name: string;
  image: string;
  count?: number;
}

export const categoriesData: Category[] = [
  {
    id: 1,
    name: "Rangolis",
    image: "/images/images.jpg",
    count: 20,
  },
  {
    id: 2,
    name: "Spiritual",
    image: "/images/images.jpg",
    count: 12,
  },
  {
    id: 3,
    name: "Resin",
    image: "/images/images.jpg",
    count: 3,
  },
  {
    id: 4,
    name: "Shubh Labh",
    image: "/images/images.jpg",
    count: 9,
  },
  {
    id: 5,
    name: "Diya",
    image: "/images/images.jpg",
    count: 10,
  },
  {
    id: 6,
    name: "Lapdesk",
    image: "/images/images.jpg",
    count: 5,
  },
];
