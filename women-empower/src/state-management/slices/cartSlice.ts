import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  cartId:string,
  productId:string
quantity: number;
  image: string|null;
    productName: string|null;
  price: number|null;
  categoryName:string|null;
  discount:number|null
}


interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items:[
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fillCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addItem(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<CartItem>) {
      const item = state.items.find(item => item.id === action.payload.id);
console.log('redux item',item)

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart ,fillCart} = cartSlice.actions;
export default cartSlice.reducer;
// {
//     "success": true,
//     "message": "item updated",
//     "data": {
//         "id": "89adf612-ac6a-4e86-bc15-cc56550530d6",
//         "cartId": "a3508c3d-9784-4d8a-bdad-ea0ffaa4c9cc",
//         "productId": "e6be4057-4313-4fe4-aa40-8894be3da395",
//         "quantity": 2
//     }
// }