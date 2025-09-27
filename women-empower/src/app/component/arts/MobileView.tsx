"use client";
import { SlidersHorizontal } from "lucide-react";
export const MobileView: React.FC = () => {

// history.pushState({}, "", url);
// console.log(url,'url')
  return (
    <button
      className="md:hidden flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-all duration-200"
      onClick={() => {  const url = new URL(window.location.href);
url.searchParams.set('mobile-sidebar', 'true');
history.pushState(null, "", url.toString());
}}
    >
      <SlidersHorizontal className="w-4 h-4" /> Filters
    </button>
  );
};
