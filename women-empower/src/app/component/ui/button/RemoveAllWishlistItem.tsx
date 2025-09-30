"use client";
import { Product } from "@/app/data/products";
import { clearWishlist } from "@/app/lib/api";
import { useAppSelector,useAppDispatch } from "@/state-management/hooks";
import { fillWishlist } from "@/state-management/slices/wishlistSlice";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
export const RemoveAllWishlistItem = () => {
    
           const selector = useAppSelector(state => (state.wishlist as { items: Product[] }).items);
          const dispatch=useAppDispatch();
           console.log("Wishlist items from Redux:", selector);

const RemoveAll=async()=>{
const wishlistData=await clearWishlist();
dispatch(fillWishlist(wishlistData));
    console.log("Remove all items clicked");
}

    return(  
             selector.length>0 && <button
                onClick={RemoveAll}
                className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-sm hover:bg-red-200 transition-colors"
              >
                <DeleteOutlineIcon fontSize="small" />
                Remove All
              </button>
          )
}