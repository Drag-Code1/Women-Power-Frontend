"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import NavBar from "../ui/utlity/NavBar";
import Footer from "../ui/utlity/Footer";
import ScrollToTopButton from "../ui/utlity/ScrollToTopButton";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#61503c]"></div>
      </div>
    );
  }

  // Admin and role-based logic removed; always render standard layout
  return (
    <>
      <NavBar />
      <ScrollToTopButton />
      {children}
      <Footer />
    </>
  );
};

export default LayoutWrapper;

