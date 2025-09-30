// DrawerView.tsx
import React from 'react';
import { Star, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/app/types/types';
import { calculateDiscountedPrice } from '@/app/component/dashboard/allproducts/utils';

const DEFAULT_PRODUCT_IMAGE = "/default-product-image.png";

interface DrawerViewProps {
  product: Product;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

const DrawerView: React.FC<DrawerViewProps> = ({
  product,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const validImages = (product.p_images || []).filter(img => img);
  const currentImage = validImages[currentImageIndex] || validImages[0];

  const nextImage = () => {
    if (validImages.length > 1) {
      setCurrentImageIndex((currentImageIndex + 1) % validImages.length);
    }
  };

  const prevImage = () => {
    if (validImages.length > 1) {
      setCurrentImageIndex((currentImageIndex - 1 + validImages.length) % validImages.length);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <img
          src={currentImage || DEFAULT_PRODUCT_IMAGE}
          alt={product.p_Name}
          className="w-full h-64 object-cover rounded-lg"
        />
        {validImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-md transition-all duration-150"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-md transition-all duration-150"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {validImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2">
        {validImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
              currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
            }`}
          >
            <img src={img} alt={`${product.p_Name} ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Product Name</label>
          <p className="text-gray-900 mt-1 font-medium">{product.p_Name}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Artist Name</label>
          <p className="text-gray-900 mt-1 font-medium">{product.artist_name}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <p className="text-gray-900 mt-1 capitalize">{product.category_id?.replace("_", " ")}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Original Price</label>
          <p className="text-gray-900 mt-1 font-semibold">₹{product.price.toLocaleString()}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Discount</label>
          <p className="text-gray-900 mt-1">
            {product.discount}%
            {product.discount > 0 && (
              <span className="text-sm text-green-600 block">
                Save ₹{(product.price - calculateDiscountedPrice(product.price, product.discount)).toLocaleString()}
              </span>
            )}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Final Price</label>
          <p className="text-gray-900 mt-1 font-bold text-lg text-green-600">
            ₹{calculateDiscountedPrice(product.price, product.discount).toLocaleString()}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Rating</label>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-gray-900 font-medium">{product.review_id}</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Sold</label>
          <p className="text-gray-900 mt-1 font-medium">{product.sell_count} units</p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <p className="text-gray-900 mt-1 leading-relaxed">{product.description}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Specifications</label>
        <p className="text-gray-900 mt-1 leading-relaxed">{product.specification}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Status</label>
        <p className="text-gray-900 mt-1">
          {product.isTrending ? (
            <span className="inline-flex items-center gap-1 text-orange-600 font-medium">
              <TrendingUp className="w-4 h-4" />
              Trending Product
            </span>
          ) : (
            <span className="text-gray-600">Regular Product</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default DrawerView;