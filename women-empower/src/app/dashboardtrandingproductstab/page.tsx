// app/trending/page.tsx
"use client";
import React, { useEffect } from "react";
import { TrendingProduct } from "../types/dashboardtrendingtab";
import { useTrendingManagement } from "../hooks/useTrendingManagement";
import { useTrendingImageView } from "../hooks/useTrendingImageView";
import { getAllImages } from "@/app/lib/utils/dashboardtrending-utils";
import { TrendingHeader } from "../component/dashboard/dashboardtrendingproductstab/TrendingHeader";
import { TrendingProductGrid } from "../component/dashboard/dashboardtrendingproductstab/TrendingProductGrid";
import { TrendingProductDrawer } from "../component/dashboard/dashboardtrendingproductstab/TrendingProductDrawer";

const INITIAL_PRODUCTS: TrendingProduct[] = [
  {
    id: "1",
    p_Name: "Spiritual Wall Art",
    p_thumbnail:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    p_images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400",
    ],
    category_id: "spiritual",
    artist_name: "Rajesh Kumar",
    price: 2999,
    discount: 15,
    review_id: "4.5",
    sell_count: 156,
    description: "Beautiful spiritual artwork for meditation spaces",
    specification: "Canvas print, 24x36 inches, Premium quality",
    isTrending: true,
  },
  {
    id: "2",
    p_Name: "Rangoli Stencil Set",
    p_thumbnail:
      "https://images.unsplash.com/photo-1604608672516-f1b7919aa817?w=400",
    p_images: [
      "https://images.unsplash.com/photo-1635776062043-223faf322554?w=400",
      "https://images.unsplash.com/photo-1608896838107-90d2baf1e4e9?w=400",
    ],
    category_id: "rangoli",
    artist_name: "Priya Sharma",
    price: 899,
    discount: 20,
    review_id: "4.2",
    sell_count: 89,
    description: "Complete rangoli stencil set for festivals",
    specification: "Plastic stencils, 12 designs, Reusable",
    isTrending: false,
  },
  {
    id: "3",
    p_Name: "Handcrafted Resin Ganesha",
    p_thumbnail:
      "https://images.unsplash.com/photo-1583241800698-9c8652dcbdcf?w=400",
    p_images: [
      "https://images.unsplash.com/photo-1595050006260-9b7a93bc2dd0?w=400",
      "https://images.unsplash.com/photo-1514496959998-c01c40915c5e?w=400",
    ],
    category_id: "resin",
    artist_name: "Amit Patel",
    price: 1899,
    discount: 10,
    review_id: "4.7",
    sell_count: 234,
    description: "Beautiful handcrafted resin Ganesha statue",
    specification: "Eco-friendly resin, Hand painted, 6 inches",
    isTrending: false,
  },
  {
    id: "4",
    p_Name: "Traditional Diya Set",
    p_thumbnail:
      "https://images.unsplash.com/photo-1604431696980-01264b7f4b83?w=400",
    p_images: [
      "https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=400",
      "https://images.unsplash.com/photo-1571197123729-e5d7cd230c14?w=400",
    ],
    category_id: "diya_thali",
    artist_name: "Meera Agarwal",
    price: 1499,
    discount: 25,
    review_id: "4.8",
    sell_count: 320,
    description: "Handcrafted traditional diya set for festivals",
    specification: "Brass material, Set of 12, Hand-painted",
    isTrending: true,
  },
  {
    id: "5",
    p_Name: "Shubh Labh Wall Hanging",
    p_thumbnail:
      "https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?w=400",
    p_images: [
      "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=400",
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400",
    ],
    category_id: "shubh_labh",
    artist_name: "Vikash Singh",
    price: 799,
    discount: 30,
    review_id: "4.6",
    sell_count: 180,
    description: "Beautiful Shubh Labh wall hanging for prosperity",
    specification: "Wood and metal, 14 inches, Traditional design",
    isTrending: true,
  },
];

export default function TrendingPage() {
  const {
    products,
    showDrawer,
    drawerMode,
    selectedProduct,
    showDropdown,
    setShowDropdown,
    openDrawer,
    closeDrawer,
    removeFromTrending,
  } = useTrendingManagement(INITIAL_PRODUCTS);

  const {
    currentImageIndex,
    setCurrentImageIndex,
    resetImageIndex,
    nextImage,
    prevImage,
  } = useTrendingImageView();

  // Reset image index when drawer opens
  useEffect(() => {
    if (showDrawer) {
      resetImageIndex();
    }
  }, [showDrawer, resetImageIndex]);

  const handleNextImage = () => {
    const allImages = getAllImages(selectedProduct);
    nextImage(allImages.length);
  };

  const handlePrevImage = () => {
    const allImages = getAllImages(selectedProduct);
    prevImage(allImages.length);
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto min-h-screen">
      <div className="max-w-7xl mx-auto">
        <TrendingHeader totalCount={products.length} />

        <TrendingProductGrid
          products={products}
          showDropdown={showDropdown}
          onToggleDropdown={setShowDropdown}
          onOpenDrawer={openDrawer}
          onRemoveFromTrending={removeFromTrending}
        />
      </div>

      <TrendingProductDrawer
        showDrawer={showDrawer}
        selectedProduct={selectedProduct}
        currentImageIndex={currentImageIndex}
        onClose={closeDrawer}
        onNextImage={handleNextImage}
        onPrevImage={handlePrevImage}
        onSetImageIndex={setCurrentImageIndex}
      />
    </div>
  );
}
