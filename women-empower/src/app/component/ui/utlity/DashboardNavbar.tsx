"use client";
import React from "react";
import { Menu, X } from "lucide-react";
import SearchBar from "@/app/component/dashboard/navbar/SearchBar";
import ProfileMenu from "@/app/component/dashboard/navbar/ProfileMenu";

interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
}

const DashboardNavbar = ({
  userInfo = { name: "vishal lodhe", email: "lodhe.vishal@company.com", avatar: "" },
  onMenuToggle = () => {},
  isMobileMenuOpen = false,
}: {
  userInfo?: UserInfo;
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}) => {
  return (
    <nav className="bg-white text-gray-800 sticky top-0 z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Left Section - Logo and Menu */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-all duration-200 mr-3"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <h1 className="font-logo text-lg sm:text-xl text-blue-800 tracking-wide drop-shadow-md">
              Women Empower Journey
            </h1>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 justify-center px-8 max-w-md lg:max-w-lg xl:max-w-xl">
            <SearchBar />
          </div>

          {/* Right Section - Profile */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <ProfileMenu userInfo={userInfo} />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
