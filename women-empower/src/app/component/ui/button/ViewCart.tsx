import { ShoppingCartOutlined } from "@mui/icons-material"
import { useSearchParams } from "next/navigation";

export const ViewCart: React.FC = () => {

const searchParams=useSearchParams();
const params=new URLSearchParams(searchParams.toString());


  return (
    <div className="relative">
                   <button
                     onClick={()=>{params.set('cart','true')
                        history.pushState(null, '', `?${params.toString()}`);
                     }
                    }
                     className="p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg"
                   >
                     <ShoppingCartOutlined className="w-5 h-5" />
                   </button>
                   <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                     {3}
                   </span>
                 </div>
  )
}