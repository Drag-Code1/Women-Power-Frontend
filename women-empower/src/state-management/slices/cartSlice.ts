import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
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
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
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
