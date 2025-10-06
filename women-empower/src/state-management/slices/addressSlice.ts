import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Address {
 id:string;
    type: string;        // e.g., "home" or "work"
  address: string;     // street address or building name
  city: string;        // city name or detailed location
  state: string;       // state name
  pincode: string;     // postal/zip code
  landmark?: string;   // optional nearby landmark
  mobileNo: string;    // contact number (+91 format)
  userId: string;      // UUID of the user
}

interface AddressState {
  items: Address[];
}

const initialState: AddressState = {
  items:[
  ],
};

const AddressSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fillAddress(state, action: PayloadAction<Address[]>) {
      state.items = action.payload;
    },
    addAddress(state, action: PayloadAction<Address>) {
      state.items.push(action.payload);
    },
    removeAddress(state, action: PayloadAction<number>) {
    //   state.items = state.items.filter(item => item.id !== action.payload);
    },
 

  },
});

export const { addAddress, removeAddress ,fillAddress} = AddressSlice.actions;
export default AddressSlice.reducer;
