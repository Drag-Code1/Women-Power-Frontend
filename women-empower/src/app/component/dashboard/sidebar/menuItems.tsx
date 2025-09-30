import {
  LayoutDashboard,
  Package,
  Users,
  BookOpen,
  Calendar,
  Image,
  ShoppingCart,
} from "lucide-react";
import { MenuItem } from "@/app/types/types";

export const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "/dashboard" },
  {
    name: "Products",
    icon: <Package className="w-5 h-5" />,
    subItems: [
      { name: "All Products", href: "/products" },
      { name: "Category", href: "/products/category" },
    ],
  },
  { name: "Artists", icon: <Users className="w-5 h-5" />, href: "/artists" },
  { name: "Courses", icon: <BookOpen className="w-5 h-5" />, href: "/courses" },
  { name: "Events", icon: <Calendar className="w-5 h-5" />, href: "/events" },
  { name: "Orderlist", icon: <ShoppingCart className="w-5 h-5" />, href: "/orderlist" },
  {
    name: "Banners",
    icon: <Image className="w-5 h-5" />,
    subItems: [
      { name: "Home Banners", href: "/banners/home" },
      { name: "Showcase", href: "/banners/showcase" },
      { name: "Gift", href: "/banners/gift" },
    ],
  },
];
