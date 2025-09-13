'use client';

import Image from 'next/image';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

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

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  onWishlist,
  onQuickView 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.(product);
  };

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  return (
    <div 
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.isOnSale && product.discount && (
        <div className="absolute top-3 left-3 z-20 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {product.discount}%
        </div>
      )}

      <div className="relative w-full h-64 sm:h-72 bg-gray-100 overflow-hidden">
        <Image
          src={product.image || '/placeholder-product.jpg'}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
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
          
          <button
            onClick={() => onQuickView?.(product)}
            className="w-9 h-9 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-800 hover:text-white transition-all duration-200 shadow-md"
          >
            <VisibilityIcon sx={{ fontSize: 18 }} />
          </button>
          
          <button
            onClick={() => onAddToCart?.(product)}
            className="w-9 h-9 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-md"
          >
            <ShoppingCartIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-gray-500 mb-1 font-medium">
          {product.category}
        </p>
        
        <h3 
          className="font-semibold text-gray-800 text-sm sm:text-base mb-2 leading-tight overflow-hidden"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
        >
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <button
            onClick={() => onAddToCart?.(product)}
            className="w-full bg-[#867259eb] hover:bg-[#61503c] text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCartIcon sx={{ fontSize: 16 }} />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );    
};

export default ProductCard;
