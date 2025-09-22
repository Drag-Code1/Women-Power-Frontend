"use client"
import { Heart } from "lucide-react";
import { useState } from "react";
export const AddToWIshlist:React.FC=()=>{
  const [isLiked, setIsLiked] = useState(false);
    return<button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-2 right-2 transition-colors bg-white rounded-full p-1.5 shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>
}

