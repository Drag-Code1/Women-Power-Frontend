import { Course } from "../types/course";

// This would typically fetch from your database or API
export const getPopularCourses = async (): Promise<Course[]> => {
  // Sample courses data - Replace with your actual data fetching logic
  const allCourses: Course[] = [
    {
      id: "6960b9ee-74a6-4067-a95e-f338413201c4",
      thumbnail: "images/treditional.png",
      course_coordinator: "Dhananday Kumar",
      category_id: "Programming",
      title: "Advanced Python Programming",
      description: "Dive deep into advanced Python topics like generators, decorators, multithreading, and performance optimization.",
      lessons: 11,
      level: "advance",
      price: "249.50",
      discount: 15,
      isPopular: true
    },
    {
      id: "2",
      thumbnail: "images/treditional.png",
      course_coordinator: "Priya Sharma",
      category_id: "Design",
      title: "UI/UX Design Masterclass",
      description: "Learn the fundamentals of user interface and user experience design from industry experts.",
      lessons: 24,
      level: "intermediate",
      price: "199.00",
      discount: 20,
      isPopular: true
    },
    {
      id: "3",
      thumbnail: "images/treditional.png",
      course_coordinator: "Rahul Verma",
      category_id: "Web Development",
      title: "Full Stack Web Development",
      description: "Build complete web applications using modern technologies like React, Node.js, and MongoDB.",
      lessons: 32,
      level: "intermediate",
      price: "299.00",
      discount: 25,
      isPopular: true
    },
    {
      id: "4",
      thumbnail: "images/treditional.png",
      course_coordinator: "Anita Desai",
      category_id: "Marketing",
      title: "Digital Marketing Strategy",
      description: "Master digital marketing techniques including SEO, social media, email marketing, and analytics.",
      lessons: 18,
      level: "beginner",
      price: "149.00",
      discount: 10,
      isPopular: true
    }
  ];

  // Filter only popular courses
  return allCourses.filter((course) => course.isPopular);
};