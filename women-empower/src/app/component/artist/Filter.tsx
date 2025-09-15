"use client";
import React from "react";
import { SlidersHorizontal } from "lucide-react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface FiltersProps {
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  clearFilters: () => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  selectedCategories,
  toggleCategory,
  clearFilters,
  showFilters,
  setShowFilters,
}) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r border-gray-200 p-4">
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        {(selectedCategories.length > 0) && (
          <button
            onClick={clearFilters}
            className="mt-4 w-full py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Mobile Filters Button */}
      <button
        className="md:hidden flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md text-sm"
        onClick={() => setShowFilters(true)}
      >
        <SlidersHorizontal className="w-4 h-4" /> Filters
      </button>

      {/* Mobile Filters Modal */}
      <Dialog open={showFilters} onClose={() => setShowFilters(false)} fullWidth>
        <DialogTitle className="flex justify-between items-center">
          Filters
          <IconButton onClick={() => setShowFilters(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <h3 className="font-semibold mb-2">Categories</h3>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          {(selectedCategories.length > 0) && (
            <button
              onClick={clearFilters}
              className="mt-4 w-full py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition"
            >
              Clear All Filters
            </button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Filters;