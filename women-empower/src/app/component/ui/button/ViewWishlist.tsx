"use client";
import { Product } from "@/app/data/products";
import { fetchWishListItems } from "@/app/lib/api";
import { useAppDispatch, useAppSelector } from "@/state-management/hooks";
import { fillWishlist } from "@/state-management/slices/wishlistSlice";
import { FavoriteBorder } from "@mui/icons-material";
import { Console } from "console";
import Link from "next/link";
import React, { useEffect } from "react";


export const ViewWishlist = () => {
    
     const selector = useAppSelector(state => (state.wishlist as { items: Product[] }).items);
     const dispatch = useAppDispatch();

     useEffect(() => {
       // This will run once when the component mounts
       async function fetchWishlist() {
       
    const wishlistData=await fetchWishListItems();
    console.log("Fetched wishlist data:", wishlistData);
    dispatch(fillWishlist(wishlistData));
    }
    fetchWishlist();
       console.log("Wishlist items:", selector);
     }
        , []);

    //  const router = useRouter();    


     return(

         <div className="relative">
            <Link href={"/wishlist"}>
           
                <button
                //   onClick={() => handleNav("/wishlist")}
                  className="p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg"
                >
                  <FavoriteBorder className="w-5 h-5" />
                </button>
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {selector.length}
                </span>

                 </Link>
              </div>
     )};