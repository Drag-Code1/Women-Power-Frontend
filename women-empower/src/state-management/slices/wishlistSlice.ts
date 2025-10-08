import { Product } from '@/app/data/products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface tempWL{
  id:string,
            user_id:string,
            product_id:string,
}
interface WishlistState {
  // items: Product[];
  items:tempWL[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<Product>) {
      // Prevent duplicates by id
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearWishlist(state) {
      state.items = [];
    },
    fillWishlist(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, fillWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
