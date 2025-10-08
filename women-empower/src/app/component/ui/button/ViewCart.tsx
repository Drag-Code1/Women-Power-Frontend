
"use client"
import { useAppDispatch } from "@/state-management/hooks";
import { ShoppingCartOutlined } from "@mui/icons-material"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { fillCart } from "@/state-management/slices/cartSlice";
const fetchCartItems = async (cartID:string) => {
  
  try {
    const response = await fetch(`http://localhost:7000/v1/cart/${cartID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } 
    const data = await response.json();
    return data; 
  }
  catch (error) {
    console.error('Error fetching cart items:', error);
    return []; 
  }
};
export const ViewCart: React.FC = () => {
  const cartID='5ffda320-72dc-420f-8b30-1223f807c9aa'
const dispatch = useAppDispatch();
  useEffect(() => {
    const loadCartItems = async () => {
      const items = await fetchCartItems(cartID);
dispatch(fillCart(items.data));
      console.log('Cart items:', items);
    };
    loadCartItems();
  }
, []);
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