// DrawerForm.tsx
import React from 'react';
import { ImagePlus, X } from 'lucide-react';
import { ProductFormData } from '@/app/types/types';
import { calculateDiscountedPrice } from './utils';

interface DrawerFormProps {
  formData: ProductFormData;
  imagePreview: string[];
  categories: string[];
  artists: string[];
  onInputChange: (field: keyof ProductFormData, value: string | number) => void;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onImageUrlChange: (url: string, index: number) => void;
  onRemoveImage: (index: number) => void;
}

const DrawerForm: React.FC<DrawerFormProps> = ({
  formData,
  imagePreview,
  categories,
  artists,
  onInputChange,
  onImageSelect,
  onImageUrlChange,
  onRemoveImage,
}) => {
  return (
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
            value={formData.artist_name}
            onChange={(e) => onInputChange("artist_name", e.target.value)}
            required
          >
            <option value="">Select artist</option>
            {artists.map((artist) => (
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
            onChange={(e) => onInputChange("category_id", e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.slice(1).map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace("_", " ")}
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
                onInputChange("discount", Math.min(100, Math.max(0, Number(e.target.value))))
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
          onChange={(e) => onInputChange("description", e.target.value)}
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
          onChange={(e) => onInputChange("specification", e.target.value)}
          placeholder="Enter product specifications"
        />
      </div>
    </div>
  );
};

export default DrawerForm;