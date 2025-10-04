"use client"

import { Close } from "@mui/icons-material";
import {
  
  Menu,

} from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const OpenMobileMenu:React.FC=()=>{
    //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    //   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    //     const [isSearchOpen, setIsSearchOpen] = useState(false);
      
      const searchParams=useSearchParams();
      const url=new URLSearchParams(searchParams.toString());
      
  const toggleMobileMenu = () => {
    console.log( searchParams.get('mobile-menu'))
 searchParams.get('mobile-menu')=="true" ?url.delete('mobile-menu'):url.set('mobile-menu','true')
         history.pushState(null, '', `?${url.toString()}`);
    
  };
    return(
           <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg"
                      >
                        {  searchParams.get('mobile-menu')=="true" ? (
                          <Close className="w-6 h-6" />
                        ) : (
                          <Menu className="w-6 h-6" />
                        )}
                      </button>
    )
}