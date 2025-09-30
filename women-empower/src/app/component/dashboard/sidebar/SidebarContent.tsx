"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { menuItems } from "@/app/component/dashboard/sidebar/menuItems";
import { MenuItem } from "@/app/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarContentProps {
  onClose?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ onClose = () => {} }) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  const activeFromPath = useMemo(() => {
    // Try to match subItems first
    for (const item of menuItems) {
      if (item.subItems) {
        const match = item.subItems.find((s) => s.href === pathname);
        if (match) return match.name;
      } else if (item.href === pathname) {
        return item.name;
      }
    }
    return "Dashboard";
  }, [pathname]);

  useEffect(() => {
    setActiveItem(activeFromPath);
    // Expand any parent whose child matches the current path
    const parentsToExpand: string[] = [];
    for (const item of menuItems) {
      if (item.subItems && item.subItems.some((s) => s.href === pathname)) {
        parentsToExpand.push(item.name);
      }
    }
    setExpandedItems(parentsToExpand);
  }, [activeFromPath, pathname]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((item) => item !== itemName) : [...prev, itemName]
    );
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.subItems) {
      toggleExpanded(item.name);
    } else {
      setActiveItem(item.name);
      onClose();
    }
  };

  const handleSubItemClick = (subItemName: string) => {
    setActiveItem(subItemName);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-800">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">Menu</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <div>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    expandedItems.includes(item.name)
                      ? "bg-gray-100 text-gray-900 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`${
                        expandedItems.includes(item.name)
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedItems.includes(item.name) ? "text-blue-600 rotate-180" : "text-gray-400"
                    }`}
                  />
                </button>

                {expandedItems.includes(item.name) && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => handleSubItemClick(subItem.name)}
                        className={`flex items-center px-4 py-2.5 text-sm rounded-lg transition-all ${
                          activeItem === subItem.name
                            ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-3 ${
                            activeItem === subItem.name
                              ? "bg-blue-500"
                              : "bg-gray-300 group-hover:bg-gray-400"
                          }`}
                        ></div>
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href!}
                onClick={() => handleItemClick(item)}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  activeItem === item.name
                    ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span
                  className={`mr-3 ${
                    activeItem === item.name
                      ? "text-blue-600"
                      : "text-gray-500 group-hover:text-blue-600"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
                {activeItem === item.name && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          © 2025 Whoemen Empower
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
