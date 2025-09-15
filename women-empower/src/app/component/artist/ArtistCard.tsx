"use client";

import React from "react";
import { Artist } from "../../data/artistsData";
import { Star } from "lucide-react";

interface Props {
  artist: Artist;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  return (
    <section className="bg-white rounded-2xl shadow-md hover:shadow-lg p-4 transition duration-300 flex flex-col">
      <img
        src={artist.image}
        alt={artist.name}
        className="w-full h-48 object-cover rounded-xl"
      />
      <h3 className="mt-3 text-lg font-semibold">{artist.name}</h3>
      <p className="text-sm text-gray-500 flex-grow">{artist.bio}</p>
      <div className="flex items-center mt-2">
        <Star className="text-yellow-500 w-4 h-4" />
        <span className="ml-1 text-sm">{artist.rating}</span>
      </div>
      <span className="text-xs text-gray-400 mt-1">
        Category: {artist.category}
      </span>
    </section>
  );
};

export default ArtistCard;