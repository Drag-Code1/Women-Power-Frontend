export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorImage: string;
  thumbnail: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  description: string;
  tags: string[];
  isPopular: boolean;
  language: string;
  startDate: string;
}