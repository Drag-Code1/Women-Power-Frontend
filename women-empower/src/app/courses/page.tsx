// app/courses/page.tsx (Server Component)
import CoursesDirectoryClient from "../component/courese/CoursesDirectoryClient ";

interface Course {
  id: string;
  thumbnail: string;
  course_coordinator: string;
  category_id: string;
  title: string;
  description: string;
  lessons: number;
  level: string;
  price: string;
  discount: number;
}

interface ApiResponse {
  success: boolean;
  data: Course[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    categories: string[];
    levels: string[];
  };
}

async function getCourses(): Promise<ApiResponse> {
  try {
    // In production, this would be your actual API endpoint
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/courses?limit=1000`, {
      cache: 'no-store', // For dynamic data
      // Or use: next: { revalidate: 60 } for ISR
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch courses');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      success: false,
      data: [],
      pagination: {
        page: 1,
        limit: 9,
        total: 0,
        totalPages: 0
      },
      filters: {
        categories: [],
        levels: []
      }
    };
  }
}

export default async function CoursesPage() {
  const coursesData = await getCourses();

  return (
    <CoursesDirectoryClient 
      initialCourses={coursesData.data}
      categories={coursesData.filters.categories}
      levels={coursesData.filters.levels}
    />
  );
}

// Optional: Generate metadata
export const metadata = {
  title: 'Online Courses | Learning Platform',
  description: 'Browse our collection of online courses and start learning today',
};