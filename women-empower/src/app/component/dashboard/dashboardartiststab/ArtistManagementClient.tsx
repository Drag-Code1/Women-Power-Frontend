// components/artist/ArtistManagementClient.tsx
'use client';
import { Plus } from 'lucide-react';
import { Artist } from '@/app/types/dashboard-artist-tab';
import { useArtistManager } from '@/app/hooks/useArtistManager';
import ArtistTable from './ArtistTable';
import ArtistModal from './ArtistModal';

interface ArtistManagementClientProps {
  initialArtists: Artist[];
}

export default function ArtistManagementClient({ initialArtists }: ArtistManagementClientProps) {
  const {
    artists,
    isModalOpen,
    modalType,
    selectedArtist,
    formData,
    imagePreview,
    openDropdownId,
    isFormValid,
    categoryOptions,
    openModal,
    closeModal,
    handleImageUpload,
    handleFormChange,
    handleSubmit,
    handleDelete,
    toggleDropdown
  } = useArtistManager(initialArtists);

  return (
    <div className="min-h-screen bg-[#f2f3f5] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-3xl text-gray-900">Artist Management</h1>
          <button
            onClick={() => openModal('create')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Artist</span>
          </button>
        </div>

        <ArtistTable
          artists={artists}
          onView={(artist) => openModal('view', artist)}
          onEdit={(artist) => openModal('edit', artist)}
          onDelete={handleDelete}
          openDropdownId={openDropdownId}
          onToggleDropdown={toggleDropdown}
        />

        <ArtistModal
          isOpen={isModalOpen}
          modalType={modalType}
          selectedArtist={selectedArtist}
          formData={formData}
          imagePreview={imagePreview}
          onClose={closeModal}
          onFormChange={handleFormChange}
          onImageUpload={handleImageUpload}
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          categoryOptions={categoryOptions}
        />
      </div>
    </div>
  );
}