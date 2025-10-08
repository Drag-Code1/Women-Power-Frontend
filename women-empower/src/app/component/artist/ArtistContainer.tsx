import { Artist } from "@/app/types/artist";


import ArtistCard from "../cart/ArtistCard";
import { Pagination } from "../arts/Pagination";
import { ClearFilter } from "../arts/ClearFilter";
interface productContainerProps{
allArtists:Artist[]
totalPages:number;
viewMode:string;
}
export const ArtistContainer:React.FC<productContainerProps>=({allArtists,totalPages,currentPage,viewMode})=>{

    return(
         <div className="flex-1 p-6">
                    {allArtists.length > 0 ? (
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
                            {allArtists.map((artist:Artist) => (
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
                    <Pagination currentPage={currentPage} totalPages={totalPages} />
                      </>
                    ) : (
                      <ClearFilter/>  
        
                    
        
                    )}
                  </div>
    )
}