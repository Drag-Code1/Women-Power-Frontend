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
    category: "Resin",
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
  {
    id: 4,
    name: "Kabir Joshi",
    category: "Spiritual",
    image: "/images/demo4.jpg",
    rating: 4.6,
    bio: "Creates spiritual artworks inspired by Indian traditions."
  },
  {
    id: 5,
    name: "Meera Kapoor",
    category: "Shubh Labh",
    image: "/images/demo5.jpg",
    rating: 4.4,
    bio: "Designs Shubh Labh and festive wall hangings for homes."
  },
  {
    id: 6,
    name: "Aditya Nair",
    category: "Lapdesk",
    image: "/images/demo6.jpg",
    rating: 4.3,
    bio: "Crafts modern lapdesks combining utility with traditional art."
  },
  {
    id: 7,
    name: "Pooja Iyer",
    category: "Diya & Thali",
    image: "/images/demo7.jpg",
    rating: 4.9,
    bio: "Specializes in beautifully decorated diyas and thalis."
  },
  {
    id: 8,
    name: "Vikram Singh",
    category: "Decor",
    image: "/images/demo8.jpg",
    rating: 4.2,
    bio: "Creates handmade home decor items blending rustic and modern aesthetics."
  },
  {
    id: 9,
    name: "Ananya Verma",
    category: "Gift",
    image: "/images/demo9.jpg",
    rating: 4.5,
    bio: "Designs unique gift items for special occasions."
  }
];