"use client"
import { Product } from "@/app/data/products";
import { addToWishList, fetchRemoveWishItem } from "@/app/lib/api";
import { useAppDispatch, useAppSelector } from "@/state-management/hooks";
import { addToWishlist, removeFromWishlist } from "@/state-management/slices/wishlistSlice";
import { Heart } from "lucide-react";
import { useState } from "react";
interface AddToWIshlistProps{
  id:number;
}
export const AddToWIshlist:React.FC<AddToWIshlistProps>=({id_})=>{
  const [isLiked, setIsLiked] = useState(false);
  const userID='5ffda320-72dc-420f-8b30-1223f807c9aa'
         const selector = useAppSelector(state => (state.wishlist as { items: Product[] }).items);
const dispatch=useAppDispatch();
         const handleWishlist=async()=>{
          console.log("Clicked on wishlist button for product ID:", id_);
          console.log("Current wishlist items from Redux:", selector);
if(selector && selector.length>0 && selector.find((item)=>item.product_id==id_)){
  const foundItem=selector.find((item)=>item.product_id==id_);
 
  console.log("Item already in wishlist","remove it",selector.find((item)=>item.product_id==id_));
const response=await fetchRemoveWishItem( foundItem.id)
console.log('remove data response',response)
  if(response.success==true){
   dispatch (removeFromWishlist(foundItem.id));
  }
}

else{
  console.log("Item not in wishlist","add it");
  const response=await addToWishList(userID,id_)
  console.log('added to wishlist',response)

  if(response.success==true){
   dispatch (addToWishlist(response.data));
  }
}
            // console.log("Wishlist items from Redux:", selector);
          }
    return<button
          onClick={handleWishlist}
          className="absolute top-2 right-2 transition-colors bg-white rounded-full p-1.5 shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
            selector &&  selector.find((item)=>item?.product_id==id_) ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>
}

