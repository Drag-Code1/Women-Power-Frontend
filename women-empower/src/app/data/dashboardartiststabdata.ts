// lib/data/artists.ts
import { Artist } from "../types/dashboard-artist-tab";

export const initialArtists: Artist[] = [
  {
    id: 1,
    artist_name: 'Priya Sharma',
    category: 'Rangoli',
    intro: 'Traditional rangoli artist with expertise in floral designs',
    joining_date: '2024-01-15',
    experience: '5 years',
    artist_review_id: 'AR001',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
  },
  {
    id: 2,
    artist_name: 'Rahul Verma',
    category: 'Resin',
    intro: 'Modern resin art specialist creating contemporary pieces',
    joining_date: '2024-02-20',
    experience: '3 years',
    artist_review_id: 'AR002',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
  },
  {
    id: 3,
    artist_name: 'Anjali Patel',
    category: 'Spiritual',
    intro: 'Spiritual art creator focusing on devotional themes',
    joining_date: '2024-03-10',
    experience: '7 years',
    artist_review_id: 'AR003',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'
  },
  {
    id: 4,
    artist_name: 'Vikram Singh',
    category: 'Decor',
    intro: 'Home decor specialist with unique design aesthetics',
    joining_date: '2024-04-05',
    experience: '4 years',
    artist_review_id: 'AR004'
  },
];

// Server-side function to fetch artists
export async function getArtists(): Promise<Artist[]> {
  // In production, this would fetch from a database
  // For now, returning initial data
  return initialArtists;
}

// Server-side function to get a single artist
export async function getArtistById(id: number): Promise<Artist | null> {
  const artists = await getArtists();
  return artists.find(artist => artist.id === id) || null;
}