"use client";
import { useEffect, useState } from "react";
import ArtistDirectoryContent from "@/app/component/artist/ArtistDirectoryContent";
import { getArtistsPaginated, getCategoriesApi } from "@/app/lib/api";
import { Artist } from "@/app/types/artist";

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArtists, setTotalArtists] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch artists with pagination
        const artistsData = await getArtistsPaginated(1);
        const fetchedArtists = artistsData.data || [];
        
        // Fetch categories
        const categoriesData = await getCategoriesApi();
        const catNames = categoriesData?.map((cat: any) => cat.name) || [];
        
        // Create a category mapping object
        const categoryMap: { [key: string]: string } = {};
        categoriesData?.forEach((cat: any) => {
          categoryMap[cat.id] = cat.name;
        });
        
        // Map category names to artists
        const mappedArtists = fetchedArtists.map(artist => ({
          ...artist,
          category: categoryMap[artist.category_id] || 'Unknown Category'
        }));

        setArtists(mappedArtists);
        setCategories(catNames);
        setTotalPages(artistsData.totalPages || 1);
        setTotalArtists(artistsData.totalArtists || 0);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f1f2f4]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#61503c]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <div className="min-h-screen bg-white">
        <ArtistDirectoryContent
          initialArtists={artists}
          initialCategories={categories}
          initialTotalPages={totalPages}
          initialTotalArtists={totalArtists}
        />
      </div>
    </div>
  );
}
