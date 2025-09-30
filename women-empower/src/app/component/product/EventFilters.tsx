'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

interface FiltersProps {
 
}

const EventFilters: React.FC<FiltersProps> = () => {
  
    const [searchTerm, setSearchTerm] = useState("");
      // const [selectedCategory, setSelectedCategory] = useState("All");
      // const [selectedType, setSelectedType] = useState("All");
      // const [selectedStatus, setSelectedStatus] = useState("All");
    const statuses = ["All", "upcoming", "ongoing", "completed"];
    

  const categories = [
    "All",
    "Rangoli",
    "Spiritual",
    "Resin",
    "Shubh Labh",
    "Lapdesk",
    "Diya & Thali",
    "Decor",
    "Gift",
  ];
  const types = ["All", "festival", "workshop", "celebration", "craft-session"];

const url=new URL(window.location.href);

const params = url.searchParams
 const router = useRouter();
  const searchParams = useSearchParams();


const handleCheck = (e: React.ChangeEvent<HTMLSelectElement>,filterName:string) => {
//     const {value } = e.target;
// console.log(value);
// value=="All"? params.delete(filterName) :params.set(filterName,value);

// history.pushState(null, '',url.toString());

// console.log(url.toString());




 const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    value === "All" ? params.delete(filterName) : params.set(filterName, value);
    router.push(`?${params.toString()}`);

}





  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />

        <select  onChange={(e)=>handleCheck(e,'event-category')} className="px-4 py-2 border rounded-lg">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select  onChange={(e)=>handleCheck(e,'event-type')} className="px-4 py-2 border rounded-lg">
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select  onChange={(e)=>handleCheck(e,'event-status')} className="px-4 py-2 border rounded-lg">
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );
};

export default EventFilters;
