import { Minus, Plus } from "lucide-react";

export const ProductQuantityContainer=()=>{

    return(
         <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                    //   onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 transition-colors border-r border-gray-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-3 font-medium min-w-[60px] text-center">
                      {20}
                    </span>
                    <button
                    //   onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-50 transition-colors border-l border-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
    )
};