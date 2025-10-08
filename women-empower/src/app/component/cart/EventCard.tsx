'use client';
import React from 'react';
import { Calendar, Clock, Users, Star } from 'lucide-react';
import { Event } from '../../data/eventsData';

interface EventCardProps {
  event: Event;
  // formatDate: (date: string) => string;
  // getStatusColor: (status: string) => string;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
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
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 group flex flex-col">
  <div className="relative">
    <img 
      src={event.e_image} 
      alt={event.title}
      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
    />
    {event.discount && (
      <span className="absolute top-3 left-3 bg-[#fdc700] text-white px-2 py-1 rounded text-xs font-semibold">
        {event.discount}
      </span>
    )}
    <span className={`absolute bottom-3 left-3 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(event.status)}`}>
      {event.status.toUpperCase()}
    </span>
  </div>

  {/* content section flex-grow banani hai */}
  <div className="p-4 flex flex-col flex-grow">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-medium text-[#61503c] uppercase tracking-wide">{event.category}</span>
      <div className="flex items-center">
        <Star className="w-3 h-3 text-yellow-400 mr-1" />
        <span className="text-xs text-gray-500">{event.rating}</span>
      </div>
    </div>

    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-5">{event.title}</h3>
    <p className="text-gray-600 mb-3 text-xs line-clamp-2 leading-4">{event.description}</p>

    <div className="space-y-1 text-xs text-gray-500 mb-3">
      <div className="flex items-center">
        <Calendar className="w-3 h-3 mr-1.5" /> {formatDate(event.date)}
      </div>
      <div className="flex items-center">
        <Clock className="w-3 h-3 mr-1.5" /> {event.time}
      </div>
      <div className="flex items-center">
        <Users className="w-3 h-3 mr-1.5" /> {event.currentParticipants}/{event.maxParticipants} joined
      </div>
    </div>

    <div className="flex flex-wrap gap-1 mb-3">
      {event.tags.slice(0, 2).map((tag, i) => (
        <span key={i} className="inline-flex items-center px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded">
          {tag}
        </span>
      ))}
    </div>

    {/* 🔥 button ko bottom stick karne ke liye mt-auto */}
    <button
      className={`mt-auto w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors
        ${
          event.status === 'completed'
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : event.currentParticipants >= event.maxParticipants
            ? 'bg-red-50 text-red-600 cursor-not-allowed'
            : event.status === 'upcoming'
            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            : event.status === 'ongoing'
            ? 'bg-green-50 text-green-600 hover:bg-green-100'
            : 'bg-[#695946] text-white hover:bg-[#61503c]'
        }
      `}
      disabled={event.status === 'completed' || event.currentParticipants >= event.maxParticipants}
    >
      {event.status === 'completed'
        ? 'Event Completed'
        : event.currentParticipants >= event.maxParticipants
        ? 'Fully Booked'
        : event.status === 'upcoming'
        ? 'Join Upcoming'
        : event.status === 'ongoing'
        ? 'Join Now'
        : 'Join Event'}
    </button>
  </div>
</div>

  );
};

export default EventCard;
