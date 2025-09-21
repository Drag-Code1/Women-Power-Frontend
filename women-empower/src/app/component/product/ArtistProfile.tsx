"use client";

import React from "react";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";

const artist = {
  id: 1,
  name: "Aarav Sharma",
  image: "/images/man1.jpg",
  workImages: ["/images/demo7.jpg", "/images/demo2.jpg", "/images/demo3.jpg"],
  speciality: "Traditional Rangoli",
  experience: "5",
  rating: 4.8,
  introduction:
    "Hi! I'm Aarav Sharma, a passionate Rangoli artist inspired by traditional Indian culture. I love turning celebrations into colorful stories. My designs blend heritage with creativity to leave a lasting impression.",
};

const ArtistProfile = () => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-yellow-500 text-base sm:text-lg" />);
    }

    if (hasHalfStar && stars.length < 5) {
      stars.push(<StarHalf key="half" className="text-yellow-400 text-base sm:text-lg" />);
    }

    while (stars.length < 5) {
      stars.push(<StarBorder key={`empty-${stars.length}`} className="text-gray-300 text-base sm:text-lg" />);
    }

    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <div className="bg-white">
        <div className="max-w-5xl mx-auto bg-white py-6 rounded-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={artist.image}
              alt={artist.name}
              className="rounded-full w-40 h-40 sm:w-56 sm:h-56 object-cover shadow"
            />

            <div className="text-center md:text-left space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">{artist.name}</h2>
              <p className="text-gray-600 italic">{artist.speciality}</p>

              <div className="flex justify-center md:justify-start items-center gap-2 text-gray-700">
                {renderStars(artist.rating)}
                <span>({artist.rating})</span>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Available For:</h4>
                <ul className="list-disc list-inside text-gray-600 mt-1">
                  <li>Wedding Ceremonies</li>
                  <li>Festive Home Decor</li>
                  <li>Corporate Events & Workshops</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 mt-6 rounded-md border border-amber-100">
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">Self Introduction</h3>
            <p className="text-gray-700 leading-relaxed">{artist.introduction}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
