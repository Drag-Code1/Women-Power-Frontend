export interface Artist {
  id: number;
  name: string;
  category: string;
  image: string;
  rating: number;
  bio: string;
}

export const artistsData: Artist[] = [
  {
    id: 1,
    name: "Riya Sharma",
    category: "Rangoli",
    image: "/images/demo1.jpg",
    rating: 4.7,
    bio: "Specializes in traditional and modern rangoli art."
  },
  {
    id: 2,
    name: "Arjun Mehta",
    category: "Sculpture",
    image: "/images/demo2.jpg",
    rating: 4.5,
    bio: "Sculptor working with clay and resin materials."
  },
  {
    id: 3,
    name: "Sneha Patel",
    category: "Painting",
    image: "/images/demo3.jpg",
    rating: 4.8,
    bio: "Contemporary painter blending realism with abstract styles."
  },
];