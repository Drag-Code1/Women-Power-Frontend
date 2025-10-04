"use client"
import { Person } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";

export const ShowProfile:React.FC=()=>{
      const searchParams=useSearchParams();
      const url=new URLSearchParams(searchParams.toString());
            
  const toggleProfile = () => {
    console.log( searchParams.get('user-profile'))
 searchParams.get('user-profile')=="true" ?url.delete('user-profile'):url.set('user-profile','true')
         history.pushState(null, '', `?${url.toString()}`);
    
  };
    return(
        <button
                          className="p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg"
                          onClick={toggleProfile}
                        >
                          <Person className="w-5 h-5" />
                        </button>
    )
}