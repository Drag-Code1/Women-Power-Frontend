"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ImagePlus,
  Plus,
} from "lucide-react";
import {
  Product,
  ProductFormData,
  DrawerMode,
} from "@/app/types/dashboard-product";
import {
  CATEGORIES,
  ARTISTS,
  DEFAULT_PRODUCT_IMAGE,
  CATEGORY_LABELS,
} from "@/app/data/dashboard-productdata";
import {
  calculateDiscountedPrice,
  readFileAsDataURL,
} from "@/app/lib/utils/dashboardproduct-utils";

interface ProductDrawerProps {
  isOpen: boolean;
  mode: DrawerMode;
  product: Product | null;
  onClose: () => void;
  onSave: (formData: ProductFormData) => Promise<void>;
  loading: boolean;
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({
  isOpen,
  mode,
  product,
  onClose,
  onSave,
  loading,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    p_Name: "",
    thumbnail: "",
    p_images: ["", ""],
    category_id: "",
    artist_id: "",
    price: 0,
    discount: 0,
    description: "",
    specification: [""],
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string[]>(["", ""]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (product && isOpen) {
      setFormData({ ...product });
      setThumbnailPreview(product.thumbnail || "");
      setImagePreview([
        product?.p_images?.[0] || "",
        product?.p_images?.[1] || "",
      ]);
    } else if (!isOpen) {
      // Reset form when drawer closes
      setFormData({
        p_Name: "",
        thumbnail: "",
        p_images: ["", ""],
        category_id: "",
        artist_id: "",
        price: 0,
        discount: 0,
        description: "",
        specification: [""],
      });
      setThumbnailPreview("");
      setImagePreview(["", ""]);
      setCurrentImageIndex(0);
    }
  }, [product, isOpen]);

  const getAllImages = (): string[] => {
    if (!product) return [];
    return [product.thumbnail, ...(product.p_images || [])].filter(
      (img) => img
    );
  };

  const nextImage = (): void => {
    const allImages = getAllImages();
    if (allImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = (): void => {
    const allImages = getAllImages();
    if (allImages.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + allImages.length) % allImages.length
      );
    }
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

  const handleThumbnailSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataURL(file);
      setThumbnailPreview(dataUrl);
    }
  };

