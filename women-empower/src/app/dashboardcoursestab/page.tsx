"use client";
// app/courses/page.tsx
import React from "react";
import { Plus } from "lucide-react";
import { initialCourses } from "../data/dashboardcoursestabdata";
import { useCourseManagement } from "../hooks/useCourseManagement";
import CourseCard from "../component/dashboard/dashboardcoursestab/CourseCard";
import CourseModal from "../component/dashboard/dashboardcoursestab/CourseModal";

export default function CoursesPage() {
  const {
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
    setFormData,
  } = useCourseManagement(initialCourses);

  return (
    <>
      <div className="min-h-screen bg-[#f3f4f6] p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-3xl text-gray-900 font-bold">
                Course Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage your courses</p>
            </div>
            <button
              onClick={() => openModal("add")}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Plus size={20} />
              Add Course
            </button>
          </div>

          {/* Courses Grid */}
          {courses.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
                <Plus size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No courses yet
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by adding your first course
              </p>
              <button
                onClick={() => openModal("add")}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Add Your First Course
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onView={(course) => openModal("view", course)}
                  onEdit={(course) => openModal("edit", course)}
                  onDelete={handleDelete}
                  isMenuOpen={openMenuId === course.id}
                  onMenuToggle={() => toggleMenu(course.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        <CourseModal
          isOpen={isModalOpen}
          mode={modalMode}
          formData={formData}
          thumbnailPreview={thumbnailPreview}
          onClose={closeModal}
          onSave={handleSave}
          onFormChange={setFormData}
          onImageChange={handleImageChange}
          onImageRemove={handleImageRemove}
        />
      </div>
    </>
  );
}
