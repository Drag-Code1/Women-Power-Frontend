"use client"
import React, { useState } from "react";
import {
  Person,
  LocationOn,
  ShoppingBag,
  Help,
  } from '@mui/icons-material';
import { useSearchParams } from "next/navigation";
export const ProfileSideBar:React.FC=()=>{
    
    const params=useSearchParams();
    const url=new URLSearchParams(params.toString());
      const [activeTab, setActiveTab] = useState('orders');
  const tabs = [
    { id: 'profile', label: 'Profile', icon: Person },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'address', label: 'Addresses', icon: LocationOn },
    { id: 'help', label: 'Help', icon: Help },
  ];
    return    <div className="lg:col-span-1">
            <div className="bg-white rounded-sm p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
url.set('active-tab',tab.id.toString());
history.pushState(null,"",`?${url.toString()}`)

                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        params.get('active-tab') === tab.id
                          ? 'bg-[#695946] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div> 
}