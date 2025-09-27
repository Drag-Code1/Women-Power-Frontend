import React from 'react'
import ArtistProfile from '../component/product/ArtistProfile'
import ArtistWork from '../component/product/ArtistWork';
import ArtistReviews from '../component/product/ArtistReviews';
import { Visibility } from '@mui/icons-material';
import { ArtworkItem } from '../types/artist';
import { ArtistWorkItem } from '../component/artist/ArtistWorkItem';
// interface ArtworkItem {
//   id: number;
//   title: string;
//   image: string;
//   rating: number;
//   likes: number;
//   category: string;
// }

interface ArtistWorkProps {
  workImages?: string[];
}

function page() {
    const sampleArtworks: ArtworkItem[] = [
    {
      id: 1,
      title: "Beautiful Rangoli Design",
      image:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=300&fit=crop",
      rating: 4.8,
      likes: 125,
      category: "Traditional",
    },
    {
      id: 2,
      title: "Floral Rangoli Art",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rating: 4.9,
      likes: 89,
      category: "Floral",
    },
    {
      id: 3,
      title: "Geometric Pattern",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&sat=-100",
      rating: 4.7,
      likes: 156,
      category: "Geometric",
    },
    {
      id: 4,
      title: "Festival Special",
      image:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=300&fit=crop&hue=rotate-90",
      rating: 5.0,
      likes: 203,
      category: "Festival",
    },
    {
      id: 5,
      title: "Modern Rangoli",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&hue=rotate-180",
      rating: 4.6,
      likes: 97,
      category: "Modern",
    },
    {
      id: 6,
      title: "Peacock Design",
      image:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=300&fit=crop&hue=rotate-45",
      rating: 4.9,
      likes: 178,
      category: "Traditional",
    },
    {
      id: 7,
      title: "Lotus Rangoli",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&hue=rotate-270",
      rating: 4.8,
      likes: 134,
      category: "Spiritual",
    },
    {
      id: 8,
      title: "Abstract Art",
      image:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&h=300&fit=crop&brightness=1.2",
      rating: 4.7,
      likes: 112,
      category: "Abstract",
    },
  ];

  return (
    <div>
      <ArtistProfile />
      <ArtistWork >

 {sampleArtworks.map((artwork) => (
         <ArtistWorkItem artwork={artwork} />
            ))}

      </ArtistWork>
    <ArtistReviews />
    </div>
  )
}

export default page;
