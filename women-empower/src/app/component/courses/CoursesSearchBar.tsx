'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

export const CouserSearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
useEffect(() => {

  const params = new URLSearchParams(searchParams.toString());
  if(params.get("category")) {
    setSearchTerm("");
  } }
, [searchParams]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // update URL and trigger navigation
    const params = new URLSearchParams(window.location.search);
    if (value) {
      if(  params.get('category')){
        params.delete('category')
      }
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative mt-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}   // ✅ FIXED
        className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 transition-all duration-200"
      />
    </div>
  );
};
