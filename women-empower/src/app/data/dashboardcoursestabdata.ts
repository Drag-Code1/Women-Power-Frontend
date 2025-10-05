// data/courses.ts
import { Course } from "../types/dashboardcoursetab";

export const initialCourses: Course[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop',
    courseName: 'Traditional Rangoli Patterns',
    coordinator: 'Swami Raghav',
    category: 'Spiritual',
    title: 'Spiritual Meditation & Healing',
    description: 'Learn meditation, chanting, and healing practices for peace of mind.',
    lessons: 28,
    level: 'Beginner',
    price: 1899,
    discount: 32
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
    courseName: 'Resin Art Basics',
    coordinator: 'Priya Sharma',
    category: 'Resin',
    title: 'Resin Art & Crafts',
    description: 'Master the art of resin crafting and create beautiful decorative pieces.',
    lessons: 15,
    level: 'Intermediate',
    price: 2499,
    discount: 25
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
    courseName: 'Diya Making Workshop',
    coordinator: 'Amit Kumar',
    category: 'Diya & Thali Decor',
    title: 'Traditional Diya Decoration',
    description: 'Learn traditional and modern diya decoration techniques for festivals.',
    lessons: 12,
    level: 'Beginner',
    price: 1299,
    discount: 15
  },
  {
    id: '4',
    thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop',
    courseName: 'Shubh Labh Designs',
    coordinator: 'Meera Patel',
    category: 'Shubh Labh',
    title: 'Auspicious Home Decor',
    description: 'Create beautiful Shubh Labh designs for your home and special occasions.',
    lessons: 10,
    level: 'Beginner',
    price: 999,
    discount: 20
  }
];