"use client"
import { fetchCartItems } from "@/app/lib/api";
import { useAppDispatch, useAppSelector } from "@/state-management/hooks";
import { fillCart } from "@/state-management/slices/cartSlice";

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

const addToCart=async()=>{
  if(!selector.find(item=>item.id===id)){
   console.log("Adding to cart:", id);
    const items = await fetchCartItems();
    //update cart api to add item with id
 dispatch(fillCart(items));
    //dispatch(addItem({id, name:"Sample Item",price:100,offerPrice:120,quantity:1,image:"/sample.jpg"}));
  }
  else{
    console.log("Item already in cart:", id);
  }
//dispatch(addItem({id:1,name:"Sample Item",price:100,offerPrice:120,quantity:1,image:"/sample.jpg"}));
}
    return (
  
  
  <button onClick={addToCart} className="bg-[#695946] text-white px-3 py-1.5 rounded text-xs hover:bg-[#61503c] transition-colors">
        {selector.find(item=>item.id===id) ? "In Cart" : "Add to Cart"}    
          </button>


    )
}  
  
