
"use client"
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation"
import { NavMobileSearchBar } from "./NavMobileSearchBar";

export const MobileNavItemContainer:React.FC=()=>{
    
  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "ARTS", href: "/arts" },
    { name: "ARTISTS", href: "/artists" },
    { name: "COURSES", href: "/courses" },
    { name: "EVENTS", href: "/events" },
    { name: "CONTACT US", href: "/contact" },
  ];
const searchParams=useSearchParams();

  const pathname = usePathname();

// searchParams.get('mobile-menu')
    return(
        <div
                    className={`lg:hidden transition-all duration-500 ease-in-out ${
                      searchParams.get('mobile-menu')
                        ? "max-h-[700px] opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="px-4 py-3 border-t border-white/10">
                      {/* <SearchBar /> */}
                      <NavMobileSearchBar />
                    </div>
        
                    <div className="px-4 sm:px-6 lg:px-8 pb-4 space-y-2 border-t border-white/10">
                      {navItems.map((item, i) => (
                        <Link href={item.href} key={i}>
                        <button
                          key={i}
                          type="button"
                          // onClick={() => handleNav(item.href)}
                          className={`w-full block text-left p-3 rounded-lg transition-all duration-300 mt-2 bg-transparent ${
                            pathname === item.href
                              ? "bg-yellow-400/20 text-yellow-100"
                              : "text-white hover:text-yellow-400 hover:bg-white/10"
                          }`}
                        >
                          <span className="font-medium tracking-wide">{item.name}</span>
                        </button>
                        </Link>
                      ))}
                    </div>
                  </div>
    )
}