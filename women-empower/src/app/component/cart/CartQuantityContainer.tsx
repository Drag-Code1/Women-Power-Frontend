import { fetchDeleteCartItemQuantity, fetchupdateCartItemQuantity } from "@/app/lib/api";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useState } from "react";

export interface CartItem {
  id: string;
  cartId:string,
  productId:string
quantity: number;
  image: string|null;
    productName: string|null;
  price: number|null;
  categoryName:string|null
  discount:number|null
}
interface CartItemProps{
    cartItem:CartItem
}

export const CartQuantityContainer:React.FC<CartItemProps>=({cartItem})=>{
const [qt,setQt]=useState(cartItem.quantity);

const updateItemQuantity=async(op:number)=>{

    if(op==-1){
        if(qt>1){

       
        const tempQt=qt-1;
        const res=await fetchupdateCartItemQuantity(cartItem.id,tempQt)
       
        setQt(prev=>prev-1);
 }
 else{

         fetchDeleteCartItemQuantity(cartItem.id)
 }
    }
    else{
          const tempQt=qt+1;
       const res=await  fetchupdateCartItemQuantity(cartItem.id,tempQt)
        setQt(prev=>prev+1);
    }

}



    return(
          <div className="flex flex-col items-end space-y-1">
                                <button
                                  onClick={() => fetchDeleteCartItemQuantity(cartItem.id)}
                                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                >
                                  <Delete className="w-4 h-4" />
                                </button>
        
                                <div className="flex items-center bg-gray-100 rounded-md">
                                  <button
                                    onClick={() => updateItemQuantity( -1)}
                                    className="px-2 py-1 hover:bg-gray-200 rounded-l-md"
                                  >
                                    <Remove className="w-4 h-4 text-gray-600" />
                                  </button>
                                  <span className="w-8 text-center font-medium text-gray-800 text-sm">
                                    {/* {item.quantity} */}

                                    {qt}
                                  </span>
                                  <button
                                    onClick={() => updateItemQuantity( 1)}
                                    className="px-2 py-1 hover:bg-gray-200 rounded-r-md"
                                  >
                                    <Add className="w-4 h-4 text-gray-600" />
                                  </button>
                                </div>
                              </div>
    )
}

