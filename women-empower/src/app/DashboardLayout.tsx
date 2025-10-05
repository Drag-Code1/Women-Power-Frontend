"use client";
import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/app/component/ui/utlity/DashboardNavbar";
import DashboardSidebar from "./component/ui/utlity/DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const userInfo = {
    name: "vishal lodhe",
    email: "lodhe.vishal@company.com",
    avatar: "",
  };
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <DashboardNavbar
        userInfo={userInfo}
        onMenuToggle={handleToggleSidebar}
        isMobileMenuOpen={sidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        <div className={"flex-1 overflow-y-auto transition-all duration-300 "}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
