"use client";
import React, { useRef, useState, useEffect } from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Visibility from "@mui/icons-material/Visibility";
import { Heart, ShoppingCart } from "lucide-react";
import "@/app/globals.css";
import { getArtistProducts, ArtistProduct } from "@/app/lib/artistApi";
import { useCart } from "@/app/contexts/CartContext";
import { useWishlist } from "@/app/contexts/WishlistContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import R2Image from "../dashboard/dashboardallproductstab/R2Image";
import { DEFAULT_THUMBNAIL } from "@/app/data/dashboardproductdata";

interface ArtworkItem {
  p_Name: string;
  thumbnail: string;
  category_id: string;
  artist_id: string;
  price: string;
  discount: number;
  isTrending: boolean;
}

interface ArtistWorkProps {
  artistId: string;
}

const ArtistWork: React.FC<ArtistWorkProps> = ({ artistId }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [artworks, setArtworks] = useState<ArtistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Fixed visible cards count: 2 for mobile, 3 for larger screens
  const [visibleCards, setVisibleCards] = useState(2);
  
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Update visible cards based on screen width
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Fetch artist products on component mount
  useEffect(() => {
    const fetchArtistProducts = async () => {
      try {
        setLoading(true);
        const products = await getArtistProducts(artistId);
        setArtworks(products);
      } catch (error) {
        console.error('Error fetching artist products:', error);
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    if (artistId) {
      fetchArtistProducts();
    }
  }, [artistId]);

  // Handle add to cart
  const handleAddToCart = async (product: ArtistProduct) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      setAddingToCart(product.id);
      await addToCart(product.id, 1);
      console.log('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(null);
    }
  };

  // Handle wishlist toggle
  const handleToggleWishlist = async (product: ArtistProduct) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
        console.log('Product removed from wishlist');
      } else {
        await addToWishlist(product.id);
        console.log('Product added to wishlist');
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const cardWidth = containerWidth / visibleCards;
      const gap = 16; // gap-4
      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      if (direction === "left") {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else {
        setCurrentIndex((prev) => Math.min(artworks.length - visibleCards, prev + 1));
      }

      setTimeout(checkScrollButtons, 400);
    }
  };

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      scroll("right");
    } else if (isRightSwipe) {
      scroll("left");
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", checkScrollButtons);
    return () => container?.removeEventListener("scroll", checkScrollButtons);
  }, []);

  // Calculate discounted price
  const calculateDiscountedPrice = (price: string, discount: number) => {
    const originalPrice = parseFloat(price);
    const discountAmount = originalPrice * (discount / 100);
    return (originalPrice - discountAmount).toFixed(2);
  };

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-3 px-2 sm:px-4">
      <section className="relative p-2 sm:p-4 lg:p-6 bg-white rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-3 sm:mb-4 px-2 sm:px-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-black">
            Artist Work's
          </h2>
        </div>

        <div className="relative">
          {loading ? (
            // Loading skeleton
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: visibleCards }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
                  style={{ 
                    width: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 16 / visibleCards}px)` 
                  }}
                >
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : artworks.length === 0 ? (
            // Empty state
            <div className="flex-shrink-0 w-full text-center py-8">
              <p className="text-gray-500">No artworks found for this artist.</p>
            </div>
          ) : (
            <>
              {/* Left Scroll Button */}
              {canScrollLeft && (
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md bg-white text-gray-700 hover:bg-gray-100"
                >
                  <ChevronLeft />
                </button>
              )}

              {/* Right Scroll Button */}
              {canScrollRight && (
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md bg-white text-gray-700 hover:bg-gray-100"
                >
                  <ChevronRight />
                </button>
              )}

              {/* Scrollable Cards */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-hidden scroll-smooth"
                style={{ 
                  scrollbarWidth: "none", 
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch"
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {artworks.map((artwork, index) => (
                  <div
                    key={artwork.id}
                    className="flex-shrink-0 bg-white rounded-2xl shadow-sm hover:shadow-xl 
                             transition-all duration-300 overflow-hidden group"
                    style={{ 
                      width: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 16 / visibleCards}px)` 
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <R2Image
                        src={artwork.thumbnail}
                        fallbackSrc={DEFAULT_THUMBNAIL}
                        alt={artwork.p_Name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Wishlist Button */}
                      <button
                        onClick={() => handleToggleWishlist(artwork)}
                        className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm hover:scale-110 transition-all"
                        aria-label={isInWishlist(artwork.id) ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isInWishlist(artwork.id) ? "text-red-500 fill-red-500" : "text-gray-600"
                          }`}
                        />
                      </button>

                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 
                                   transition-all duration-300 flex items-center justify-center">
                      </div>

                      {/* Trending Badge */}
                      {artwork.isTrending && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Trending
                          </span>
                        </div>
                      )}

                      {/* Discount Badge */}
                      {artwork.discount > 0 && (
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {artwork.discount}% OFF
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
                        {artwork.p_Name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        {artwork.discount > 0 ? (
                          <>
                            <span className="text-lg font-bold text-gray-900">
                              ₹{calculateDiscountedPrice(artwork.price, artwork.discount)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ₹{artwork.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            ₹{artwork.price}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddToCart(artwork)}
                          disabled={addingToCart === artwork.id}
                          className={`flex-1 bg-[#695946] hover:bg-[#61503c] text-white px-2 py-2 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-1 ${
                            addingToCart === artwork.id ? 'opacity-50 cursor-not-allowed' : ''
                          } ${isInCart(artwork.id) ? 'bg-green-600 hover:bg-green-700' : ''}`}
                        >
                          {addingToCart === artwork.id ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                              Adding...
                            </>
                          ) : isInCart(artwork.id) ? (
                            <>
                              In Cart
                            </>
                          ) : (
                            <>
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots Indicator for Mobile */}
              {artworks.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: Math.ceil(artworks.length / visibleCards) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (scrollContainerRef.current) {
                          const containerWidth = scrollContainerRef.current.offsetWidth;
                          const cardWidth = containerWidth / visibleCards;
                          const gap = 16;
                          const scrollPosition = index * visibleCards * (cardWidth + gap);
                          
                          scrollContainerRef.current.scrollTo({
                            left: scrollPosition,
                            behavior: "smooth",
                          });
                          
                          setCurrentIndex(index * visibleCards);
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        Math.floor(currentIndex / visibleCards) === index
                          ? "bg-[#61503c] w-6"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArtistWork;