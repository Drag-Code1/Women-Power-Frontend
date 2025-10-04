"use client"
import { Filter } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"

export const CourseFilter:React.FC=()=>{
const params=useSearchParams();
const url=new URLSearchParams(params.toString());


    return(
          <button
                onClick={() => {url.set('course-filter','true');
 history.pushState(null, '', `?${url.toString()}`);
                }
                }
                className="lg:hidden flex items-center gap-2 bg-gray-100 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-200"
              >
                <Filter className="w-4 h-4" />
                Filters
                {/* <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} /> */}
              </button>
    )
}