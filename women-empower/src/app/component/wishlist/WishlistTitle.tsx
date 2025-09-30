"use client";
import { Product } from "@/app/data/products";
import { useAppSelector } from "@/state-management/hooks";

export const WishlistTitle = () => {
      const selector = useAppSelector(state => (state.wishlist as { items: Product[] }).items);
           
  return (
<div className="space-y-1">
                <h1 className="text-2xl font-bold text-black">
                  My Wishlist
                </h1>
                <p className="mt-1 text-gray-600">
                  {selector.length} item
                  {selector.length !== 1 ? "s" : ""} in your wishlist
                </p>
              </div>
  )}   