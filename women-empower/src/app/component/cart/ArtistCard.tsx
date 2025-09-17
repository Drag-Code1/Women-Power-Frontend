"use client";
import React from "react";
import { MessageCircle, Instagram, Linkedin } from "lucide-react";
import { Artist } from "../../data/allArtists";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto h-full">
    {/* Artist Photo */}
    <div className="flex-shrink-0">
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Artist Details */}
    <div className="flex-grow flex flex-col justify-between text-center sm:text-left">
      <div>
        <h3 className="font-semibold text-lg sm:text-xl text-black mb-1 truncate">
          {artist.name}
        </h3>
        <p className="text-blue-600 text-xs sm:text-sm font-medium mb-2">
          {artist.category}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
          {artist.description}
        </p>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
        <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
          <MessageCircle className="w-5 h-5" />
        </a>
        <a href="#" className="text-pink-500 hover:text-pink-600 transition-colors">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="#" className="text-blue-700 hover:text-blue-800 transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  </div>
);

export default ArtistCard;
