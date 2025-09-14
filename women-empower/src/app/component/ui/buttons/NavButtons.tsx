import React, { useState} from "react";
interface NavLink {
    name: string;
     href:string 

}

export const NavLinkButton: React.FC<{ item: NavLink }> = ({ item }) => {
  const [activeTab, setActiveTab] = useState<string>("");
    const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // setIsMobileMenuOpen(false);
  };
return(

  <button
               
                  onClick={() => handleTabClick(item.name)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 mt-2 ${
                    activeTab === item.name
                      ? "bg-yellow-400/20 text-yellow-100"
                      : "text-white hover:text-yellow-400 hover:bg-white/10"
                  }`}
                >
                  <span className="font-medium tracking-wide">{item.name}</span>
                </button>

)

}
