// hooks/useCourseManagement.ts
'use client';
import { useState } from 'react';
import { Course,ModalMode } from '../types/dashboardcoursetab'; 
import { generateCourseId,readFileAsDataURL } from '../lib/utils/dashboardcourse-utils';

export const useCourseManagement = (initialCourses: Course[]) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  const [formData, setFormData] = useState<Course>({
    id: '',
    thumbnail: '',
    courseName: '',
    coordinator: '',
    category: '',
    title: '',
    description: '',
    lessons: 0,
    level: 'Beginner',
    price: 0,
    discount: 0
  });

  const openModal = (mode: ModalMode, course?: Course) => {
    setModalMode(mode);
    if (course) {
      setFormData(course);
      setThumbnailPreview(course.thumbnail);
    } else {
      setFormData({
        id: generateCourseId(),
        thumbnail: '',
        courseName: '',
        coordinator: '',
        category: '',
        title: '',
        description: '',
        lessons: 0,
        level: 'Beginner',
        price: 0,
        discount: 0
      });
      setThumbnailPreview('');
    }
    setThumbnailFile(null);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const dataURL = await readFileAsDataURL(file);
      setThumbnailPreview(dataURL);
      setFormData({ ...formData, thumbnail: dataURL });
    }
  };

  const handleImageRemove = () => {
    setThumbnailFile(null);
    setThumbnailPreview('');
    setFormData({ ...formData, thumbnail: '' });
  };

  const handleSave = () => {
    if (!formData.thumbnail || !formData.courseName || !formData.coordinator || !formData.category) {
      alert('Please fill all required fields');
      return;
    }

    if (modalMode === 'add') {
      setCourses([...courses, formData]);
    } else if (modalMode === 'edit') {
      setCourses(courses.map(c => c.id === formData.id ? formData : c));
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
      setOpenMenuId(null);
    }
  };

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return {
    courses,
    isModalOpen,
    modalMode,
    openMenuId,
    formData,
    thumbnailPreview,
    openModal,
    closeModal,
    handleImageChange,
    handleImageRemove,
    handleSave,
    handleDelete,
    toggleMenu,
    setFormData
  };
};