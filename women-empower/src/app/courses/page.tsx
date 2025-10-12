// app/courses/page.tsx (Server Component)
import CoursesDirectoryClient from "../component/courses/CoursesDirectoryClient ";
import { getCoursesApi, getCategoriesApi } from "../lib/api";
import { Course } from "../types/course";

async function getCourses(): Promise<{
  courses: Course[];
  categories: string[];
  levels: string[];
}> {
  try {
    // Fetch courses from API
    const courses = await getCoursesApi();
    
    // Fetch categories for filtering
    const categoriesData = await getCategoriesApi();
    const categories = categoriesData?.map((cat: any) => cat.name) || [];
    
    // Extract unique levels from courses
    const levels = [...new Set(courses.map((course: any) => course.level))];
    
    return {
      courses: courses || [],
      categories,
      levels
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      courses: [],
      categories: [],
      levels: []
    };
  }
}

export default async function CoursesPage() {
  const coursesData = await getCourses();

  return (
    <CoursesDirectoryClient 
      initialCourses={coursesData.courses}
      categories={coursesData.categories}
      levels={coursesData.levels}
    />
  );
}

// Optional: Generate metadata
export const metadata = {
  title: 'Online Courses | Learning Platform',
  description: 'Browse our collection of online courses and start learning today',
};