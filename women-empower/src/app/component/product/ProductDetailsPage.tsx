'use client';
import React, { useState } from "react";
import type { JSX } from "react";
import { Heart, Star, Plus, Minus, ShoppingCart } from "lucide-react";

const ProductDetailsPage = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const productData = {
    title: "Traditional Shubh Labh",
    subtitle: "Handcrafted Decorative Piece",
    price: 700,
    originalPrice: 950,
    rating: 4.6,
    reviews: 124,
  };

  const productImages = [
    "/images/product-details.png",
    "/images/product-details.png",
    "/images/product-details.png",
    "/images/product-details.png",
  ];

  interface ProductData {
    title: string;
    subtitle: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
  }

  type RenderStarsFn = (rating: number) => JSX.Element[];

  const renderStars: RenderStarsFn = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < Math.floor(rating) 
            ? "fill-amber-400 text-amber-400" 
            : "text-gray-200"
        }`}
      />
    ));
  };

  return (
    
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-6">
        
        {/* Main Product Grid */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Section */}
            <div className="p-6 lg:p-8">
              {/* Main Image */}
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100 mb-4">
                <img
                  src={productImages[selectedImage]}
                  alt={productData.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border transition-all duration-200 ${
                      selectedImage === index 
                        ? "border-[#695946] border-2 ring-2 ring-[#695946]/20" 
                        : "border-gray-200 hover:border-[#695946]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 lg:p-8 lg:border-l border-gray-100">
              
              {/* Title & Rating */}
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl  text-gray-900 mb-2">
                  {productData.title}
                </h1>
                <p className="text-gray-600 mb-3">{productData.subtitle}</p>
                
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">{renderStars(productData.rating)}</div>
                  <span className="text-sm text-gray-500">
                    {productData.rating} • {productData.reviews} reviews
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl  text-gray-900">
                    ₹{productData.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{productData.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                    {Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)}% OFF
                  </span>
                </div>
                <p className="text-sm text-green-600 font-medium">Free shipping above ₹500</p>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">Quantity</label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 transition-colors border-r border-gray-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-3 font-medium min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-50 transition-colors border-l border-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                    ✓ In Stock
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-8">
                <button className="w-full bg-[#695946] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#5a4a3a] transition-colors shadow-sm">
                  Add to Cart
                </button>
                
                <div className="flex gap-3">
                  <button className="flex-1 border border-gray-200 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Buy Now
                  </button>
                  
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                      isWishlisted
                        ? "border-red-200 bg-red-50 text-red-600"
                        : "border-gray-200 hover:bg-gray-50 text-gray-600 hover:border-red-200"
                    }`}
                  >
                    <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
                  </button>
                </div>
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Key Features</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Premium materials</li>
                    <li>• Authentic design</li>
                    <li>• Easy mounting</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Care Tips</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Dust with soft cloth</li>
                    <li>• Avoid direct sunlight</li>
                    <li>• Keep in dry place</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-xl shadow-sm mt-6 p-6 lg:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Product Description
          </h2>
          
          <div className="text-gray-600 leading-relaxed">
            <p className="mb-4">
              This Traditional Shubh Labh decorative piece brings divine blessings and 
              positive energy to your home. Meticulously handcrafted with premium materials, 
              it features authentic traditional designs that have been passed down through 
              generations.
            </p>

            <p className="mb-6">
              Perfect for festivals, special occasions, or as a permanent addition to your 
              spiritual space, this piece combines spiritual significance with aesthetic beauty.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">What's Included</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    Traditional Shubh Labh piece
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    Wall mounting accessories
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    Installation guide
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    Material: Premium quality
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    Finish: Hand-painted
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    Mounting: Wall hanging
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;