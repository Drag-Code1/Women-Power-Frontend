// Drawer.tsx
import React from 'react';
import { X, Save } from 'lucide-react';
import { Product, ProductFormData, DrawerMode } from '@/app/types/types';
import DrawerView from './DrawerView';
import DrawerForm from './DrawerForm';

interface DrawerProps {
  showDrawer: boolean;
  drawerMode: DrawerMode;
  selectedProduct: Product | null;
  formData: ProductFormData;
  imagePreview: string[];
  currentImageIndex: number;
  categories: string[];
  artists: string[];
  onClose: () => void;
  onSave: () => void;
  onInputChange: (field: keyof ProductFormData, value: string | number) => void;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onImageUrlChange: (url: string, index: number) => void;
  onRemoveImage: (index: number) => void;
  setCurrentImageIndex: (index: number) => void;
}

const Drawer: React.FC<DrawerProps> = ({
  showDrawer,
  drawerMode,
  selectedProduct,
  formData,
  imagePreview,
  currentImageIndex,
  categories,
  artists,
  onClose,
  onSave,
  onInputChange,
  onImageSelect,
  onImageUrlChange,
  onRemoveImage,
  setCurrentImageIndex,
}) => {
  const isFormValid = formData.p_Name && formData.category_id && formData.artist_name && formData.description;

  return (
    <>
      {/* Backdrop */}
      {showDrawer && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-opacity-20 transition-all duration-300 ease-in-out z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] lg:w-[560px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-gray-900">
              {drawerMode === "add"
                ? "Add New Product"
                : drawerMode === "edit"
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
            {drawerMode === "view" && selectedProduct ? (
              <DrawerView
                product={selectedProduct}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
              />
            ) : (
              <DrawerForm
                formData={formData}
                imagePreview={imagePreview}
                categories={categories}
                artists={artists}
                onInputChange={onInputChange}
                onImageSelect={onImageSelect}
                onImageUrlChange={onImageUrlChange}
                onRemoveImage={onRemoveImage}
              />
            )}
          </div>

          {/* Footer */}
          {drawerMode !== "view" && (
            <div className="flex gap-3 p-6 border-t border-gray-200 bg-white">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormValid}
              >
                <Save className="w-4 h-4" />
                {drawerMode === "add" ? "Add Product" : "Update Product"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Drawer;