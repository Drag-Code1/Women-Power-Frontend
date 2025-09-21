"use client";
 
import React from "react";
import { FaStar } from "react-icons/fa";
 
const artist = {
  id: 1,
  name: "Aarav Sharma",
  image: "/images/man1.jpg",
  workImages: [
    "/images/demo7.jpg",
    "/images/demo2.jpg",
    "/images/demo3.jpg",
  ],
  speciality: "Traditional Rangoli",
  experience: "5",
  rating: 4.8,
  introduction: `Hi! I'm Aarav Sharma, a passionate Rangoli artist inspired by traditional Indian culture. I love turning celebrations into colorful stories. My designs blend heritage with creativity to leave a lasting impression.`,
};
 
const ArtistProfile = () => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = [];
 
    for (let i = 0; i < fullStars; i++) {
      totalStars.push(<FaStar key={`full-${i}`} className="text-yellow-500 text-sm sm:text-base" />);
    }
 
    if (hasHalfStar && totalStars.length < 5) {
      totalStars.push(<FaStar key="half" className="text-yellow-300 opacity-70 text-sm sm:text-base" />);
    }
 
    while (totalStars.length < 5) {
      totalStars.push(
        <FaStar key={`empty-${totalStars.length}`} className="text-gray-300 text-sm sm:text-base" />
      );
    }
 
    return <div className="flex gap-1">{totalStars}</div>;
  };
 
  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center items-start p-4 sm:p-6">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-2xl p-4 sm:p-8 space-y-8">
 
        {/* Top Section: Artist Profile */}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={artist.image}
              alt={artist.name}
              className="rounded-full w-40 h-40 sm:w-64 sm:h-64 object-cover shadow-md"
            />
          </div>
 
          <div className="w-full md:w-2/3 space-y-3 sm:space-y-4 text-center md:text-left">
            {/* Name without underline */}
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800">
              {artist.name}
            </h2>
 
            <p className="text-sm sm:text-lg text-gray-600 italic">{artist.speciality}</p>
 
            <div className="flex justify-center md:justify-start items-center gap-2 text-gray-700 text-sm sm:text-base">
              ⭐ {renderStars(artist.rating)} <span>({artist.rating})</span>
            </div>
 
            <div className="mt-1 sm:mt-2">
              <h4 className="text-sm sm:text-md font-semibold text-gray-700">Available For:</h4>
              <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1 text-sm sm:text-base">
                <li>Wedding Ceremonies</li>
                <li>Festive Home Decor (Diwali, Pongal)</li>
                <li>Corporate Events & Workshops</li>
              </ul>
            </div>
          </div>
        </div>
 
        {/* Self Introduction Section */}
        <div className="bg-amber-50 p-4 sm:p-6 rounded-xl shadow-sm border border-amber-100">
          <h3 className="text-lg sm:text-2xl font-semibold text-yellow-800 mb-2">Self Introduction</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{artist.introduction}</p>
        </div>
 
        {/* Rangoli Work Section */}
        <div className="bg-white p-3 sm:p-6 rounded-lg shadow-inner">
          {/* Title without underline */}
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Rangoli Work
          </h3>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artist.workImages.map((imgSrc, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300"
              >
                {/* Image */}
                <img
                  src={imgSrc}
                  alt={`Rangoli sample ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-xl"
                />
 
                {/* View Button (bottom-right corner) */}
                <button
                  className="absolute bottom-3 right-3 bg-[#695946] text-white font-semibold px-4 py-2 text-sm rounded-full shadow hover:opacity-90 transition"
                  onClick={() => alert(`Viewing Rangoli #${index + 1}`)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
 
      </div>
    </div>
  );
};
 
export default ArtistProfile;