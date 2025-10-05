// hooks/useArtistManager.ts
'use client';
import { useState } from 'react';
import { Artist,ModalType, ArtistFormData  } from '../types/dashboard-artist-tab';
import { validateFormData, readFileAsDataURL  } from '../lib/utils/dashboardartist-utils';

const initialFormData: ArtistFormData = {
  artist_name: '',
  category: '',
  intro: '',
  joining_date: '',
  experience: '',
  artist_review_id: '',
  image: ''
};

export function useArtistManager(initialArtists: Artist[]) {
  const [artists, setArtists] = useState<Artist[]>(initialArtists);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('create');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [formData, setFormData] = useState<ArtistFormData>(initialFormData);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const openModal = (type: ModalType, artist?: Artist) => {
    setModalType(type);
    if (artist) {
      setSelectedArtist(artist);
      setFormData({
        artist_name: artist.artist_name,
        category: artist.category,
        intro: artist.intro,
        joining_date: artist.joining_date,
        experience: artist.experience,
        artist_review_id: artist.artist_review_id,
        image: artist.image || ''
      });
      setImagePreview(artist.image || '');
    } else {
      setSelectedArtist(null);
      setFormData(initialFormData);
      setImagePreview('');
    }
    setIsModalOpen(true);
    setOpenDropdownId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArtist(null);
    setFormData(initialFormData);
    setImagePreview('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        setImagePreview(dataUrl);
        setFormData({ ...formData, image: dataUrl });
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const handleFormChange = (data: Partial<ArtistFormData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = () => {
    if (modalType === 'create') {
      const newArtist: Artist = {
        id: Date.now(),
        ...formData
      };
      setArtists([...artists, newArtist]);
    } else if (modalType === 'edit' && selectedArtist) {
      setArtists(artists.map(artist => 
        artist.id === selectedArtist.id 
          ? { ...artist, ...formData }
          : artist
      ));
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this artist?')) {
      setArtists(artists.filter(artist => artist.id !== id));
    }
    setOpenDropdownId(null);
  };

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const isFormValid = validateFormData(formData);

  return {
    artists,
    isModalOpen,
    modalType,
    selectedArtist,
    formData,
    imagePreview,
    openDropdownId,
    isFormValid,
    openModal,
    closeModal,
    handleImageUpload,
    handleFormChange,
    handleSubmit,
    handleDelete,
    toggleDropdown
  };
}