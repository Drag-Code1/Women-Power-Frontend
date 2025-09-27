 import { ArtworkItem } from "@/app/types/artist"; 
import { Visibility } from "@mui/icons-material";
import { StarIcon } from "lucide-react";
 interface ArtistWorkItemProps {
    artwork: ArtworkItem;
}
export const ArtistWorkItem: React.FC<ArtistWorkItemProps> = ({artwork}) => {
      const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
          <StarIcon
            key={i}
            fontSize="small"
            className={`${
              i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        ));
      };
    return(
        <div
                        key={artwork.id}
                        className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm hover:shadow-xl 
                                 transition-all duration-300 overflow-hidden group"
                      >
                        {/* Image Container */}
                        <div className="relative overflow-hidden">
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
        
                          {/* Overlay Actions */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 
                                       transition-all duration-300 flex items-center justify-center">
                            <button
                              className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 
                                       px-4 py-2 rounded-full font-semibold flex items-center gap-2
                                       transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                            >
                              <Visibility fontSize="small" />
                              View Details
                            </button>
                          </div>
        
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3">
                            <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                              {artwork.category}
                            </span>
                          </div>
                        </div>
        
                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
                            {artwork.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">by Artist Name</p>
        
                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              {renderStars(artwork.rating)}
                            </div>
                            <span className="text-sm text-gray-600">
                              {artwork.rating} ({artwork.likes})
                            </span>
                          </div>
        
                          {/* Actions */}
                          <div className="flex items-center justify-center">
                            <button className="bg-[#695946] hover:bg-[#61503c] text-white px-6 py-2 rounded-full text-sm font-semibold transition-all w-full">
                              Order Now
                            </button>
                          </div>
                        </div>
                      </div>
    )
}