"use client";

import React, { useState, useEffect } from "react";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";
import { getArtistDetailsApi } from "../../lib/api";
import { Artist } from "../../types/artist";

interface ArtistProfileProps {
  artistId: string;
}

const ArtistProfile: React.FC<ArtistProfileProps> = ({ artistId }) => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const artistData = await getArtistDetailsApi(artistId);
        setArtist(artistData);
      } catch (err) {
        console.error('Error fetching artist details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch artist details');
      } finally {
        setLoading(false);
      }
    };

    if (artistId) {
      fetchArtistDetails();
    }
  }, [artistId]);

  if (loading) {
    return (
      <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Artist Profile...</h2>
          <p className="text-gray-600">Please wait while we fetch the artist details</p>
        </div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Artist</h2>
          <p className="text-gray-600 mb-4">{error || 'Artist not found'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#61503c] text-white px-6 py-2 rounded-md hover:bg-[#7a5b3e] transition-all duration-200 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
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

  // Format joining date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <div className="bg-white">
        <div className="max-w-5xl mx-auto bg-white py-6 rounded-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={artist.artist_profile_pic}
              alt={artist.artist_Name}
              className="rounded-full w-40 h-40 sm:w-56 sm:h-56 object-cover shadow"
            />

            <div className="text-center md:text-left space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">{artist.artist_Name}</h2>
              <p className="text-gray-600 italic">Category ID: {artist.category_id}</p>

              <div className="flex justify-center md:justify-start items-center gap-2 text-gray-700">
                {renderStars(4.5)} {/* Default rating since not in API */}
                <span>(4.5)</span>
              </div>

              <div className="text-sm text-gray-600">
                <p><strong>Experience:</strong> {artist.experience} years</p>
                <p><strong>Joined:</strong> {formatDate(artist.joining_date)}</p>
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
