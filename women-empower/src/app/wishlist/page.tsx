
import { RemoveAllWishlistItem } from "../component/ui/button/RemoveAllWishlistItem";
import { WishlistTitle } from "../component/wishlist/WishlistTitle";
import { WishListContainer } from "../component/wishlist/WishListContainer";

interface WishListItem {
  id: string;
  title: string;
  description: string;
  netPrice: number; // Original MRP
  offerPrice?: number; // Discounted price (optional)
  currency: string;
  image: string;
  category: string;
  stock: boolean;
  rating: number;
  isTrending: boolean;
  isPopular: boolean;
}

interface WishListProps {
  className?: string;
}

const WishList: React.FC<WishListProps> = ({ className = "" }) => {
  
      

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
    <div className={`min-h-screen px-0 bg-gray-50 ${className}`}>
      {/* Header - Only show when items exist */}
    
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
             
              <WishlistTitle />
           
              <RemoveAllWishlistItem />
            </div>
          </div>
        </div>
      

    
     <WishListContainer /> 
    </div>
    </div>
  );
};

export default WishList;