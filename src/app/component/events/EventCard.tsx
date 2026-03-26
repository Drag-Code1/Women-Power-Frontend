// app/events/EventCard.tsx
"use client";
import React from "react";
import { Calendar, Clock } from "lucide-react";
import R2Image from "../dashboard/dashboardallproductstab/R2Image";
import { DEFAULT_THUMBNAIL } from "@/app/data/dashboardproductdata";

interface Event {
  id: string;
  e_image: string;
  category_id: string;
  title: string;
  description: string;
  date_time: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  keywords: string;
  banner: string;
}

interface EventCardProps {
  event: Event;
  formatDate: (date: string) => string;
  formatTime: (date: string) => string;
  getStatusColor: (status: string) => string;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  formatDate, 
  formatTime, 
  getStatusColor 
}) => {
  const tags = event.keywords ? event.keywords.split(',').slice(0, 2) : [];
  // Use banner if exists and not empty, otherwise use e_image
  const cardImage = event.banner && event.banner.trim() !== "" ? event.banner : event.e_image;
  
  // WhatsApp redirect handler
  const handleJoinEvent = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if you add card-level click later
    if (event.status !== 'completed') {
      const whatsappGroupUrl = "https://chat.whatsapp.com/FWVKMPyz3QuKBcbv3jnmOm";
      window.open(whatsappGroupUrl, '_blank');
    }
  };

  // Optional: Make entire card clickable
  const handleCardClick = () => {
    if (event.status !== 'completed') {
      const whatsappGroupUrl = "https://chat.whatsapp.com/FWVKMPyz3QuKBcbv3jnmOm";
      window.open(whatsappGroupUrl, '_blank');
    }
  };
  
  return (
    <div 
      onClick={handleCardClick}
      className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 group flex flex-col relative ${
        event.status !== 'completed' ? 'cursor-pointer' : ''
      }`}
    >
      <div className="relative">
        <R2Image 
          src={cardImage} 
          fallbackSrc={DEFAULT_THUMBNAIL}
          alt={event.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute bottom-3 left-3 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(event.status)}`}>
          {event.status.toUpperCase()}
        </span>

        {/* WhatsApp Indicator - Only show for active events */}
        {event.status !== 'completed' && (
          <div className="absolute bottom-3 right-3 bg-green-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
            <svg 
              className="w-4 h-4 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-5">{event.title}</h3>
        <p className="text-gray-600 mb-3 text-xs line-clamp-2 leading-4">{event.description}</p>

        <div className="space-y-1 text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1.5" /> {formatDate(event.date_time)}
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1.5" /> {formatTime(event.date_time)}
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, i) => (
              <span key={i} className="inline-flex items-center px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded">
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={handleJoinEvent}
          className={`mt-auto w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2
            ${
              event.status === 'completed'
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : event.status === 'upcoming'
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                : event.status === 'ongoing'
                ? 'bg-green-50 text-green-600 hover:bg-green-100'
                : 'bg-[#695946] text-white hover:bg-[#61503c]'
            }
          `}
          disabled={event.status === 'completed'}
        >
          {event.status !== 'completed' && (
            <svg 
              className="w-4 h-4" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          )}
          {event.status === 'completed'
            ? 'Event Completed'
            : event.status === 'upcoming'
            ? 'Join via WhatsApp'
            : event.status === 'ongoing'
            ? 'Join Now via WhatsApp'
            : 'Join Event'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
