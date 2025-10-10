'use client';
import React, { useRef, useState, useEffect } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// Artist Interface - Only required fields
interface Artist {
  id: string;
  artist_Name: string;
  artist_profile_pic: string;
  category_id: string;
  category: string;
  joining_date: string;
  experience: number;
}

// Sample Artists Data
const allArtists: Artist[] = [
  {
    id: "5bdd393c-e4c7-4312-ac0a-0a86c8f2b41c",
    artist_Name: "Dhananjay Kumar",
    artist_profile_pic: "/images/man1.jpg",
    category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28b",
    category: "Rangoli",
    joining_date: "2025-05-20 10:15:00",
    experience: 5
  },
  {
    id: "6cee404d-f5d8-5423-bd1b-1b97d9f3c52d",
    artist_Name: "Priya Sharma",
    artist_profile_pic: "/images/man1.jpg",
    category_id: "6g55e59g-144b-5cg7-0344-22dg9f00g39c",
    category: "Spiritual Art",
    joining_date: "2023-08-15 14:20:00",
    experience: 8
  },
  {
    id: "7dff515e-g6e9-6534-ce2c-2c08e0g4d63e",
    artist_Name: "Rajesh Verma",
    artist_profile_pic: "/images/man1.jpg",
    category_id: "7h66f60h-255c-6dh8-1455-33eh0g11h40d",
    category: "Resin Art",
    joining_date: "2024-02-10 11:45:00",
    experience: 6
  },
  {
    id: "8egg626f-h7f0-7645-df3d-3d19f1h5e74f",
    artist_Name: "Anita Patel",
    artist_profile_pic: "/images/man1.jpg",
    category_id: "8i77g71i-366d-7ei9-2566-44fi1h22i51e",
    category: "Shubh Labh",
    joining_date: "2023-11-25 16:30:00",
    experience: 9
  },
  {
    id: "9fhh737g-i8g1-8756-eg4e-4e20g2i6f85g",
    artist_Name: "Suresh Gupta",
    artist_profile_pic: "/images/man1.jpg",
    category_id: "9j88h82j-477e-8fj0-3677-55gj2i33j62f",
    category: "Decor",
    joining_date: "2024-06-12 09:00:00",
    experience: 4
  },
  {
    id: "0gii848h-j9h2-9867-fh5f-5f31h3j7g96h",
    artist_Name: "Kavita Joshi",
    artist_profile_pic: "/images/man1.jpg",
    category_id: "0k99i93k-588f-9gk1-4788-66hk3j44k73g",
    category: "Diya & Thali",
    joining_date: "2023-03-08 13:15:00",
    experience: 11
  },
  {
    id: "1hjj959i-k0i3-0978-gi6g-6g42i4k8h07i",
    artist_Name: "Arun Mehta",
    artist_profile_pic: "/images/man1.jpg",
    category_id: "1l00j04l-699g-0hl2-5899-77il4k55l84h",
    category: "Gift Hampers",
    joining_date: "2024-09-18 10:30:00",
    experience: 10
  },
  {
    id: "2ikk060j-l1j4-1089-hj7h-7h53j5l9i18j",
    artist_Name: "Neha Singh",
    artist_profile_pic: "/images/man1.jpg",
    category_id: "2m11k15m-700h-1im3-6900-88jm5l66m95i",
    category: "Lapdesk Design",
    joining_date: "2024-01-22 15:45:00",
    experience: 7
  },
  {
    id: "io8q6l6p-r7pk-hf4f-np3n-3n19oks5oh4p",
    artist_Name: "Arjun Das",
    artist_profile_pic: "/images/man1.jpg",
    category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28e",
    category: "Shubh Labh",
    joining_date: "2023-06-11 09:30:00",
    experience: 7
  }
];

// Artist Card Component
const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => {
  // Use state to avoid hydration mismatch with date formatting
  const [formattedDate, setFormattedDate] = useState<string>('');
  
  useEffect(() => {
    // Format date only on client side
    const joinDate = new Date(artist.joining_date);
    const date = joinDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    setFormattedDate(date);
  }, [artist.joining_date]);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full h-full border border-gray-100">
      {/* Artist Photo */}
      <div className="flex-shrink-0">
        <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50 ring-4 ring-amber-100">
          <img
            src={artist.artist_profile_pic}
            alt={artist.artist_Name}
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />
        </div>
      </div>

      {/* Artist Info */}
      <div className="flex-grow flex flex-col justify-between text-center sm:text-left w-full">
        <div className="space-y-3">
          {/* Name and Category */}
          <div>
            <h3 className="font-bold text-xl text-gray-900 mb-1">
              {artist.artist_Name}
            </h3>
            <p className="text-amber-700 text-sm font-semibold bg-amber-50 inline-block px-3 py-1 rounded-full">
              {artist.category}
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm">
            {/* Experience */}
            <div className="flex items-center gap-2 text-gray-700">
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span className="font-medium">{artist.experience} years experience</span>
            </div>
          </div>

          {/* Joining Date */}
          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{formattedDate || 'Loading...'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const TopRatedArtists: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [cardWidth, setCardWidth] = useState(400); // Default width
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update dimensions and check if mobile
  useEffect(() => {
    if (!isMounted) return;

    const updateDimensions = () => {
      if (scrollRef.current) {
        const container = scrollRef.current.parentElement;
        if (container) {
          const width = container.clientWidth;
          
          // Check if mobile view
          setIsMobile(width < 768);
          
          // Calculate card width based on container width
          if (width >= 768) {
            // Desktop view: 3 cards with 24px gap between them
            setCardWidth((width - 48) / 3);
          } else {
            // Mobile view: full width with some padding
            setCardWidth(width - 32);
          }
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isMounted]);

  // Check scroll position after dimensions are calculated
  useEffect(() => {
    if (isMounted && scrollRef.current) {
      checkScroll();
    }
  }, [isMounted, cardWidth]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Calculate scroll amount based on card width and gap
      const scrollAmount = isMobile ? cardWidth : cardWidth + 24; // 24px gap on desktop
      
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-5 bg-[#f6f0e3] rounded-sm">
        <section className="w-full max-w-7xl mx-auto">
          <div className="mb-4 sm:mb-5 text-left">
            <h2 className="text-black text-2xl sm:text-3xl font-bold">Top Rated Artists</h2>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Left Button */}
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full 
                         flex items-center justify-center shadow-lg bg-white text-gray-700 
                         hover:bg-amber-50 hover:text-amber-700 transition-all hover:scale-110"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right Button */}
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full 
                         flex items-center justify-center shadow-lg bg-white text-gray-700 
                         hover:bg-amber-50 hover:text-amber-700 transition-all hover:scale-110"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Artists Container */}
            <div className="overflow-hidden">
              <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-6 overflow-x-auto scroll-smooth py-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  // Center the first card on mobile
                  paddingLeft: isMobile ? '16px' : '0',
                  paddingRight: isMobile ? '16px' : '0'
                }}
              >
                {allArtists.map((artist) => (
                  <div
                    key={artist.id}
                    className="flex-shrink-0"
                    style={{ width: `${cardWidth}px` }}
                  >
                    <ArtistCard artist={artist} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TopRatedArtists;