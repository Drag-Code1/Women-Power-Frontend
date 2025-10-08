"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "../cart/EventCard";
import { Event } from "@/app/data/eventsData";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const MemoizedEventCard = React.memo(EventCard);

interface EventsProps {
  eventArr: Event[];
}

export const EventContainer: React.FC<EventsProps> = ({ eventArr }) => {
  const searchParams = useSearchParams();
  const eventCategory = searchParams.get("event-category") || "All";
  const eventType = searchParams.get("event-type") || "All";
  const eventStatus = searchParams.get("event-status") || "All";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /** 🔹 Filter Logic */
  const filteredEvents = useMemo(() => {
    return eventArr
      .filter((event) => {
        if (eventCategory === "All") return true;
        return event.category === eventCategory;
      })
      .filter((event) => {
        if (eventType === "All") return true;
        return event.type === eventType;
      })
      .filter((event) => {
        if (eventStatus === "All") return true;
        return event.status === eventStatus;
      });
  }, [eventCategory, eventType, eventStatus, eventArr]);

  /** 🔹 Pagination Logic */
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  /** 🔹 Pagination Handlers */
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const goToPrevPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  return (
    <div className="transition-opacity duration-200">
      {/* 🔹 Event Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentEvents.map((event) => (
          <div key={event.title} className="animate-fadeIn">
            <MemoizedEventCard event={event} />
          </div>
        ))}
      </div>

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <div className="text-sm text-gray-600">
            Showing page {currentPage} of {totalPages}
          </div>

          <div className="flex justify-center items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed opacity-50"
                  : "text-gray-700 hover:bg-gray-100 hover:scale-105"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex gap-1">
              <button
                className="px-3 py-2 rounded-md text-sm font-medium bg-[#61503c] text-white shadow-md"
                disabled
              >
                {currentPage}
              </button>
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed opacity-50"
                  : "text-gray-700 hover:bg-gray-100 hover:scale-105"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
