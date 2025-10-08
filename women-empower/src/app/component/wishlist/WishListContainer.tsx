"use client";
import { Product } from "@/app/data/products";
import { useAppDispatch, useAppSelector } from "@/state-management/hooks";
import ProductCardNew from "../cart/ProductCardNew";
import { ContinueShopping } from "../ui/button/COntinewSHopping";
import { Heart } from "lucide-react";
import { fillWishlist } from "@/state-management/slices/wishlistSlice";
interface wl{

   id: string,
            user_id: string,
            product_id:string
}
interface WlProp{
  wishlistData:wl[]
}
export const WishListContainer:React.FC<WlProp>=({wishlistData})=>{
   const dispatch = useAppDispatch();
console.log(wishlistData,'---------------')
  dispatch(fillWishlist(wishlistData));
      const wishListItems = useAppSelector(state => (state.wishlist as { items: Product[] }).items);

    return(

         <div className="container mx-auto px-4 py-8">
                {wishListItems.length === 0 ? (
                  // Empty Wishlist State
                  <div className="text-center py-16">
                    <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                    <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                      Your wishlist is empty
                    </h2>
                    <p className="text-gray-500 mb-8">
                      Explore our beautiful rangoli collection and add items you love!
                    </p>
                  <ContinueShopping />
                  </div>
                ) : (
                  // Wishlist Items Grid - Fixed to show exactly 5 cards per row on larger screens
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-none">
                    {/* {wishlistData.length>0 && wishListItems.map((item) => {
                    
        
                      return (
                                             <ProductCardNew product={item}/>
                      );
                    })} */}
                  </div>
                )}
              </div>
    )
}