import { getTopRatedArtists } from "@/app/api/topratedartist";
import { TopRatedArtistsClient } from '../TopRatedArtists/TopRatedArtistsClient';

export const TopRatedArtists = async () => {
  // Fetch data on the server
  const artists = await getTopRatedArtists();

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-5 bg-[#f6f0e3] rounded-sm">
        <section className="w-full max-w-7xl mx-auto">
          <div className="mb-4 sm:mb-5 text-left">
            <h2 className="text-black text-2xl sm:text-3xl font-bold">Top Rated Artists</h2>
          </div>

          {/* Pass data to client component */}
          <TopRatedArtistsClient artists={artists} />
        </section>
      </div>
    </div>
  );
};