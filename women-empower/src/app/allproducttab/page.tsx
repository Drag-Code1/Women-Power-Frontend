"use client";
import React, { useState } from "react";
import { Package } from "lucide-react";
import { Product, ProductFormData, DrawerMode } from "@/app/types/types";
import { CATEGORIES, ARTISTS, INITIAL_PRODUCTS, DEFAULT_PRODUCT_IMAGE } from "@/app/data/constants";
import { filterProducts, getUniqueArtists } from "@/app/component/dashboard/allproducts/utils";
import SearchFilter from "@/app/component/dashboard/allproducts/SearchFilter";
import ProductCard from "../component/dashboard/allproducts/ProductCard";
import Drawer from "../component/dashboard/allproducts/Drawer";
import DashboardNavbar from "@/app/component/ui/utlity/DashboardNavbar";
import DashboardSidebar from "@/app/component/ui/utlity/DashboardSidebar";

const ProductDashboard: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userInfo = {
    name: "vishal lodhe",
    email: "lodhe.vishal@company.com",
    avatar: "",
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
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

  const filteredProducts = filterProducts(products, searchTerm, selectedCategory, selectedArtist);
  const uniqueArtists = getUniqueArtists(products);

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
    const finalImages = validImages.length > 0 ? validImages : [DEFAULT_PRODUCT_IMAGE];

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

  const handleInputChange = (field: keyof ProductFormData, value: string | number): void => {
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

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <DashboardNavbar
        userInfo={userInfo}
        onMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedArtist={selectedArtist}
          setSelectedArtist={setSelectedArtist}
          categories={CATEGORIES}
          uniqueArtists={uniqueArtists}
          onAddProduct={() => openDrawer("add")}
        />

        {/* Backdrop for dropdown */}
        {showDropdown && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(null)}
          />
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              onView={(p) => openDrawer("view", p)}
              onEdit={(p) => openDrawer("edit", p)}
              onDelete={handleDelete}
              onToggleTrending={toggleTrending}
            />
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

      <Drawer
        showDrawer={showDrawer}
        drawerMode={drawerMode}
        selectedProduct={selectedProduct}
        formData={formData}
        imagePreview={imagePreview}
        currentImageIndex={currentImageIndex}
        categories={CATEGORIES}
        artists={ARTISTS}
        onClose={closeDrawer}
        onSave={handleSave}
        onInputChange={handleInputChange}
        onImageSelect={handleImageSelect}
        onImageUrlChange={handleImageUrlChange}
        onRemoveImage={removeImage}
        setCurrentImageIndex={setCurrentImageIndex}
      />
        </main>
      </div>
    </div>
  );
};

export default ProductDashboard;