"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaPalette,
  FaUserFriends,
  FaGraduationCap,
  FaHeart,
} from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Wishlist count (replace with state/props from backend later)
  const wishlistCount = 0;

  const navItems = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "About Us", href: "/about", icon: <FaInfoCircle /> },
    { name: "Arts", href: "/arts", icon: <FaPalette /> },
    { name: "Artists", href: "/artists", icon: <FaUserFriends /> },
    { name: "Courses", href: "/courses", icon: <FaGraduationCap /> },
  ];

  return (
    <nav className="bg-green-50 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="flex justify-between px-14 items-center py-4">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-lg font-bold text-green-800">Women-Empower</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                  isActive
                    ? "bg-white text-green-600 border-b-2 border-green-600 shadow-sm"
                    : "text-gray-700 hover:bg-green-100 hover:text-green-600"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Wishlist Icon (Desktop) */}
          <Link href="/wishlist" className="relative ml-4">
            <FaHeart className="text-2xl text-gray-700 hover:text-green-600 transition" />
            <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {wishlistCount}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-2xl text-green-800"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`bg-green-100 w-80 h-full p-6 flex flex-col space-y-6 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo and Close Button Flex Row */}
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-green-800">Women-Empower</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          {/* Sidebar Nav */}
          <div className="flex flex-col mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-xl transition ${
                    isActive
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-700 hover:bg-white hover:text-green-600"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Wishlist Icon (Mobile Sidebar) */}
            <Link
              href="/wishlist"
              className="flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:text-green-600 transition"
            >
              <div className="relative">
                <FaHeart className="text-lg" />
                <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              </div>
              <span>Wishlist</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;