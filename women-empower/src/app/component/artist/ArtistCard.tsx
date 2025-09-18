import React from "react";
import { Artist } from "../../data/artistsData";
import { Star } from "lucide-react";

interface Props {
  artist: Artist;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  // Function to decide rating badge color
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-600";
    if (rating >= 3.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <section className="bg-white rounded-2xl shadow-md hover:shadow-lg p-4 transition duration-300 flex items-start gap-4">
      {/* Left Side Image */}
      <div className="w-28 h-28 flex-shrink-0">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Right Side Content */}
      <div className="flex-1">
        {/* Name & Rating */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">{artist.name}</h3>
          <div
            className={`flex items-center text-white text-xs px-2 py-1 rounded-md ${getRatingColor(
              artist.rating
            )}`}
          >
            <Star className="w-3 h-3 mr-1" />
            {artist.rating.toFixed(1)}
          </div>
          <span className="text-gray-500 text-sm">
            {/* Placeholder since reviews aren’t in data */}
            (120 Ratings)
          </span>
        </div>

        {/* Category */}
        <div className="text-sm text-gray-800 mt-1 font-medium">
          Category: {artist.category}
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 mt-2">{artist.bio}</p>
      </div>
    </section>
  );
};

export default ArtistCard;