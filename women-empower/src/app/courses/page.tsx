'use client';

import React from 'react';

const courses = [
  {
    title: "Rangoli",
    thumbnail: "/images/square-rangoli.jpg",
    whatsappText: "Hi, I'm interested in the Rangoli course!"
  },
  {
    title: "Decorated Frame and Photos",
    thumbnail: "/images/square-rangoli.jpg",
    whatsappText: "Hi, I want details about the Decorated Frame and Photos course."
  },
  {
    title: "Multicolor Rangoli",
    thumbnail: "/images/square-rangoli.jpg",
    whatsappText: "Hi, I'm interested in the Multicolor Rangoli course!"
  },
  {
    title: "Square Rangoli",
    thumbnail: "/images/square-rangoli.jpg",
    whatsappText: "Hi, I would like to learn Square Rangoli."
  },
  {
    title: "Exceptional Rangoli",
    thumbnail: "/images/square-rangoli.jpg",
    whatsappText: "Hi, I want to know more about the Exceptional Rangoli course."
  },
  {
    title: "Spiritual Rangoli",
    thumbnail: "/images/square-rangoli.jpg",
    whatsappText: "Hi, I am interested in the Spiritual Rangoli course."
  },
  {
    title: "Shubha Labh",
    thumbnail: "/images/square-rangoli.jpg",
    whatsappText: "Hi, I would like to know more about Shubha Labh designs."
  },
  {
    title: "Handmade Diya and Thali",
    thumbnail: "/images/square-rangoli.jpg",
    whatsappText: "Hi, I'm interested in Handmade Diya and Thali course."
  },
  {
    title: "Resin Product",
    thumbnail: "/images/square-rangoli.jpg",
    whatsappText: "Hi, I want to learn how to make Resin Products."
  },

];

const phoneNumber = "8804382913"; 

const CoursesSection = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-[#5C452B] mb-2">Our Courses</h2>
        <p className="text-gray-600">Click on a course to inquire on WhatsApp</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {courses.map((course, index) => {
          const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(course.whatsappText)}`;

          return (
            <a
              key={index}
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#5C452B]">{course.title}</h3>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default CoursesSection;
