'use client';
import React from 'react';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  categories: string[];
  types: string[];
  statuses: string[];
}

const EventFilters: React.FC<FiltersProps> = ({
  searchTerm, setSearchTerm,
  selectedCategory, setSelectedCategory,
  selectedType, setSelectedType,
  selectedStatus, setSelectedStatus,
  categories, types, statuses
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 border rounded-lg">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="px-4 py-2 border rounded-lg">
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-4 py-2 border rounded-lg">
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );
};

export default EventFilters;
