import { Course } from "@/app/types/course"
import CourseCard from "../cart/CourseCard"
interface courseContainerProps{

    courses:Course[];
}
export const CoursesContainer:React.FC<courseContainerProps>=({courses})=>{

return(

<div className={`transition-opacity duration-300 ${false ? "opacity-50" : "opacity-100"}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                      <div
                        key={course.id}
                        className="animate-fadeIn"
                        style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
                      >
                        <CourseCard course={course} />
                      </div>
                    ))}
                  </div>
                </div>

)

}