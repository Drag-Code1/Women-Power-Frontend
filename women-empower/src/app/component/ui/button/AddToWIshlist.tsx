"use client"
import { Product } from "@/app/data/products";
import { useAppSelector } from "@/state-management/hooks";
import { Heart } from "lucide-react";
import { useState } from "react";
interface AddToWIshlistProps{
  id:number;
}
export const AddToWIshlist:React.FC<AddToWIshlistProps>=({id_})=>{
  const [isLiked, setIsLiked] = useState(false);
  
         const selector = useAppSelector(state => (state.wishlist as { items: Product[] }).items);

         const handleWishlist=()=>{
          console.log("Clicked on wishlist button for product ID:", id_);
          console.log("Current wishlist items from Redux:", selector);
if(selector.find((item)=>item.id==id_)){
  console.log("Item already in wishlist","remove it");

}
else{
  console.log("Item not in wishlist","add it");
}
            // console.log("Wishlist items from Redux:", selector);
          }
    return<button
          onClick={handleWishlist}
          className="absolute top-2 right-2 transition-colors bg-white rounded-full p-1.5 shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              selector.find((item)=>item.id==id_) ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>
}

