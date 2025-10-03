"use client"
import { useAppDispatch, useAppSelector } from "@/state-management/hooks";
import { addToCheckout } from "@/state-management/slices/checkoutSlice";
import { ShoppingCart } from "@mui/icons-material"

export const ProductBuyNow=()=>{
  
         const selector = useAppSelector(state => (state.checkout as { items: CheckoutItem[] }).items);
         const dispatch=useAppDispatch();
    return(
        <button
                          // onClick={()=>{ selector.find(Item=>Item.id!==productData.id) && dispatch(addToCheckout(productData))}}
                          
                          className="flex-1 border border-gray-200 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                            <ShoppingCart size={18} />
                            Buy Nnow
                          </button>
    )
}