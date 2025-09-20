'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, X, Star } from 'lucide-react';

interface WishListItem {
  id: string;
  title: string;
  description: string;
  netPrice: number;      // Original MRP
  offerPrice?: number;   // Discounted price (optional)
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

const WishList: React.FC<WishListProps> = ({ className = '' }) => {
  const [wishListItems, setWishListItems] = useState<WishListItem[]>([
    {
      id: '1',
      title: 'Big Peacock Rangoli',
      category: 'RANGOLI',
      netPrice: 500,
      offerPrice: 450,
      currency: 'INR',
      rating: 4.5,
      image: '/images/demo1.jpg',
      description: 'Multicolour Rangoli',
      stock: true,
      isTrending: false,
      isPopular: true
    },
    {
      id: '2',
      title: 'Elephant Rangoli',
      category: 'RANGOLI',
      netPrice: 350,
      offerPrice: 70,
      currency: 'INR',
      rating: 4.2,
      image: '/images/demo2.jpg',
      description: 'Exceptional Handmade Rangoli',
      stock: true,
      isTrending: true,
      isPopular: false
    },
    {
      id: '3',
      title: 'Lotus Rangoli',
      category: 'RANGOLI',
      netPrice: 600,
      offerPrice: 550,
      currency: 'INR',
      rating: 4.6,
      image: '/images/demo3.jpg',
      description: 'Decorative Lotus Flower Rangoli',
      stock: true,
      isTrending: false,
      isPopular: true
    },
    {
      id: '4',
      title: 'Diwali Peacock Rangoli',
      category: 'RANGOLI',
      netPrice: 650,
      offerPrice: 600,
      currency: 'INR',
      rating: 4.8,
      image: '/images/demo4.jpg',
      description: 'Colorful Diwali Rangoli Peacock Style',
      stock: true,
      isTrending: true,
      isPopular: true
    }
  ]);

  const removeFromWishList = (id: string) => {
    setWishListItems(items => items.filter(item => item.id !== id));
  };

  const removeAllItems = () => {
    setWishListItems([]);
  };

  const addToCart = (item: WishListItem) => {
    // Handle add to cart logic here
    console.log('Adding to cart:', item);
    // You can integrate with your cart state management
  };

  const moveToCart = (item: WishListItem) => {
    addToCart(item);
    removeFromWishList(item.id);
  };

  return (
    <div className={`min-h-screen px-4 bg-gray-50 ${className}`}>
      {/* Header - Only show when items exist */}
      {wishListItems.length > 0 && (
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
                <p className="mt-1 text-gray-600">
                    {wishListItems.length} item{wishListItems.length !== 1 ? 's' : ''} in your wishlist
                </p>
                </div>
              <button
                onClick={removeAllItems}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
              >
                Remove All Items
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {wishListItems.length === 0 ? (
          // Empty Wishlist State
          <div className="text-center py-16">
            <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Explore our beautiful rangoli collection and add items you love!</p>
            <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105">
              Continue Shopping
            </button>
          </div>
        ) : (
          // Wishlist Items Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishListItems.map((item) => {
              // Calculate discount percentage
              const discountPercentage =
                item.offerPrice && item.offerPrice < item.netPrice
                  ? Math.round(((item.netPrice - item.offerPrice) / item.netPrice) * 100)
                  : 0;

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={192}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Show Discount Badge */}
                    {discountPercentage > 0 && (
                      <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {discountPercentage}% OFF
                      </div>
                    )}
                    
                    {/* Heart button - Red since it's in wishlist */}
                    <button
                      onClick={() => removeFromWishList(item.id)}
                      className="absolute top-2 right-2 transition-colors bg-white rounded-full p-1.5 shadow-sm"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    {/* Category + Rating */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{item.rating}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-xs mb-3 line-clamp-1">
                      {item.description}
                    </p>

                    {/* Price Section */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {item.offerPrice && item.offerPrice < item.netPrice ? (
                          <>
                            <div className="text-lg font-semibold text-gray-900">
                              ₹{item.offerPrice.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 line-through">
                              ₹{item.netPrice.toLocaleString()}
                            </div>
                          </>
                        ) : (
                          <div className="text-lg font-semibold text-gray-900">
                            ₹{item.netPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => moveToCart(item)}
                        className="bg-[#695946] text-white px-3 py-2 rounded text-xs hover:bg-[#61503c] transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Continue Shopping */}
        {wishListItems.length > 0 && (
          <div className="text-center mt-12">
            <button
             onClick={() => {}}
             className="bg-transparent border-2 border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;