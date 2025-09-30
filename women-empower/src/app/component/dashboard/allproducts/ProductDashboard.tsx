'use client';
import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Star,
  Package,
  TrendingUp,
  X,
  Save,
  MoreVertical,
  ImagePlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Product {
  id: string;
  p_Name: string;
  p_images: string[];
  category_id: string;
  artist_name: string;
  price: number;
  discount: number;
  review_id: string;
  sell_count: number;
  description: string;
  specification: string;
  isTrending?: boolean;
}

interface ProductFormData {
  p_Name: string;
  p_images: string[];
  category_id: string;
  artist_name: string;
  price: number;
  discount: number;
  review_id: string;
  sell_count: number;
  description: string;
  specification: string;
}

type DrawerMode = "add" | "edit" | "view";

const ProductDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      p_Name: "Spiritual Wall Art",
      p_images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
        "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400"
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
      p_images: [
        "https://images.unsplash.com/photo-1604608672516-f1b7919aa817?w=400",
        "https://images.unsplash.com/photo-1635776062043-223faf322554?w=400",
        "https://images.unsplash.com/photo-1608896838107-90d2baf1e4e9?w=400"
      ],
      category_id: "rangoli",
      artist_name: "Priya Sharma",
      price: 899,
      discount: 20,
      review_id: "4.2",
      sell_count: 89,
      description: "Complete rangoli stencil set for festivals",
      specification: "Plastic stencils, 12 designs, Reusable",
    },
    {
      id: "3",
      p_Name: "Handcrafted Resin Ganesha",
      p_images: [
        "https://images.unsplash.com/photo-1583241800698-9c8652dcbdcf?w=400",
        "https://images.unsplash.com/photo-1595050006260-9b7a93bc2dd0?w=400",
        "https://images.unsplash.com/photo-1514496959998-c01c40915c5e?w=400"
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
      p_Name: "Shubh Labh Door Hanging",
      p_images: [
        "https://images.unsplash.com/photo-1593184066642-6df72e8fd7a9?w=400",
        "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400",
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400"
      ],
      category_id: "shubh_labh",
      artist_name: "Meera Agarwal",
      price: 599,
      discount: 25,
      review_id: "4.3",
      sell_count: 67,
      description: "Traditional Shubh Labh door hanging for prosperity",
      specification: "Fabric and beads, Handmade, 12 inches",
    },
    {
      id: "5",
      p_Name: "Table Lamp with Shade",
      p_images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
        "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
      ],
      category_id: "lapdesk",
      artist_name: "Vikash Singh",
      price: 1299,
      discount: 0,
      review_id: "4.8",
      sell_count: 445,
      description: "Elegant table lamp perfect for study desk",
      specification: "LED bulb included, Adjustable height, Modern design",
    },
    {
      id: "6",
      p_Name: "Brass Diya Set",
      p_images: [
        "https://images.unsplash.com/photo-1604846592298-3df2ee5abfe1?w=400",
        "https://images.unsplash.com/photo-1574936754519-6e8d87b27b30?w=400",
        "https://images.unsplash.com/photo-1604608672516-f1b7919aa817?w=400"
      ],
      category_id: "diya_thali",
      artist_name: "Sunita Devi",
      price: 799,
      discount: 15,
      review_id: "4.6",
      sell_count: 178,
      description: "Traditional brass diya and thali set for festivals",
      specification: "Pure brass, Set of 5 diyas with thali, Handcrafted",
    },
    {
      id: "7",
      p_Name: "Home Decor Wall Hanging",
      p_images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400"
      ],
      category_id: "decor",
      artist_name: "Rohit Jain",
      price: 1599,
      discount: 20,
      review_id: "4.4",
      sell_count: 89,
      description: "Modern wall hanging for home decoration",
      specification: "Metal and wood, Contemporary design, Easy to hang",
    },
    {
      id: "8",
      p_Name: "Handmade Gift Box Set",
      p_images: [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"
      ],
      category_id: "gift",
      artist_name: "Kavita Rani",
      price: 1199,
      discount: 30,
      review_id: "4.5",
      sell_count: 156,
      description: "Beautiful handmade gift box set for special occasions",
      specification: "Decorative paper, Set of 3 boxes, Ribbon included",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedArtist, setSelectedArtist] = useState<string>("all");
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("add");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string[]>(["", "", ""]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [formData, setFormData] = useState<ProductFormData>({
    p_Name: "",
    p_images: ["", "", ""],
    category_id: "",
    artist_name: "",
    price: 0,
    discount: 0,
    review_id: "0",
    sell_count: 0,
    description: "",
    specification: "",
  });

  const categories: string[] = [
    "all",
    "rangoli",
    "spiritual",
    "resin",
    "shubh_labh",
    "lapdesk",
    "diya_thali",
    "decor",
    "gift",
  ];

  const artists: string[] = [
    "Rajesh Kumar",
    "Priya Sharma", 
    "Amit Patel",
    "Meera Agarwal",
    "Vikash Singh",
    "Sunita Devi",
    "Rohit Jain",
    "Kavita Rani",
    "Neha Gupta",
    "Arjun Singh"
  ];

  const getUniqueArtists = (): string[] => {
    const uniqueArtists = Array.from(new Set(products.map(p => p.artist_name)));
    return ["all", ...uniqueArtists];
  };

  const filteredProducts: Product[] = products.filter((product: Product) => {
    const matchesSearch: boolean =
      product.p_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory: boolean =
      selectedCategory === "all" || product.category_id === selectedCategory;
    const matchesArtist: boolean =
      selectedArtist === "all" || product.artist_name === selectedArtist;
    return matchesSearch && matchesCategory && matchesArtist;
  });

  const openDrawer = (mode: DrawerMode, product?: Product): void => {
    setDrawerMode(mode);
    setSelectedProduct(product || null);
    setShowDropdown(null);
    setCurrentImageIndex(0);

    if (product) {
      setFormData({ ...product });
      setImagePreview([
        product.p_images[0] || "",
        product.p_images[1] || "",
        product.p_images[2] || ""
      ]);
    } else {
      setFormData({
        p_Name: "",
        p_images: ["", "", ""],
        category_id: "",
        artist_name: "",
        price: 0,
        discount: 0,
        review_id: "0",
        sell_count: 0,
        description: "",
        specification: "",
      });
      setImagePreview(["", "", ""]);
    }
    setShowDrawer(true);
  };

  const closeDrawer = (): void => {
    setShowDrawer(false);
    setTimeout(() => {
      setSelectedProduct(null);
      setImagePreview(["", "", ""]);
      setCurrentImageIndex(0);
      setFormData({
        p_Name: "",
        p_images: ["", "", ""],
        category_id: "",
        artist_name: "",
        price: 0,
        discount: 0,
        review_id: "0",
        sell_count: 0,
        description: "",
        specification: "",
      });
    }, 300);
  };

  const handleSave = (): void => {
    const validImages = imagePreview.filter(img => img.trim() !== "");
    const finalImages = validImages.length > 0 ? validImages : ["https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"];

    if (drawerMode === "add") {
      const newProduct: Product = {
        ...formData,
        id: Date.now().toString(),
        p_images: finalImages,
      };
      setProducts([...products, newProduct]);
    } else if (drawerMode === "edit" && selectedProduct) {
      setProducts(
        products.map((p: Product) =>
          p.id === selectedProduct.id
            ? {
                ...formData,
                id: selectedProduct.id,
                p_images: finalImages,
              }
            : p
        )
      );
    }
    closeDrawer();
  };

  const handleDelete = (id: string): void => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p: Product) => p.id !== id));
      setShowDropdown(null);
    }
  };

  const toggleTrending = (id: string): void => {
    setProducts(
      products.map((p: Product) =>
        p.id === id ? { ...p, isTrending: !p.isTrending } : p
      )
    );
    setShowDropdown(null);
  };

  const calculateDiscountedPrice = (
    price: number,
    discount: number
  ): number => {
    return Math.round(price - (price * discount) / 100);
  };

  const handleInputChange = (
    field: keyof ProductFormData,
    value: string | number
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImagePreview = [...imagePreview];
        newImagePreview[index] = reader.result as string;
        setImagePreview(newImagePreview);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (url: string, index: number): void => {
    const newImagePreview = [...imagePreview];
    newImagePreview[index] = url;
    setImagePreview(newImagePreview);
  };

  const removeImage = (index: number): void => {
    const newImagePreview = [...imagePreview];
    newImagePreview[index] = "";
    setImagePreview(newImagePreview);
  };

  const nextImage = (): void => {
    const validImages = (selectedProduct?.p_images || []).filter(img => img);
    if (validImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }
  };

  const prevImage = (): void => {
    const validImages = (selectedProduct?.p_images || []).filter(img => img);
    if (validImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchTerm(e.target.value)
                    }
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
                    value={selectedCategory}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSelectedCategory(e.target.value)
                    }
                  >
                    {categories.map((cat: string) => (
                      <option key={cat} value={cat}>
                        {cat === "all"
                          ? "All Categories"
                          : cat === "shubh_labh"
                          ? "Shubh Labh"
                          : cat === "diya_thali"
                          ? "Diya & Thali"
                          : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
                    value={selectedArtist}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSelectedArtist(e.target.value)
                    }
                  >
                    {getUniqueArtists().map((artist: string) => (
                      <option key={artist} value={artist}>
                        {artist === "all" ? "All Artists" : artist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => openDrawer("add")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors duration-150 w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>

          {/* Backdrop for dropdown */}
          {showDropdown && (
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(null)}
            />
          )}

          {/* Products Grid - Compact Cards */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  {filteredProducts.map((product: Product) => (
    <div
      key={product.id}
      className="bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 group h-[300px] flex flex-col"
      data-product-id={product.id}
    >
      <div className="relative">
        <img
          src={
            product.p_images[0] ||
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"
          }
          alt={product.p_Name}
          className="w-full h-40 object-cover rounded-t-md"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-medium">
            -{product.discount}%
          </div>
        )}
        {product.isTrending && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded flex items-center gap-1 text-xs font-medium">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )}

        {/* Three Dot Menu */}
        <div className="absolute top-2 right-2 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(
                showDropdown === product.id ? null : product.id
              );
            }}
            className="bg-white hover:bg-gray-50 text-gray-700 p-1.5 rounded-full shadow-md transition-all duration-150 hover:shadow-lg"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 h-10">
            {product.p_Name}
          </h3>
          <p className="text-xs text-gray-600 mb-2">
            by {product.artist_name}
          </p>

          {/* ⭐ Rating Stars */}
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < Number(product.review_id)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-xs text-gray-500">
              ({product.review_id})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-base font-bold text-gray-900">
            ₹
            {calculateDiscountedPrice(
              product.price,
              product.discount
            ).toLocaleString()}
          </span>
          {product.discount > 0 && (
            <span className="text-xs text-gray-500 line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {showDropdown === product.id && (
        <div
          className="fixed z-50 w-52 bg-white rounded-lg shadow-2xl border border-gray-200 py-2"
          style={{
            top: `${
              (
                document.querySelector(
                  `[data-product-id="${product.id}"]`
                ) as HTMLElement
              )?.getBoundingClientRect().top || 0
            }px`,
            left: `${
              ((
                document.querySelector(
                  `[data-product-id="${product.id}"]`
                ) as HTMLElement
              )?.getBoundingClientRect().right || 0) - 208
            }px`,
          }}
          onClick={(e) => e.stopPropagation()}
          data-dropdown-id={product.id}
        >
          <button
            onClick={() => openDrawer("view", product)}
            className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center gap-3 text-sm text-gray-700 transition-colors"
          >
            <Eye className="w-4 h-4 text-blue-600" />
            <span>View Details</span>
          </button>
          <button
            onClick={() => openDrawer("edit", product)}
            className="w-full text-left px-4 py-2.5 hover:bg-green-50 flex items-center gap-3 text-sm text-gray-700 transition-colors"
          >
            <Edit className="w-4 h-4 text-green-600" />
            <span>Edit Product</span>
          </button>
          <button
            onClick={() => toggleTrending(product.id)}
            className="w-full text-left px-4 py-2.5 hover:bg-orange-50 flex items-center gap-3 text-sm text-gray-700 transition-colors"
          >
            <TrendingUp className="w-4 h-4 text-orange-600" />
            <span>
              {product.isTrending
                ? "Remove from Trending"
                : "Add to Trending"}
            </span>
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={() => handleDelete(product.id)}
            className="w-full text-left px-4 py-2.5 hover:bg-red-50 flex items-center gap-3 text-sm text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Product</span>
          </button>
        </div>
      )}
    </div>
  ))}
</div>


          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

      {/* Backdrop with Blur Effect */}
      {showDrawer && (
        <div
          className="fixed inset-0 backdrop-blur-sm  bg-opacity-20 transition-all duration-300 ease-in-out z-40"
          onClick={closeDrawer}
        />
      )}

      {/* Right Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] lg:w-[560px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-gray-900">
              {drawerMode === "add"
                ? "Add New Product"
                : drawerMode === "edit"
                ? "Edit Product"
                : "Product Details"}
            </h2>
            <button
              onClick={closeDrawer}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {drawerMode === "view" ? (
              <div className="space-y-6">
                <div className="relative">
                  {(() => {
                    const validImages = (selectedProduct?.p_images || []).filter(img => img);
                    const currentImage = validImages[currentImageIndex] || validImages[0];
                    
                    return (
                      <>
                        <img
                          src={currentImage || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"}
                          alt={selectedProduct?.p_Name}
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
                      </>
                    );
                  })()}
                </div>

                {/* Thumbnail images */}
                <div className="flex gap-2">
                  {(selectedProduct?.p_images || []).filter(img => img).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`${selectedProduct?.p_Name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <p className="text-gray-900 mt-1 font-medium">
                      {selectedProduct?.p_Name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Artist Name
                    </label>
                    <p className="text-gray-900 mt-1 font-medium">
                      {selectedProduct?.artist_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <p className="text-gray-900 mt-1 capitalize">
                      {selectedProduct?.category_id?.replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Original Price
                    </label>
                    <p className="text-gray-900 mt-1 font-semibold">
                      ₹{selectedProduct?.price.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Discount
                    </label>
                    <p className="text-gray-900 mt-1">
                      {selectedProduct?.discount}%
                      {(selectedProduct?.discount ?? 0) > 0 && (
                        <span className="text-sm text-green-600 block">
                          Save ₹{((selectedProduct?.price || 0) - calculateDiscountedPrice(selectedProduct?.price || 0, selectedProduct?.discount ?? 0)).toLocaleString()}
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Final Price
                    </label>
                    <p className="text-gray-900 mt-1 font-bold text-lg text-green-600">
                      ₹{calculateDiscountedPrice(selectedProduct?.price || 0, selectedProduct?.discount || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-900 font-medium">
                        {selectedProduct?.review_id}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Sold
                    </label>
                    <p className="text-gray-900 mt-1 font-medium">
                      {selectedProduct?.sell_count} units
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <p className="text-gray-900 mt-1 leading-relaxed">
                    {selectedProduct?.description}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Specifications
                  </label>
                  <p className="text-gray-900 mt-1 leading-relaxed">
                    {selectedProduct?.specification}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <p className="text-gray-900 mt-1">
                    {selectedProduct?.isTrending ? (
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
            ) : (
              <div className="space-y-6">
                {/* Multi Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Product Images (Up to 3 images) *
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="space-y-2">
                        <p className="text-xs text-gray-600 text-center">
                          Image {index + 1} {index === 0 ? "(Main/Thumbnail)" : "(Optional)"}
                        </p>
                        
                        {imagePreview[index] ? (
                          <div className="relative w-full h-32">
                            <img
                              src={imagePreview[index]}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-full h-32 bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                            <ImagePlus className="w-8 h-8 text-gray-400 mb-1" />
                            <p className="text-xs text-gray-500">No image</p>
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          <label className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1 cursor-pointer transition-colors">
                            <ImagePlus className="w-3 h-3" />
                            Choose
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageSelect(e, index)}
                              className="hidden"
                            />
                          </label>
                          
                          <input
                            type="url"
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            value={imagePreview[index]}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              handleImageUrlChange(e.target.value, index)
                            }
                            placeholder="Or paste URL"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.p_Name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("p_Name", e.target.value)
                      }
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Artist Name *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.artist_name}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleInputChange("artist_name", e.target.value)
                      }
                      required
                    >
                      <option value="">Select artist</option>
                      {artists.map((artist: string) => (
                        <option key={artist} value={artist}>
                          {artist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.category_id}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleInputChange("category_id", e.target.value)
                      }
                      required
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map((cat: string) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() +
                            cat.slice(1).replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price *
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.price}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("price", Number(e.target.value))
                      }
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Percentage
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.discount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("discount", Math.min(100, Math.max(0, Number(e.target.value))))
                        }
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        %
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Final Price (Auto-calculated)
                    </label>
                    <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium">
                      ₹{formData.price > 0 ? calculateDiscountedPrice(formData.price, formData.discount).toLocaleString() : 0}
                      {formData.discount > 0 && formData.price > 0 && (
                        <span className="text-sm text-green-600 ml-2">
                          (Save ₹{(formData.price - calculateDiscountedPrice(formData.price, formData.discount)).toLocaleString()})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Enter product description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specifications
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    value={formData.specification}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleInputChange("specification", e.target.value)
                    }
                    placeholder="Enter product specifications"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {drawerMode !== "view" && (
            <div className="flex gap-3 p-6 border-t border-gray-200 bg-white">
              <button
                onClick={closeDrawer}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-150"
                disabled={
                  !formData.p_Name ||
                  !formData.category_id ||
                  !formData.artist_name ||
                  !formData.description
                }
              >
                <Save className="w-4 h-4" />
                {drawerMode === "add" ? "Add Product" : "Update Product"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;