"use client";

import React, { useState } from "react";
import { WishListItem } from "@/app/types/wishlist";
import { WishListHeader } from "./WishListHeader";
import { WishListCard } from "./WishListCard";
import { WishListEmpty } from "./WishListEmpty";
import { WishListSkeleton } from "./WishListSkeleton";

interface WishListClientProps {
  initialItems: WishListItem[];
  loading?: boolean;
}

export const WishListClient: React.FC<WishListClientProps> = ({ 
  initialItems,
  loading = false
}) => {
  const [wishListItems, setWishListItems] = useState<WishListItem[]>(initialItems);

  const removeFromWishList = (id: string) => {
    setWishListItems((items) => items.filter((item) => item.id !== id));
  };

  const removeAllItems = () => {
    setWishListItems([]);
  };

  const addToCart = (item: WishListItem) => {
    console.log("Adding to cart:", item);
    setWishListItems((items) =>
      items.map((i) => (i.id === item.id ? { ...i, inCart: true } : i))
    );
  };

  const moveToCart = (item: WishListItem) => {
    addToCart(item);
    setTimeout(() => {
      removeFromWishList(item.id);
    }, 500);
  };

  return (
    <div className="min-h-screen px-0 bg-gray-50">
      {/* Header - Only show when items exist */}
      {!loading && wishListItems.length > 0 && (
        <WishListHeader 
          itemCount={wishListItems.length} 
          onRemoveAll={removeAllItems}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          // Loading state with skeleton cards
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-none">
            {Array.from({ length: 10 }).map((_, index) => (
              <WishListSkeleton key={index} />
            ))}
          </div>
        ) : wishListItems.length === 0 ? (
          // Empty Wishlist State
          <WishListEmpty />
        ) : (
          // Wishlist Items Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-none">
            {wishListItems.map((item, index) => (
              <WishListCard
                key={item.id}
                item={item}
                index={index}
                onRemove={removeFromWishList}
                onMoveToCart={moveToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};