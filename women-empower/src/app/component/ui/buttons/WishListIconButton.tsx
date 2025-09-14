 
 "use client";
 import React from "react";
 
 import FavoriteIcon from '@mui/icons-material/Favorite';
 import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

 interface IsWishlisted {
 
   isWishlisted: boolean;
  
 }
 interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice: number | null;
  image: string;
  isOnSale: boolean;
  discount?: number;
}
 export const WishListIconButton: React.FC<{ product:Product,isWishlisted: IsWishlisted }> = ({ product,isWishlisted }) => {
 
  const handleWishlist = () => {
    // setIsWishlisted(!isWishlisted);
    onWishlist?.(product);
  };
   const onWishlist = (product: Product) => {
     console.log("Added to wishlist:", product.title);
   };
 
     return(
      <button
            onClick={handleWishlist}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
              isWishlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            {isWishlisted ? (
              <FavoriteIcon sx={{ fontSize: 18 }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 18 }} />
            )}
          </button>
     )
 }
 
 
 
 