export interface Artist {
  id: number;
  name: string;
  description: string;
  phone: string;
  location: string;
  image: string;
  category: string;
  rating: number;
  experience: string;
  speciality: string;
  completedWorks: number;
  topRated: boolean;
}
export interface ArtworkItem {
  id: number;
  title: string;
  image: string;
  rating: number;
  likes: number;
  category: string;
}
