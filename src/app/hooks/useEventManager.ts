'use client';
import { useState, useEffect } from 'react';
import type { Event, ModalMode, EventFormData } from '@/app/types/dashboardeventtab';
import { createEventV1, updateEventV1, deleteEventV1, getCategoriesApi } from '@/app/lib/api';
import { readFileAsDataURL } from '@/app/lib/utils/dashboardartist-utils';

const initialFormData: EventFormData = {
  title: '',
  description: '',
  category: '',
  dateTime: '',
  status: 'upcoming',
  keywords: [],
  thumbnail: '',
  banner: ''
};

export const useEventManager = (initialEvents: Event[]) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [categoryOptions, setCategoryOptions] = useState<Array<{ id: string; name: string }>>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const cats = await getCategoriesApi();
        setCategoryOptions(Array.isArray(cats) ? cats : []);
      } catch (e) {
        console.error('Failed to load categories', e);
      }
    })();
  }, []);

  const openModal = (mode: ModalMode, event?: Event) => {
    setModalMode(mode);
    if (event) {
      setSelectedEvent(event);
      setFormData({
        ...event,
        dateTime: event.dateTime ? new Date(event.dateTime).toISOString().slice(0, 16) : ''
      });
      setThumbnailPreview(event.thumbnail || '');
      setBannerPreview(event.banner || '');
    } else {
      setSelectedEvent(null);
      setFormData(initialFormData);
      setThumbnailPreview('');
      setBannerPreview('');
    }
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setFormData(initialFormData);
    setThumbnailPreview('');
    setBannerPreview('');
    setIsSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        if (type === 'thumbnail') {
          setThumbnailPreview(dataUrl);
          setFormData(prev => ({ ...prev, thumbnail: dataUrl }));
        } else {
          setBannerPreview(dataUrl);
          setFormData(prev => ({ ...prev, banner: dataUrl }));
        }
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const handleSubmit = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      // Find category ID if selected by name
      const found = categoryOptions.find(c => c.name === formData.category || c.id === formData.category);
      const categoryId = found?.id || '';

      if (!categoryId) {
        alert('Please select a valid category');
        setIsSaving(false);
        return;
      }

      const payload = {
        ...formData,
        category_id: categoryId,
        thumbnail: formData.thumbnail || thumbnailPreview,
        banner: formData.banner || bannerPreview,
      };

      if (modalMode === 'add') {
        const created = await createEventV1(payload);
        const mapped: Event = {
          id: created.id,
          title: created.title,
          description: created.description,
          category: found?.name || '',
          dateTime: created.date_time,
          status: created.status,
          keywords: Array.isArray(created.keywords) ? created.keywords : (created.keywords || '').split(',').map((k: string) => k.trim()),
          thumbnail: created.e_image,
          banner: created.banner
        };
        setEvents(prev => [...prev, mapped]);
      } else if (modalMode === 'edit' && selectedEvent) {
        const updated = await updateEventV1(selectedEvent.id, payload);
        const mapped: Event = {
          id: updated.id,
          title: updated.title,
          description: updated.description,
          category: found?.name || '',
          dateTime: updated.date_time,
          status: updated.status,
          keywords: Array.isArray(updated.keywords) ? updated.keywords : (updated.keywords || '').split(',').map((k: string) => k.trim()),
          thumbnail: updated.e_image,
          banner: updated.banner
        };
        setEvents(prev => prev.map(e => e.id === selectedEvent.id ? mapped : e));
      }
      closeModal();
    } catch (e) {
      console.error('Failed to save event', e);
      alert('Failed to save event. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEventV1(id);
        setEvents(prev => prev.filter(e => e.id !== id));
      } catch (e) {
        console.error('Failed to delete event', e);
        alert('Failed to delete event. Please try again.');
      }
    }
    setActiveDropdown(null);
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
    handleDelete,
    categoryOptions,
    isSaving
  };
};