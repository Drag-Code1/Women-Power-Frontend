'use client';
import React, { useState } from "react";
import {
  FavoriteOutlined,
  FavoriteBorderOutlined,
  StarRounded,
  StarBorderRounded,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";

const ShubhLabhProductPage = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const productData = {
    id: 16,
    title: "Traditional Shubh Labh",
    description: "Classic Style Decorative",
    price: 700,
    netPrice: 750,
    offerPrice: 700,
    currency: "INR",
    image: "/images/demo4.jpg",
    category: "Shubh Labh",
    stock: true,
    rating: 4.6,
    isTrending: true,
    isPopular: true,
  };

  const productImages = [
    "/images/demo4.jpg",
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
  ];

  // Render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-yellow-400">
        {i < Math.floor(rating) ? (
          <StarRounded fontSize="small" />
        ) : i < rating ? (
          <StarRounded fontSize="small" className="opacity-50" />
        ) : (
          <StarBorderRounded fontSize="small" />
        )}
      </span>
    ));
  };

  return (
    <div className="bg-white py-2 sm:py-2 px-2 sm:px-4">
      <div className="max-w-5xl mx-auto px-2 sm:px-6 py-6 sm:py-10 bg-white shadow-sm rounded-sm">
        {/* Responsive Grid: Mobile -> single column | Desktop -> 2 column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 order-2 sm:order-1 mt-4 sm:mt-0">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 bg-gray-200 rounded border-2 transition-colors ${
                    selectedImage === index
                      ? "border-gray-400"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 order-1 sm:order-2">
              <div className="aspect-square bg-gray-200 rounded max-w-full sm:max-w-lg">
                <img
                  src={productImages[selectedImage]}
                  alt={productData.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-4">
            {/* Title + Rating */}
            <div>
              <h1 className="text-2xl font-semibold text-black">
                {productData.title}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(productData.rating)}</div>
                <span className="text-sm text-gray-600">
                  {productData.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Price */}
            <div
              className="text-2xl text-black font-semibold"
              style={{ marginBottom: "40px" }}
            >
              ₹{productData.offerPrice.toLocaleString()}.00
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {/* Add To Cart + Wishlist in one row */}
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-[#f6e6f6] hover:bg-[#e0cce0] text-yellow-900 py-2 px-4 rounded text-sm font-medium">
                  Add To Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center"
                >
                  {isWishlisted ? (
                    <FavoriteOutlined className="text-red-500" />
                  ) : (
                    <FavoriteBorderOutlined className="text-red-400" />
                  )}
                </button>
              </div>

              {/* Buy Now full width */}
              <button className="w-full bg-[#ac967c] hover:bg-[#675744] text-white py-2 px-4 rounded text-sm font-medium">
                Buy Now
              </button>
            </div>

            {/* What's Included */}
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                What's Included?
              </div>
              <div className="text-sm text-gray-600">• Decorative Piece</div>
            </div>

            {/* Features Accordion */}
            <div className="pt-4">
              <button
                onClick={() => setShowFeatures(!showFeatures)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-gray-900">
                  Features
                </span>
                {showFeatures ? (
                  <KeyboardArrowUpOutlined className="text-gray-500" />
                ) : (
                  <KeyboardArrowDownOutlined className="text-gray-500" />
                )}
              </button>
              {showFeatures && (
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div>• Traditional Design</div>
                  <div>• Premium Quality</div>
                  <div>• Easy Installation</div>
                  <div>• Spiritual Significance</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8 pt-6">
          <div className="max-w-4xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Description
            </h2>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                Add a contemporary design and a pop of color to your spiritual
                space with this traditional Shubh Labh decorative piece. We love
                all the classic details from the intricate patterns and
                meaningful symbolism. The complete piece is made from premium
                materials and finished in vibrant colors for lasting beauty.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    What's Included?
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                    <li>Traditional Shubh Labh piece</li>
                    <li>Mounting accessories</li>
                    <li>Installation guide</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    Specifications
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                    <li>Material: Premium quality</li>
                    <li>Finish: Hand-painted</li>
                    <li>Mounting: Wall hanging</li>
                    <li>Care: Dust with soft cloth</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default ShubhLabhProductPage;
