"use client";

import React, { useState } from "react";
import ArtistCard from "../component/artist/ArtistCard";
import Filters from "../component/artist/Filter";
import { artistsData } from "../data/artistsData";

const sortOptions = ["Popular", "Highest Rated", "Lowest Rated", "Name A-Z", "Name Z-A"];

const ITEMS_PER_PAGE = 6;

const ArtistsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories from artistsData
  const categories = Array.from(new Set(artistsData.map((artist) => artist.category)));

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearch("");
    setCurrentPage(1);
  };

  // Filter
  let filteredArtists = artistsData.filter((artist) => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(artist.category);
    const matchSearch = artist.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Sort
  if (sortBy === "Highest Rated") {
    filteredArtists = [...filteredArtists].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "Lowest Rated") {
    filteredArtists = [...filteredArtists].sort((a, b) => a.rating - b.rating);
  } else if (sortBy === "Name A-Z") {
    filteredArtists = [...filteredArtists].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortBy === "Name Z-A") {
    filteredArtists = [...filteredArtists].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredArtists.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArtists = filteredArtists.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Artists</h1>

      {/* Top Search + Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search artists..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 p-2 border rounded-md"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-md p-2 text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              Sort by {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <Filters
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          clearFilters={clearAllFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        {/* Artists Grid */}
        <main className="flex-1">
          <p className="text-gray-600 text-sm mb-4">
            Showing {filteredArtists.length} artists
          </p>

          {paginatedArtists.length === 0 ? (
            <p className="text-gray-500">No artists found.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {paginatedArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm border rounded-md ${
                    currentPage === page
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default ArtistsPage;