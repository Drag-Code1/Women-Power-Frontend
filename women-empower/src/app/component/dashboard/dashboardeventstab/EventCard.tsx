'use client';
import React from 'react';
import { Calendar, Tag, Eye, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { getStatusColor, formatEventDateTime } from '@/app/lib/utils/dashboardevent-utils';
import type { Event, ModalMode } from '@/app/types/dashboardeventtab';

interface EventCardProps {
  event: Event;
  activeDropdown: string | null;
  onToggleDropdown: (id: string) => void;
  onOpenModal: (mode: ModalMode, event: Event) => void;
  onDelete: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  activeDropdown,
  onToggleDropdown,
  onOpenModal,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img src={event.thumbnail} alt={event.title} className="w-full h-48 object-cover" />
        <span className={`absolute top-3 left-3 ${getStatusColor(event.status)} text-white text-xs px-3 py-1 rounded-full capitalize`}>
          {event.status}
        </span>
        <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onToggleDropdown(event.id)}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <MoreVertical size={18} className="text-gray-700" />
          </button>
          {activeDropdown === event.id && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-10 overflow-hidden">
              <button
                onClick={() => onOpenModal('view', event)}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-blue-50 text-blue-600 transition-colors text-sm"
              >
                <Eye size={16} />
                View
              </button>
              <button
                onClick={() => onOpenModal('edit', event)}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-yellow-50 text-yellow-600 transition-colors text-sm"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors text-sm"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{event.title}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
          <Calendar size={16} />
          <span>{formatEventDateTime(event.dateTime)}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {event.keywords.slice(0, 3).map((keyword, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Tag size={12} />
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};