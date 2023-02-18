import { createSlice } from "@reduxjs/toolkit";
import { CartItemTypes } from "../types/CartItemTypes";
      

const initialState = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: ''
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state:any, action) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item: CartItemTypes) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cartItems.map((item:CartItemTypes) =>
            item.name === existItem.name ? newItem : item
        ): [...state.cartItems, newItem];
      state.cartItems = cartItems;
    },
    removeProduct: (state, action) => {
      const cartItems = state.cartItems.filter(
        (item:CartItemTypes) => item.slug !== action.payload.slug
      );
       state.cartItems = cartItems;
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = {...action.payload}
    },
    reset: (state) => {
      state.cartItems = []
      state.shippingAddress = {}
      state.paymentMethod = ''
    },
  },
});

export default cartSlice.reducer;
export const { addProduct, removeProduct, reset, addShippingAddress } = cartSlice.actions;
