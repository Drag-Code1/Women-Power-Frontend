"use client"
import { fetchAddToCart, fetchCartItems } from "@/app/lib/api";
import { useAppDispatch, useAppSelector } from "@/state-management/hooks";
import { fillCart,addItem } from "@/state-management/slices/cartSlice";
import { useSearchParams } from "next/navigation";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}
interface AddToCartProps {
    id: number;   
}
export const AddToCart:React.FC<AddToCartProps> =({id})=>{
const selector = useAppSelector(state => (state.cart as { items: CartItem[] }).items);
const dispatch = useAppDispatch();
const cart_id='a3508c3d-9784-4d8a-bdad-ea0ffaa4c9cc'


const searchParams=useSearchParams();
const pQt=searchParams.get('pr-qt')
const addToCart=async()=>{
const data=await fetchAddToCart(cart_id,id,pQt);
console.log("cart-item-data",data)

  if(!selector.find(item=>item.id===id)){
   console.log("Adding to cart:", id);
    // const items = await fetchCartItems();
    //update cart api to add item with id
 dispatch(addItem(data.data));
    //dispatch(addItem({id, name:"Sample Item",price:100,offerPrice:120,quantity:1,image:"/sample.jpg"}));
  }
  else{
    console.log("Item already in cart:", id);
  }
//dispatch(addItem({id:1,name:"Sample Item",price:100,offerPrice:120,quantity:1,image:"/sample.jpg"}));
}
    return (
  
  
  <button disabled={selector.find(item=>item.productId===id) } onClick={addToCart} className="bg-[#695946] text-white px-3 py-1.5 rounded text-xs hover:bg-[#61503c] transition-colors">
        {selector.find(item=>item.productId===id) ? "In Cart" : "Add to Cart"}    
          </button>


    )
}  
  
