"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Person,
  FavoriteBorder,
  Search,
  Menu,
  Close,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import CartDrawer from "../modals/CartDrawer";
import SignUp from "../forms/SignUp";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Abstract Canvas Art", price: 2999, quantity: 1, image: "/images/art1.jpg" },
    { id: 2, name: "Modern Sculpture", price: 5999, quantity: 2, image: "/images/art2.jpg" },
  ]);

  // Fake login state (replace with real auth)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user] = useState({ name: "User", mobile: "+91 9876543210" });
  const [showSignUp, setShowSignUp] = useState(false); // State to control Sign Up modal

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const suggestions = ["Modern Art", "Oil Paintings", "Sketch Artists", "Sculptures", "Digital Arts", "Photography"];
  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      if (window.innerWidth < 1024 && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("resize", handleResize);

    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
  };
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "ARTS", href: "/arts" },
    { name: "ARTISTS", href: "/artists" },
    { name: "COURSES", href: "/courses" },
    { name: "CONTACT US", href: "/contact" },
  ];

  const SearchBar = () => (
    <div className="w-full animate-fadeIn">
      <div className="max-w-3xl mx-auto px-4 py-3 relative">
        <button
          onClick={toggleSearch}
          className="absolute right-6 top-5 text-gray-300 hover:text-white lg:block hidden"
        >
          <Close className="w-6 h-6" />
        </button>

        <div className="flex items-center bg-transparent border border-white rounded-lg px-3 py-2">
          <SearchOutlined className="text-white mr-2" />
          <input
            type="text"
            placeholder="Search for products, artists..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-300 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        {searchQuery && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {s}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50">
        <div
          className={`transition-all duration-500 ease-in-out w-full p-2 ${
            isScrolled ? "bg-[#61503c]/95 backdrop-blur-lg shadow-lg" : "bg-[#61503c]/95 backdrop-blur-md"
          }`}
        >
          <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg"
              >
                {isMobileMenuOpen ? <Close className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/">
                <Image
                  src="/images/logo1.PNG"
                  alt="Logo"
                  width={150}
                  height={50}
                  className="object-contain cursor-pointer"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className={`relative px-1 py-2 transition-all duration-300 group ${
                      isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"
                    }`}
                  >
                    <span className="font-medium text-sm tracking-wide">{item.name}</span>
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSearch}
                className="hidden lg:block p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Profile / Sign Up */}
              <div className="relative" ref={profileRef}>
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg"
                    >
                      <Person className="w-5 h-5" />
                    </button>
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          Hello, <span className="font-semibold">{user.name}</span>
                          <br />
                          <span className="text-gray-500">{user.mobile}</span>
                        </div>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                          Delete Account
                        </button>
                        <button
                          onClick={() => setIsLoggedIn(false)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  // Replace the Sign Up Link with a button
                  <>
                    <button
                      onClick={() => setShowSignUp(true)}
                      className="px-3 py-1.5 rounded-md bg-yellow-400 text-gray-900 font-semibold text-sm hover:bg-yellow-300"
                    >
                      Sign Up
                    </button>
                    {showSignUp && (
                      <div className="fixed inset-0 z-[999] flex items-center justify-center">
                        <SignUp onClose={() => setShowSignUp(false)} />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Wishlist */}
              <div className="relative">
                <button className="p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg">
                  <FavoriteBorder className="w-5 h-5" />
                </button>
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </div>

              {/* Cart */}
              <div className="relative">
                <button
                  onClick={toggleCart}
                  className="p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg"
                >
                  <ShoppingCartOutlined className="w-5 h-5" />
                </button>
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
            </div>
          </div>

          {isSearchOpen && <SearchBar />}

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="px-4 py-3 border-t border-white/10">
              <SearchBar />
            </div>

            <div className="px-4 sm:px-6 lg:px-8 pb-4 space-y-2 border-t border-white/10">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-left p-3 rounded-lg transition-all duration-300 mt-2 ${
                      isActive
                        ? "bg-yellow-400/20 text-yellow-100"
                        : "text-white hover:text-yellow-400 hover:bg-white/10"
                    }`}
                  >
                    <span className="font-medium tracking-wide">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        getTotalPrice={getTotalPrice}
      />

      <div className="h-20"></div>
    </>
  );
};

export default NavBar;