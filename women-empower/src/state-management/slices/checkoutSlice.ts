import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface CheckoutItem {
//    id:number
//     title: string
//     subtitle:string
//     price: number
//     originalPrice: number
//     rating: number
//     quantity: number
//     reviews: number
// }
export interface CheckoutItem {
   id:number
    title: string
    subtitle:string
    price: number
    originalPrice: number
    rating: number
    quantity: number
    reviews: number
}


interface CheckoutState {
  items: CheckoutItem[];
}

const initialState: CheckoutState = {
  items: [],
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addToCheckout(state, action: PayloadAction<CheckoutItem>) {
      state.items.push(action.payload);
      // console.log(action.payload);
    },
    removeFromCheckout(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCheckoutQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCheckout(state) {
      state.items = [];
    },
    fillCheckout(state, action: PayloadAction<CheckoutItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { addToCheckout, removeFromCheckout, updateCheckoutQuantity, clearCheckout, fillCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
