export interface Artist {
  id: number;
  artist_Name: string;
  artist_profile_pic:string;
  introduction: string;
  // phone: string;
  // location: string;
  image: string;
  category_id: string;
  // rating: number;
  experience: string;
  // speciality: string;
  // completedWorks: number;
  joining_date: string;
}
export interface ArtworkItem {
  id: number;
  title: string;
  image: string;
  rating: number;
  likes: number;
  category: string;
}
