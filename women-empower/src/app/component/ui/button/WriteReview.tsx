"use client"
import { useSearchParams } from "next/navigation"

export const WriteReview:React.FC=()=>{
const searchParams=useSearchParams();
const url=new URLSearchParams(searchParams.toString())

    return(      <button 
              onClick={()=>{

url.set('review-frm','true');
   history.pushState(null, '', `?${url.toString()}`);
              }}
                // onClick={() => setShowWriteReview(!showWriteReview)}
                className="bg-[#685845] hover:bg-[#61503c] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                Write a Review
              </button>)
}