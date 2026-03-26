'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import { EventCard } from './EventCard';
import { EventModal } from './EventModal';
import { useEventManager } from '@/app/hooks/useEventManager';
import type { Event, ModalMode } from '@/app/types/dashboardeventtab';

interface EventDashboardClientProps {
  initialEvents: Event[];
}

export const EventDashboardClient: React.FC<EventDashboardClientProps> = ({ initialEvents }) => {
  const {
    events,
    isModalOpen,
    modalMode,
    selectedEvent,
    activeDropdown,
    thumbnailPreview,
    bannerPreview,
    formData,
    setFormData,
    setThumbnailPreview,
    setBannerPreview,
    setActiveDropdown,
    openModal,
    closeModal,
    handleImageUpload,
    handleSubmit,
    handleDelete,
    categoryOptions,
    isSaving
  } = useEventManager(initialEvents) as any;

  return (
    <div className="min-h-screen bg-[#f2f3f5] p-4" onClick={() => setActiveDropdown(null)}>
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 bg-white shadow-md rounded-lg p-4 md:p-6">
  <h1 className="text-2xl md:text-3xl text-gray-800">Event Dashboard</h1>
  <button
    onClick={() => openModal('add')}
    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
  >
    <Plus size={20} />
    <span className="hidden sm:inline">Add Event</span>
  </button>
</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: any) => (
            <EventCard
              key={event.id}
              event={event}
              activeDropdown={activeDropdown}
              onToggleDropdown={(id) => setActiveDropdown(activeDropdown === id ? null : id)}
              onOpenModal={(mode, event) => openModal(mode, event)}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <EventModal
          isOpen={isModalOpen}
          mode={modalMode}
          selectedEvent={selectedEvent}
          formData={formData}
          setFormData={setFormData}
          thumbnailPreview={thumbnailPreview}
          setThumbnailPreview={setThumbnailPreview}
          bannerPreview={bannerPreview}
          setBannerPreview={setBannerPreview}
          onImageUpload={handleImageUpload}
          onSubmit={handleSubmit}
          isSaving={isSaving}
          onClose={closeModal}
          categoryOptions={categoryOptions}
        />
      </div>
    </div>
  );
};
