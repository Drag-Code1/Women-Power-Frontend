import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
  id:string;
  userId: string;
  type:string
  // name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  // phone: string;
  landmark:string;
  mobileNo:string;
  // isDefault: boolean;
}


interface AddressState {
  items: Address[];
}

const initialState: AddressState = {
  items:[
  ],
};

const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    fillAddress(state, action: PayloadAction<Address[]>) {
      state.items = action.payload;
    },
    addNewAddress(state, action: PayloadAction<Address>) {
      console.log('new entry',action.payload)
      state.items.push(action.payload);
    },
    removeAddress(state, action: PayloadAction<string>) {
       console.log('delete id:::',action.payload)
      state.items = state.items.filter(item => item.id !== action.payload);
    },
 
updateAddress_(state, action: PayloadAction<Address >) {
  const  updatedData  = action.payload;
  console.log('update id:::', updatedData);

  state.items = state.items.map(item =>
    item.id === updatedData.id ? { ...item, ...updatedData } : item
  );
},

  },
});

export const { addNewAddress, removeAddress ,fillAddress,updateAddress_} = AddressSlice.actions;
export default AddressSlice.reducer;
