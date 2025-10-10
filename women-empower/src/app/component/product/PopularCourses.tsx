import { getPopularCourses } from "@/app/api/populercourses";
import { PopularCoursesClient } from '../popularcourses/PopularCoursesClient';

export const PopularCourses = async () => {
  // Fetch data on the server
  const popularCourses = await getPopularCourses();

  return (
    <div className="bg-[#f1f2f4] py-2 px-4">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 sm:py-4 bg-[#f6f0e3] rounded-lg">
        {/* Title */}
        <div className="mb-6 text-left">
          <h2 className="text-black text-3xl font-bold">Popular Courses</h2>
        </div>

        {/* Pass data to client component */}
        <PopularCoursesClient courses={popularCourses} />
      </section>
    </div>
  );
};