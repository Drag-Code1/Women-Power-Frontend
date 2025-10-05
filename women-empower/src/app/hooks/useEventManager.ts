'use client';
import { useState } from 'react';
import { generateEventId, readImageAsDataURL } from '../lib/utils/dashboardevent-utils';
import type { Event, EventFormData } from '../types/dashboardeventtab'; 

type ModalMode = 'add' | 'edit';

export const useEventManager = (initialEvents: Event[]) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [formData, setFormData] = useState<EventFormData>({
    thumbnail: '',
    category: '',
    title: '',
    description: '',
    dateTime: '',
    status: 'upcoming',
    keywords: [],
    banner: ''
  });

  const resetForm = () => {
    setFormData({
      thumbnail: '',
      category: '',
      title: '',
      description: '',
      dateTime: '',
      status: 'upcoming',
      keywords: [],
      banner: ''
    });
    setThumbnailPreview('');
    setBannerPreview('');
  };

  const openModal = (mode: ModalMode, event?: Event) => {
    setModalMode(mode);
    if (event) {
      setSelectedEvent(event);
      setFormData(event);
      setThumbnailPreview(event.thumbnail);
      setBannerPreview(event.banner || '');
    } else {
      setSelectedEvent(null);
      resetForm();
    }
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    resetForm();
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'thumbnail' | 'banner'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const result = await readImageAsDataURL(file);
        if (type === 'thumbnail') {
          setThumbnailPreview(result);
          setFormData({ ...formData, thumbnail: result });
        } else {
          setBannerPreview(result);
          setFormData({ ...formData, banner: result });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleAdd = () => {
    const newEvent: Event = {
      id: generateEventId(),
      thumbnail: formData.thumbnail || '',
      category: formData.category || '',
      title: formData.title || '',
      description: formData.description || '',
      dateTime: formData.dateTime || '',
      status: formData.status || 'upcoming',
      keywords: formData.keywords || [],
      banner: formData.banner
    };
    setEvents([...events, newEvent]);
    closeModal();
  };

  const handleEdit = () => {
    if (selectedEvent) {
      setEvents(
        events.map((e) =>
          e.id === selectedEvent.id ? ({ ...formData, id: selectedEvent.id } as Event) : e
        )
      );
      closeModal();
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((e) => e.id !== id));
      setActiveDropdown(null);
    }
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      handleAdd();
    } else {
      handleEdit();
    }
  };

  return {
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
    handleDelete
  };
};