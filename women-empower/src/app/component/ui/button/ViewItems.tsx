"use client"

// redux  cart-slice access
export const ViewItems:React.FC=()=>{
    return(
         <button className="text-blue-600 text-sm hover:underline">
                    View {3} Item
                      {/* View {cartItems.length} Item */}
                  </button>
    )
}