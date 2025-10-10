"use client"
import { useAppDispatch, useAppSelector } from "@/state-management/hooks";
import { Heart } from "lucide-react";
import { Product } from "@/app/data/products";
import { addToWishlist, removeFromWishlist } from "@/state-management/slices/wishlistSlice";
import { addToWishList, fetchRemoveWishItem } from "@/app/lib/api";
interface AddToWIshlistProps{
  id:number;
}
export const ProductAddToWishList:React.FC<AddToWIshlistProps>=({id_})=>{ const userID='5ffda320-72dc-420f-8b30-1223f807c9aa'
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
    return( 
          <button
              onClick={handleWishlist}
                    // onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                      true
                        ? "border-red-200 bg-red-50 text-red-600"
                        : "border-gray-200 hover:bg-gray-50 text-gray-600 hover:border-red-200"
                    }`}
                  >
                    {/* <Heart  className={true ? "fill-current" : ""} /> */}
                    <Heart 
            className={`w-4 h-4 transition-colors ${
            selector &&  selector.find((item)=>item?.product_id==id_) ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
                  </button>
    )
};