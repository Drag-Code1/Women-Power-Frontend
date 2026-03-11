// components/admin/BannerModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Home } from 'lucide-react';
import { Banner, BannerTypeConfig } from "@/app/types/dashboard-banner-tab";

interface Props {
  mode: 'add' | 'edit' | 'preview';
  banner: Banner | null;
  config: BannerTypeConfig;
  onClose: () => void;
  onCreate: (data: { img_url: string; file?: File }) => Promise<void>;
  onUpdate: (data: { img_url: string; file?: File }) => Promise<void>;
  isLoading: boolean;
}

import R2Image from "@/app/component/common/R2Image";

// ...

export default function BannerModal({
  mode,
  banner,
  config,
  onClose,
  onCreate,
  onUpdate,
  isLoading
}: Props) {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);



  useEffect(() => {
    if (banner) {
      setImagePreview(banner.img_url);
      setImgUrl(banner.img_url); // Keep original relative URL if editing without changing image
      setSelectedFile(undefined);
    } else {
      setImagePreview('');
      setImgUrl('');
      setSelectedFile(undefined);
    }
  }, [banner]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImgUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imgUrl) {
      alert('Please select an image');
      return;
    }

    const data = {
      img_url: imgUrl,
      file: selectedFile
    };

    if (mode === 'edit') {
      await onUpdate(data);
    } else {
      await onCreate(data);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>

      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-end z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        <div className="bg-white h-full w-full max-w-2xl overflow-y-auto shadow-2xl animate-slideIn">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {mode === 'preview'
                  ? 'Banner Preview'
                  : mode === 'edit'
                    ? 'Edit Banner'
                    : 'Add New Banner'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          {mode === 'preview' ? (
            // Preview Mode
            <div className="p-6">
              <R2Image
                src={banner?.img_url}
                alt="Banner Preview"
                className="w-full rounded-lg"
                fallbackSrc="https://via.placeholder.com/1200x400?text=Image+Not+Found"
              />
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium text-gray-900">{config.label}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium text-gray-900">
                    {banner && new Date(banner.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Add/Edit Mode
            <div className="p-6 space-y-6">
              {/* Banner Type Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Type
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{config.label}</p>
                      <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image *
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <R2Image
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                        <Upload className="w-5 h-5" />
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                          disabled={isLoading}
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <div className="space-y-3">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-gray-600 font-medium">Click to upload image</p>
                          <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                          <p className="text-xs text-gray-400 mt-1">Recommended: {config.recommended}</p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        disabled={isLoading}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !imgUrl}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : mode === 'edit' ? 'Update Banner' : 'Add Banner'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}