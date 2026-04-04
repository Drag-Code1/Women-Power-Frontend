"use client";
import { useEffect, useState } from "react";
import { getPopularCourses } from "@/app/api/populercourses";
import { PopularCoursesClient } from '../popularcourses/PopularCoursesClient';
import { Course } from '@/app/types/course';

export const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPopularCourses();
        setPopularCourses(data || []);
      } catch (err) {
        console.error('Error fetching popular courses:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch popular courses');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#f1f2f4] py-2 px-4">
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 bg-[#f6f0e3] rounded-lg animate-pulse">
          <div className="h-8 bg-gray-200 w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-100 rounded"></div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f2f4] py-2 px-4">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 sm:py-4 bg-[#f6f0e3] rounded-lg">
        {/* Title */}
        <div className="mb-6 text-left">
          <h2 className="text-black text-3xl font-bold">Popular Courses</h2>
        </div>

        {error ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error loading popular courses
            </h3>
            <p className="text-gray-600 mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-block bg-[#61503c] text-white px-6 py-2 rounded-md hover:bg-[#7a5b3e] transition-all duration-200 transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        ) : popularCourses.length > 0 ? (
          <PopularCoursesClient courses={popularCourses} />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No popular courses found
            </h3>
            <p className="text-gray-600">
              Check back later for popular courses!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
