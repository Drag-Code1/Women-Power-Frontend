"use client"
import { usePathname, useRouter } from "next/navigation";
interface navItem{
      name: string, href:string
}
interface NavItemProp{

    item:navItem
}
export const DesktopNavItem:React.FC<NavItemProp>=({item})=>{
    
    
      const pathname = usePathname();
      const router = useRouter();
      const handleNav = (href: string) => {
    router.push(href);
    // setIsMobileMenuOpen(false);
  };
    return(     <button
                  key={item.name}
                  type="button"
                  onClick={() => handleNav(item.href)}
                  className={`relative px-1 py-2 transition-all duration-300 group bg-transparent ${
                    pathname === item.href
                      ? "text-yellow-400"
                      : "text-white hover:text-yellow-400"
                  }`}
                >
                  <span className="font-medium text-sm tracking-wide">
                    {item.name}
                  </span>
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${
                      pathname === item.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>)
}