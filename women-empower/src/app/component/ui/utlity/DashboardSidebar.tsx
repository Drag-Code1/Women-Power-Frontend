"use client";
import React from "react";
import Drawer from "@mui/material/Drawer";
import SidebarContent from "@/app/component/dashboard/sidebar/SidebarContent";

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen = true,
  onClose = () => {},
}) => {
  return (
    <>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={onClose}
        sx={{ display: { xs: "block", lg: "none" } }}
        // PaperProps={{ sx: { width: 300 } }}
      >
        <SidebarContent onClose={onClose} />
      </Drawer>

      <aside className="hidden lg:block w-70 bg-white shadow-md">
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
};

export default DashboardSidebar;
