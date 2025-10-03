import { Heart } from "lucide-react";

export const ProductAddToWishList=()=>{

    return( 
          <button
                    // onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                      true
                        ? "border-red-200 bg-red-50 text-red-600"
                        : "border-gray-200 hover:bg-gray-50 text-gray-600 hover:border-red-200"
                    }`}
                  >
                    <Heart size={18} className={true ? "fill-current" : ""} />
                  </button>
    )
};