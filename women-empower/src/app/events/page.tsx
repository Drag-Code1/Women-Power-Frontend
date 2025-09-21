"use client";
import React, { useState, useMemo, useCallback } from "react";
import { eventsData } from "../data/eventsData";
import EventCard from "../component/cart/EventCard";
import EventFilters from "../component/product/EventFilters";
import FeaturedEventsSlider from "../component/product/FeaturedEventsSlider";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Memoize EventCard so it doesn’t re-render unnecessarily
const MemoizedEventCard = React.memo(EventCard);

const EventsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const eventsPerPage = 12;

  const categories = [
    "All",
    "Rangoli",
    "Spiritual",
    "Resin",
    "Shubh Labh",
    "Lapdesk",
    "Diya & Thali",
    "Decor",
    "Gift",
  ];
  const types = ["All", "festival", "workshop", "celebration", "craft-session"];
  const statuses = ["All", "upcoming", "ongoing", "completed"];

  // ✅ Filtered events (memoized)
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      const matchesType = selectedType === "All" || event.type === selectedType;
      const matchesStatus =
        selectedStatus === "All" || event.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedType, selectedStatus]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // ✅ Paginated events (memoized)
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    return filteredEvents.slice(startIndex, startIndex + eventsPerPage);
  }, [filteredEvents, currentPage]);

  // ✅ Smooth scroll + instant page change
  const goToPage = useCallback(
    (page: number) => {
      if (page === currentPage || isTransitioning || page < 1 || page > totalPages) return;
      setIsTransitioning(true);
      setCurrentPage(page);

      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setIsTransitioning(false), 400);
    },
    [currentPage, isTransitioning, totalPages]
  );

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  }, [currentPage, totalPages, goToPage]);

  const getPageNumbers = useCallback(() => {
    const maxVisible = 5;
    let pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "ongoing":
        return "bg-green-50 text-green-600 border-green-200";
      case "completed":
        return "bg-gray-50 text-gray-500 border-gray-200";
      default:
        return "bg-gray-50 text-gray-500 border-gray-200";
    }
  };

  const featuredEvents = eventsData.filter(
    (e) => e.featured && e.status !== "completed"
  );

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <section className="min-h-screen bg-white rounded-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* ✅ Featured Slider */}
          <FeaturedEventsSlider
            featuredEvents={featuredEvents}
            formatDate={formatDate}
          />

          {/* ✅ Filters */}
          <EventFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            categories={categories}
            types={types}
            statuses={statuses}
          />

          <h2 className="text-2xl font-bold mb-6">
            All Events & Workshops ({filteredEvents.length})
          </h2>

          {/* ✅ Fast rendering grid */}
          <div
            className={`transition-opacity duration-200 ${
              isTransitioning ? "opacity-50" : "opacity-100"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedEvents.map((event) => (
                <div key={event.id} className="animate-fadeIn">
                  <MemoizedEventCard
                    event={event}
                    formatDate={formatDate}
                    getStatusColor={getStatusColor}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * eventsPerPage + 1}-
                {Math.min(currentPage * eventsPerPage, filteredEvents.length)} of{" "}
                {filteredEvents.length} events
              </div>

              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1 || isTransitioning}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 1 || isTransitioning
                      ? "text-gray-400 cursor-not-allowed opacity-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex gap-1">
                  {getPageNumbers().map((page, i) =>
                    typeof page === "number" ? (
                      <button
                        key={i}
                        onClick={() => goToPage(page)}
                        disabled={isTransitioning}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          currentPage === page
                            ? "bg-[#61503c] text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100"
                        } ${
                          isTransitioning ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {page}
                      </button>
                    ) : (
                      <span key={i} className="px-2 text-gray-400">
                        …
                      </span>
                    )
                  )}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || isTransitioning}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === totalPages || isTransitioning
                      ? "text-gray-400 cursor-not-allowed opacity-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ✅ Simple fadeIn for fast render */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EventsSection;
