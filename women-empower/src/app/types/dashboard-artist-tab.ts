// types/artist.ts
export interface Artist {
  id: number;
  artist_name: string;
  category: string;
  intro: string;
  joining_date: string;
  experience: string;
  artist_review_id: string;
  image?: string;
}

export type ModalType = 'create' | 'edit' | 'view';

export interface ArtistFormData {
  artist_name: string;
  category: string;
  intro: string;
  joining_date: string;
  experience: string;
  artist_review_id: string;
  image: string;
}

export const CATEGORIES = [
  'Rangoli',
  'Spiritual',
  'Resin',
  'Shubh Labh',
  'Lapdesk',
  'Diya & Thali',
  'Decor',
  'Gift'
] as const;