// app/components/ArtistDirectory.tsx (SSR Component)

import { Suspense } from "react";
import ArtistDirectoryContent from "./ArtistDirectoryContent";
import { allArtists } from "@/app/api/artists/route";

async function ArtistDirectoryWrapper() {
  // Server-side data fetching
  const artists = allArtists;
  const categories = [...new Set(artists.map((a) => a.category).filter(Boolean))];

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <div className="min-h-screen bg-white">
        <Suspense fallback={<LoadingFallback />}>
          <ArtistDirectoryContent
            initialArtists={artists}
            initialCategories={categories as string[]}
          />
        </Suspense>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#61503c]"></div>
    </div>
  );
}

export default ArtistDirectoryWrapper;