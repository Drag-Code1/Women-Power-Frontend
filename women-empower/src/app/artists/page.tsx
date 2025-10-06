// "use client";
import React from "react";
import ArtistCard from "../component/cart/ArtistCard";
import ArtistFiltersSidebar from "../component/product/ArtistFiltersSidebar";

import { ArtistSearchBar } from "../component/artist/ArtistSearchBar";
import { SortList } from "../component/arts/SortList";
import { ClearFilter } from "../component/arts/ClearFilter";
import { MobileViewFilter } from "../component/arts/MobileViewFilter";
import { MobileView } from "../component/arts/MobileView";
import { ArtistMobileViewFilter } from "../component/artist/ArtistMobileViewFilter";
import { Artist } from "../types/artist";
import { fetchArtists } from "../lib/api";

// const fetchArtists = async () => {
//   const res = await fetch('http://localhost:5000/api/artist', { cache: 'no-store' });
//   const data = await res.json();
//   return data;
// }

const ArtistDirectoryApp = async({ searchParams }: { searchParams: { 'artist-search'?: string ,'artist-category':string} }) => {
    const searched = searchParams['artist-search'];
        const category = searchParams['artist-category'];

        // console.log("Search Params:", searchParams);
        // console.log("Searched Value:", searched);
        // console.log("Category Value:", category);
let allArtists =[];
        if(category){
          console.log("Category Filter Applied:");
   allArtists = await fetchArtists();

        }
        else{
          console.log("No Category Filter:");
   allArtists = await fetchArtists();
        }

 

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          {/* Header: Title + Buttons */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Artists ({allArtists.data.length})
            </h1>

            {/* Mobile: Filters + Sort together */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              {/* Filters Button: shown only on mobile */}
              
           <MobileView />
             

              {/* Sort Dropdown */}
              
           <SortList />
            </div>
          </div>

          {/* Search bar */}
      
          <ArtistSearchBar />
        </div>

        <div className="flex">
          {/* Sidebar (Desktop only) */}
          <div className="hidden lg:block w-64 border-r border-gray-200 bg-white">
            <ArtistFiltersSidebar/>
          </div>

          {/* Mobile Filters Dialog */}
         
<ArtistMobileViewFilter />
          {/* Main Content */}
          <div className="flex-1 p-6">
            {allArtists.data.length > 0 ? (
              <>
                {/* Artists Grid with fade transition */}
                <div
                  className={`transition-opacity duration-300`
                  //    ${
                  //   isTransitioning ? 'opacity-50' : 'opacity-100'
                  // }`
                  
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allArtists.data.map((artist:Artist) => (
                      <div
                        key={artist.id}
                        className="animate-fadeIn"
                        style={{
                          // animationDelay: `${index * 100}ms`,
                          animationFillMode: 'both'
                        }}
                      >
                        <ArtistCard artist={artist} />
                      </div>
                    ))}
                  </div>
                </div>
           
              </>
            ) : (
              <ClearFilter/>  

            

            )}
          </div>
        </div>
      </div>

     
    </div>
    </div>
  );
};

export default ArtistDirectoryApp;