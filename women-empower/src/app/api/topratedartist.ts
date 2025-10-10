import { Artist } from "../types/artist";

// This would typically fetch from your database or API
export const getTopRatedArtists = async (): Promise<Artist[]> => {
  // Sample artists data - Replace with your actual data fetching logic
  const allArtists: Artist[] = [
    {
      id: "5bdd393c-e4c7-4312-ac0a-0a86c8f2b41c",
      artist_Name: "Dhananjay Kumar",
      artist_profile_pic: "/images/man1.jpg",
      category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28b",
      category: "Rangoli",
      joining_date: "2025-05-20 10:15:00",
      experience: 5
    },
    {
      id: "6cee404d-f5d8-5423-bd1b-1b97d9f3c52d",
      artist_Name: "Priya Sharma",
      artist_profile_pic: "/images/man1.jpg",
      category_id: "6g55e59g-144b-5cg7-0344-22dg9f00g39c",
      category: "Spiritual Art",
      joining_date: "2023-08-15 14:20:00",
      experience: 8
    },
    {
      id: "7dff515e-g6e9-6534-ce2c-2c08e0g4d63e",
      artist_Name: "Rajesh Verma",
      artist_profile_pic: "/images/man1.jpg",
      category_id: "7h66f60h-255c-6dh8-1455-33eh0g11h40d",
      category: "Resin Art",
      joining_date: "2024-02-10 11:45:00",
      experience: 6
    },
    {
      id: "8egg626f-h7f0-7645-df3d-3d19f1h5e74f",
      artist_Name: "Anita Patel",
      artist_profile_pic: "/images/man1.jpg",
      category_id: "8i77g71i-366d-7ei9-2566-44fi1h22i51e",
      category: "Shubh Labh",
      joining_date: "2023-11-25 16:30:00",
      experience: 9
    },
    {
      id: "9fhh737g-i8g1-8756-eg4e-4e20g2i6f85g",
      artist_Name: "Suresh Gupta",
      artist_profile_pic: "/images/man1.jpg",
      category_id: "9j88h82j-477e-8fj0-3677-55gj2i33j62f",
      category: "Decor",
      joining_date: "2024-06-12 09:00:00",
      experience: 4
    },
    {
      id: "0gii848h-j9h2-9867-fh5f-5f31h3j7g96h",
      artist_Name: "Kavita Joshi",
      artist_profile_pic: "/images/man1.jpg",
      category_id: "0k99i93k-588f-9gk1-4788-66hk3j44k73g",
      category: "Diya & Thali",
      joining_date: "2023-03-08 13:15:00",
      experience: 11
    },
    {
      id: "1hjj959i-k0i3-0978-gi6g-6g42i4k8h07i",
      artist_Name: "Arun Mehta",
      artist_profile_pic: "/images/man1.jpg",
      category_id: "1l00j04l-699g-0hl2-5899-77il4k55l84h",
      category: "Gift Hampers",
      joining_date: "2024-09-18 10:30:00",
      experience: 10
    },
    {
      id: "2ikk060j-l1j4-1089-hj7h-7h53j5l9i18j",
      artist_Name: "Neha Singh",
      artist_profile_pic: "/images/man1.jpg",
      category_id: "2m11k15m-700h-1im3-6900-88jm5l66m95i",
      category: "Lapdesk Design",
      joining_date: "2024-01-22 15:45:00",
      experience: 7
    },
    {
      id: "io8q6l6p-r7pk-hf4f-np3n-3n19oks5oh4p",
      artist_Name: "Arjun Das",
      artist_profile_pic: "/images/man1.jpg",
      category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28e",
      category: "Shubh Labh",
      joining_date: "2023-06-11 09:30:00",
      experience: 7
    }
  ];

  // In a real application, you might filter or sort the artists here
  return allArtists;
};