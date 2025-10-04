
"use client"
import { Search } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";


  export const ViewSearchBar = () => {
    const searchParams=useSearchParams();
    const params=new URLSearchParams(searchParams.toString());

    return(
              <button
                onClick={()=>{
                   params.has('nav-search') ? params.delete('nav-search','true') : params.set('nav-search','true')
                   history.pushState(null, '', `?${params.toString()}`);


                }
            }
                className="hidden lg:block p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg"
              >
                <Search className="w-5 h-5" />
              </button>
  )
};