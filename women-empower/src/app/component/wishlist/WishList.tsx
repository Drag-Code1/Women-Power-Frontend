import React from "react";
import { getWishListItems } from "@/app/api/wishlistItems";
import { WishListClient } from "./WishListClient";

interface WishListProps {
  userId?: string;
  className?: string;
}

// This is a Server Component (no "use client")
export default async function WishList({ userId, className = "" }: WishListProps) {
  // Data fetching happens on the server
  const wishlistItems = await getWishListItems(userId);

  return (
    <div className={`bg-[#f1f2f4] min-h-screen ${className}`}>
      {/* Pass server-fetched data to client component */}
      <WishListClient initialItems={wishlistItems} />
    </div>
  );
}