  const handleImageSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataURL(file);
      const newImagePreview = [...imagePreview];
      newImagePreview[index] = dataUrl;
      setImagePreview(newImagePreview);
    }
  };

  const handleThumbnailUrlChange = (url: string): void => {
    setThumbnailPreview(url);
  };

  const handleImageUrlChange = (url: string, index: number): void => {
    const newImagePreview = [...imagePreview];
    newImagePreview[index] = url;
    setImagePreview(newImagePreview);
  };

  const removeThumbnail = (): void => {
    setThumbnailPreview("");
  };

  const removeImage = (index: number): void => {
    const newImagePreview = [...imagePreview];
    newImagePreview[index] = "";
    setImagePreview(newImagePreview);
  };

  const handleSpecificationChange = (index: number, value: string): void => {
    const newSpecs = [...formData.specification];
    newSpecs[index] = value;
    setFormData((prev) => ({
      ...prev,
      specification: newSpecs,
    }));
  };

  const addSpecification = (): void => {
    setFormData((prev) => ({
      ...prev,
      specification: [...prev.specification, ""],
    }));
  };

  const removeSpecification = (index: number): void => {
    if (formData.specification.length > 1) {
      const newSpecs = formData.specification.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        specification: newSpecs,
      }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const finalThumbnail =
      thumbnailPreview.trim() !== "" ? thumbnailPreview : DEFAULT_PRODUCT_IMAGE;
    const validImages = imagePreview.filter((img) => img.trim() !== "");
    const validSpecs = formData.specification.filter(
      (spec) => spec.trim() !== ""
    );

    const finalFormData: ProductFormData = {
      ...formData,
      thumbnail: finalThumbnail,
      p_images: validImages,
      specification: validSpecs.length > 0 ? validSpecs : [""],
    };

    await onSave(finalFormData);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[480px] lg:w-[560px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === "add"
              ? "Add New Product"
              : mode === "edit"
              ? "Edit Product"
              : "Product Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {mode === "view" ? (
            <ViewMode
              product={product}
              currentImageIndex={currentImageIndex}
              onNextImage={nextImage}
              onPrevImage={prevImage}
              onImageSelect={setCurrentImageIndex}
              getAllImages={getAllImages}
            />
          ) : (
            <EditMode
              formData={formData}
              thumbnailPreview={thumbnailPreview}
              imagePreview={imagePreview}
              onInputChange={handleInputChange}
              onThumbnailSelect={handleThumbnailSelect}
              onImageSelect={handleImageSelect}
              onThumbnailUrlChange={handleThumbnailUrlChange}
              onImageUrlChange={handleImageUrlChange}
              onRemoveThumbnail={removeThumbnail}
              onRemoveImage={removeImage}
              onSpecificationChange={handleSpecificationChange}
              onAddSpecification={addSpecification}
              onRemoveSpecification={removeSpecification}
            />
          )}
        </div>

        {/* Footer */}
        {mode !== "view" && (
          <div className="flex gap-3 p-6 border-t border-gray-200 bg-white">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors duration-150 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                !formData.p_Name ||
                !formData.category_id ||
                !formData.artist_id ||
                !formData.description
              }
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {loading
                ? "Saving..."
                : mode === "add"
                ? "Add Product"
                : "Update Product"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// View Mode Component
interface ViewModeProps {
  product: Product | null;
  currentImageIndex: number;
  onNextImage: () => void;
  onPrevImage: () => void;
  onImageSelect: (index: number) => void;
  getAllImages: () => string[];
}

const ViewMode: React.FC<ViewModeProps> = ({
  product,
  currentImageIndex,
  onNextImage,
  onPrevImage,
  onImageSelect,
  getAllImages,
}) => {
  const allImages = getAllImages();
  const currentImage = allImages[currentImageIndex];

  return (
    <div className="space-y-6">
      <div className="relative">
        <img
          src={currentImage || DEFAULT_PRODUCT_IMAGE}
          alt={product?.p_Name}
          className="w-full h-64 object-cover rounded-lg"
        />
        {allImages.length > 1 && (
          <>
            <button
              onClick={onPrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-md transition-all duration-150"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-md transition-all duration-150"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {allImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {allImages.map((img, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
              currentImageIndex === index
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >
            <img
              src={img}
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Product Name
          </label>
          <p className="text-gray-900 mt-1 font-medium">{product?.p_Name}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Artist Name
          </label>
          <p className="text-gray-900 mt-1 font-medium">{product?.artist_id}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <p className="text-gray-900 mt-1 capitalize">
            {CATEGORY_LABELS[product?.category_id || ""] ||
              product?.category_id}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Original Price
          </label>
          <p className="text-gray-900 mt-1 font-semibold">
            ₹{product?.price.toLocaleString()}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Discount</label>
          <p className="text-gray-900 mt-1">
            {product?.discount}%
            {(product?.discount ?? 0) > 0 && (
              <span className="text-sm text-green-600 block">
                Save ₹
                {(
                  (product?.price || 0) -
                  calculateDiscountedPrice(
                    product?.price || 0,
                    product?.discount ?? 0
                  )
                ).toLocaleString()}
              </span>
            )}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Final Price
          </label>
          <p className="text-gray-900 mt-1 font-bold text-lg text-green-600">
            ₹
            {calculateDiscountedPrice(
              product?.price || 0,
              product?.discount || 0
            ).toLocaleString()}
          </p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <p className="text-gray-900 mt-1 leading-relaxed">
          {product?.description}
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Specifications
        </label>
        <ul className="space-y-1">
          {product?.specification?.map((spec, index) => (
            <li
              key={index}
              className="text-gray-900 leading-relaxed flex items-start gap-2"
            >
              <span className="text-blue-600 mt-1">•</span>
              {spec}
            </li>
          ))}

          <span className="text-blue-600 mt-1">•</span>
        </ul>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Status</label>
        <p className="text-gray-900 mt-1">
          {product?.isTrending ? (
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

// Edit Mode Component (continued in next part due to length)
interface EditModeProps {
  formData: ProductFormData;
  thumbnailPreview: string;
  imagePreview: string[];
  onInputChange: (field: keyof ProductFormData, value: string | number) => void;
  onThumbnailSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onThumbnailUrlChange: (url: string) => void;
  onImageUrlChange: (url: string, index: number) => void;
  onRemoveThumbnail: () => void;
  onRemoveImage: (index: number) => void;
  onSpecificationChange: (index: number, value: string) => void;
  onAddSpecification: () => void;
  onRemoveSpecification: (index: number) => void;
}

const EditMode: React.FC<EditModeProps> = ({
  formData,
  thumbnailPreview,
  imagePreview,
  onInputChange,
  onThumbnailSelect,
  onImageSelect,
  onThumbnailUrlChange,
  onImageUrlChange,
  onRemoveThumbnail,
  onRemoveImage,
  onSpecificationChange,
  onAddSpecification,
  onRemoveSpecification,
}) => {
  return (
    <div className="space-y-6">
      {/* Thumbnail Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Product Thumbnail (Main Image) *
        </label>
        <div className="space-y-2">
          <p className="text-xs text-gray-600">
            This image will be shown as the main product image
          </p>
          {thumbnailPreview ? (
            <div className="relative w-full h-48">
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={onRemoveThumbnail}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
              <ImagePlus className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No thumbnail image</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <ImagePlus className="w-4 h-4" />
              Choose Thumbnail Image
              <input
                type="file"
                accept="image/*"
                onChange={onThumbnailSelect}
                className="hidden"
              />
            </label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={thumbnailPreview}
              onChange={(e) => onThumbnailUrlChange(e.target.value)}
              placeholder="Or paste image URL"
            />
          </div>
        </div>
      </div>

      {/* Additional Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Additional Product Images (Optional - Up to 2 images)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1].map((index) => (
            <div key={index} className="space-y-2">
              <p className="text-xs text-gray-600 text-center">
                Additional Image {index + 1}
              </p>
              {imagePreview[index] ? (
                <div className="relative w-full h-32">
                  <img
                    src={imagePreview[index]}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => onRemoveImage(index)}
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
                    onChange={(e) => onImageSelect(e, index)}
                    className="hidden"
                  />
                </label>
                <input
                  type="url"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  value={imagePreview[index]}
                  onChange={(e) => onImageUrlChange(e.target.value, index)}
                  placeholder="Or paste URL"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Name and Artist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.p_Name}
            onChange={(e) => onInputChange("p_Name", e.target.value)}
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
            value={formData.artist_id}
            onChange={(e) => onInputChange("artist_id", e.target.value)}
            required
          >
            <option value="">Select artist</option>
            {ARTISTS.map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category and Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.category_id}
            onChange={(e) => onInputChange("category_id", e.target.value)}
            required
          >
            <option value="">Select category</option>
            {CATEGORIES.slice(1).map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat] || cat}
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
            onChange={(e) => onInputChange("price", Number(e.target.value))}
            placeholder="0"
            min="0"
          />
        </div>
      </div>

      {/* Discount and Final Price */}
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
              onChange={(e) =>
                onInputChange(
                  "discount",
                  Math.min(100, Math.max(0, Number(e.target.value)))
                )
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
            ₹
            {formData.price > 0
              ? calculateDiscountedPrice(
                  formData.price,
                  formData.discount
                ).toLocaleString()
              : 0}
            {formData.discount > 0 && formData.price > 0 && (
              <span className="text-sm text-green-600 ml-2">
                (Save ₹
                {(
                  formData.price -
                  calculateDiscountedPrice(formData.price, formData.discount)
                ).toLocaleString()}
                )
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          value={formData.description}
          onChange={(e) => onInputChange("description", e.target.value)}
          placeholder="Enter product description"
          required
        />
      </div>

      {/* Specifications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specifications
        </label>
        <div className="space-y-3">
          {formData.specification.map((spec, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={spec}
                onChange={(e) => onSpecificationChange(index, e.target.value)}
                placeholder={`Specification ${index + 1}`}
              />
              {formData.specification.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveSpecification(index)}
                  className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={onAddSpecification}
            className="w-full px-4 py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add More Specification
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDrawer;
