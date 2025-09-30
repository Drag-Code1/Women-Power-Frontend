"use client";
import React, { useState } from "react";
import DashboardNavbar from "@/app/component/ui/utlity/DashboardNavbar";
import DashboardSidebar from "@/app/component/ui/utlity/DashboardSidebar";
import MainContent from "@/app/component/dashboard/dashboardtab/MainContent";



const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <DashboardNavbar
        onMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        <MainContent />

      </div>
    </div>
  );
};

export default Dashboard;
