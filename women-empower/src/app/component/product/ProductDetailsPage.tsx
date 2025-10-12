'use client';
import React, { useState, useEffect } from "react";
import type { JSX } from "react";
import { Heart, Star, Plus, Minus, ShoppingCart } from "lucide-react";
import { productService } from "@/app/lib/productapi";
import { Product } from "@/app/types/product";
import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/AuthContext";

interface ProductDetailsPageProps {
  productId?: string;
}

const ProductDetailsPage = ({ productId }: ProductDetailsPageProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  
  const { addToCart, isInCart } = useCart();
  const { user } = useAuth();

  // Fetch product details when component mounts or productId changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        setError('No product ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const productData = await productService.getProductDetails(productId);
        
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Fallback data for when no product is loaded
  const fallbackData = {
    title: "Product Not Found",
    subtitle: "Please check the product ID",
    price: 0,
    originalPrice: 0,
    rating: 0,
    reviews: 0,
  };

  const productData = product ? {
    title: product.p_Name,
    subtitle: product.description || "Handcrafted Decorative Piece",
    price: parseFloat(product.price) - (parseFloat(product.price) * product.discount / 100),
    originalPrice: parseFloat(product.price),
    rating: 4.6, // Default rating since it's not in the API response
    reviews: 124, // Default reviews since it's not in the API response
  } : fallbackData;

  const productImages = product?.p_images && product.p_images.length > 0 
    ? product.p_images 
    : product?.thumbnail 
      ? [product.thumbnail]
      : ["/images/product-details.png"];

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    if (!product) {
      alert('Product not found');
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(product.id, quantity);
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error instanceof Error ? error.message : 'Failed to add item to cart');
    } finally {
      setAddingToCart(false);
    }
  };

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

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
        <div className="min-h-screen bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-6">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#695946] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading product details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
        <div className="min-h-screen bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-6">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error Loading Product</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-[#695946] text-white px-6 py-2 rounded-lg hover:bg-[#5a4a3a] transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
     <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
    <div className="min-h-screen bg-white">
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
                <button 
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors shadow-sm flex items-center justify-center gap-2 ${
                    addingToCart 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#695946] hover:bg-[#5a4a3a]'
                  } text-white`}
                >
                  {addingToCart && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
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
            {product?.description ? (
              <p className="mb-4">{product.description}</p>
            ) : (
              <p className="mb-4">
                This beautiful handcrafted piece brings elegance and style to your space. 
                Meticulously crafted with attention to detail, it features authentic designs 
                that enhance any room's aesthetic appeal.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Product Details</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    {product?.p_Name || 'Handcrafted decorative piece'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    Premium quality materials
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    Authentic design
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    {product?.specification || 'Premium quality materials'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    Price: ₹{productData.originalPrice.toLocaleString()}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#695946] rounded-full mt-2 flex-shrink-0"></span>
                    {product?.discount ? `${product.discount}% discount available` : 'No discount'}
                  </li>
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

export default ProductDetailsPage;