"use client";

import React, { useState } from "react";
import { WishListItem } from "@/app/types/wishlist";
import { WishListHeader } from "./WishListHeader";
import { WishListCard } from "./WishListCard";
import { WishListEmpty } from "./WishListEmpty";
import { WishListSkeleton } from "./WishListSkeleton";
import { useWishlist } from "@/app/contexts/WishlistContext";
import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { getCategoryDetailsApi } from "@/app/lib/api";

interface WishListClientProps {
  initialItems: WishListItem[];
  loading?: boolean;
}

export const WishListClient: React.FC<WishListClientProps> = ({ 
  initialItems,
  loading = false
}) => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [addingId, setAddingId] = useState<string | null>(null);
  const [categoryNames, setCategoryNames] = useState<Record<string, string>>({});

  // Resolve category names for wishlist items
  React.useEffect(() => {
    const fetchCategoryNames = async () => {
      try {
        const uniqueIds = Array.from(new Set(wishlistItems.map(i => i.category_id).filter(Boolean)));
        const toFetch = uniqueIds.filter(id => !(id in categoryNames));
        if (toFetch.length === 0) return;
        const results = await Promise.all(toFetch.map(async (id) => {
          try {
            const details = await getCategoryDetailsApi(id);
            const name = details?.name || id;
            return [id, name] as [string, string];
          } catch {
            return [id, id] as [string, string];
          }
        }));
        setCategoryNames(prev => ({ ...prev, ...Object.fromEntries(results) }));
      } catch {
        // ignore
      }
    };
    fetchCategoryNames();
  }, [wishlistItems, categoryNames]);

  const handleRemoveFromWishList = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  const removeAllItems = async () => {
    // Remove all items from wishlist
    const removePromises = wishlistItems.map(item => removeFromWishlist(item.id));
    await Promise.all(removePromises);
  };

  const handleAddToCart = async (item: WishListItem) => {
    if (!isAuthenticated) {
      const returnUrl = typeof window !== 'undefined' ? (window.location.pathname + window.location.search) : '/';
      router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      return;
    }

    try {
      setAddingId(item.id);
      await addToCart(item.id, 1);
    } catch (err) {
      console.error('Error adding wishlist item to cart:', err);
    } finally {
      setAddingId(null);
    }
  };

  const moveToCart = async (item: WishListItem) => {
    await handleAddToCart(item);
    // Best-effort remove from wishlist after adding to cart
    setTimeout(async () => {
      await handleRemoveFromWishList(item.id);
    }, 300);
  };

  return (
    <div className="min-h-screen px-0 bg-gray-50">
      {/* Header - Only show when items exist */}
      {!loading && wishlistItems.length > 0 && (
        <WishListHeader 
          itemCount={wishlistItems.length} 
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
        ) : wishlistItems.length === 0 ? (
          // Empty Wishlist State
          <WishListEmpty />
        ) : (
          // Wishlist Items Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-none">
            {wishlistItems.map((item, index) => (
              <WishListCard
                key={item.id}
                item={item}
                index={index}
                onRemove={handleRemoveFromWishList}
                onMoveToCart={moveToCart}
                categoryName={categoryNames[item.category_id]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
