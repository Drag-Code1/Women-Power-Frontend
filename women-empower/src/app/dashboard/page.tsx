"use client";
import React, { useState } from "react";
import DashboardNavbar from "@/app/component/ui/utlity/DashboardNavbar";
import DashboardSidebar from "@/app/component/ui/utlity/DashboardSidebar";
import MainContent from "@/app/component/dashboard/dashboardtab/MainContent";
import ProductDashboard from "@/app/allproducttab/page";  



const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userInfo = {
    name: "vishal lodhe",
    email: "lodhe.vishal@company.com",
    avatar: "",
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <DashboardNavbar
        userInfo={userInfo}
        onMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        {/* <MainContent /> */}
        <ProductDashboard />

      </div>
    </div>
  );
};

export default Dashboard;
