import { Add, Delete, Remove } from "@mui/icons-material";
import React from "react";


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}
interface CartProductProps {
  product: CartItem;
}
export const CartProduct: React.FC<CartProductProps> = ({ product }) => {

return(
 <div
                     key={product.id}
                     className="group bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition"
                   >
                     <div className="flex items-start space-x-3">
                       <div className="relative flex-shrink-0">
                         <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-inner">
                           <span className="text-xs font-medium text-gray-600">
                             ART
                           </span>
                         </div>
                         <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#61503c] text-white text-xs rounded-full flex items-center justify-center font-bold">
                           {product.quantity}
                         </div>
                       </div>
 
                       <div className="flex-1 min-w-0">
                         <h3 className="font-semibold text-gray-900 text-sm truncate">
                           {product.name}
                         </h3>
                         <p className="text-xs text-gray-500 mb-1">
                           Category: Digital Art
                         </p>
                         <div className="flex items-center space-x-1">
                           <span className="text-base font-bold text-[#61503c]">
                             ₹{product.price}
                           </span>
                           <span className="text-xs text-gray-400 line-through">
                             ₹{Math.floor(product.price * 1.2)}
                           </span>
                         </div>
                       </div>
 
                       <div className="flex flex-col items-end space-y-1">
                         <button
                           // onClick={() => removeItem(item.id)}
                           className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                         >
                           <Delete className="w-4 h-4" />
                         </button>
 
                         <div className="flex items-center bg-gray-100 rounded-md">
                           <button
                             // onClick={() => updateQuantity(item.id, -1)}
                             className="px-2 py-1 hover:bg-gray-200 rounded-l-md"
                           >
                             <Remove className="w-4 h-4 text-gray-600" />
                           </button>
                           <span className="w-8 text-center font-medium text-gray-800 text-sm">
                             {product.quantity}
                           </span>
                           <button
                             // onClick={() => updateQuantity(item.id, 1)}
                             className="px-2 py-1 hover:bg-gray-200 rounded-r-md"
                           >
                             <Add className="w-4 h-4 text-gray-600" />
                           </button>
                         </div>
                       </div>
                     </div>
                   </div>


)

}


/* 
<div
                     key={product.id}
                     className="group bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition"
                   >
                     <div className="flex items-start space-x-3">
                       <div className="relative flex-shrink-0">
                         <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-inner">
                           <span className="text-xs font-medium text-gray-600">
                             ART
                           </span>
                         </div>
                         <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#61503c] text-white text-xs rounded-full flex items-center justify-center font-bold">
                           {product.quantity}
                         </div>
                       </div>
 
                       <div className="flex-1 min-w-0">
                         <h3 className="font-semibold text-gray-900 text-sm truncate">
                           {product.name}
                         </h3>
                         <p className="text-xs text-gray-500 mb-1">
                           Category: Digital Art
                         </p>
                         <div className="flex items-center space-x-1">
                           <span className="text-base font-bold text-[#61503c]">
                             ₹{product.price}
                           </span>
                           <span className="text-xs text-gray-400 line-through">
                             ₹{Math.floor(product.price * 1.2)}
                           </span>
                         </div>
                       </div>
 
                       <div className="flex flex-col items-end space-y-1">
                         <button
                           // onClick={() => removeItem(item.id)}
                           className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                         >
                           <Delete className="w-4 h-4" />
                         </button>
 
                         <div className="flex items-center bg-gray-100 rounded-md">
                           <button
                             // onClick={() => updateQuantity(item.id, -1)}
                             className="px-2 py-1 hover:bg-gray-200 rounded-l-md"
                           >
                             <Remove className="w-4 h-4 text-gray-600" />
                           </button>
                           <span className="w-8 text-center font-medium text-gray-800 text-sm">
                             {product.quantity}
                           </span>
                           <button
                             // onClick={() => updateQuantity(item.id, 1)}
                             className="px-2 py-1 hover:bg-gray-200 rounded-r-md"
                           >
                             <Add className="w-4 h-4 text-gray-600" />
                           </button>
                         </div>
                       </div>
                     </div>
                   </div>

*/