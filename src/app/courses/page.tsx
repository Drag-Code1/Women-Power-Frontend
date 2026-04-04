"use client";
import { useEffect, useState } from "react";
import CoursesDirectoryClient from "../component/courses/CoursesDirectoryClient ";
import { getCoursesApi, getCategoriesApi } from "../lib/api";
import { Course } from "../types/course";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryMap, setCategoryMap] = useState<{ [key: string]: string }>({});
  const [levels, setLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coursesData = await getCoursesApi();
        const catsData = await getCategoriesApi();
        
        const catNames = (catsData?.map((cat: any) => cat.name).filter(Boolean) || []) as string[];
        const catMap: { [key: string]: string } = {};
        catsData?.forEach((cat: any) => {
          if (cat.name && cat.id) {
            catMap[cat.name] = cat.id;
          }
        });
        
        const uniqueLevels: string[] = [...new Set(coursesData.map((course: any) => course.level).filter(Boolean))] as string[];
        
        setCourses(coursesData || []);
        setCategories(catNames);
        setCategoryMap(catMap);
        setLevels(uniqueLevels);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f1f2f4]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#61503c]"></div>
      </div>
    );
  }

  return (
    <CoursesDirectoryClient 
      initialCourses={courses}
      categories={categories}
      categoryMap={categoryMap}
      levels={levels}
    />
  );
}

// Optional: Generate metadata
export const metadata = {
  title: 'Online Courses | Learning Platform',
  description: 'Browse our collection of online courses and start learning today',
};
