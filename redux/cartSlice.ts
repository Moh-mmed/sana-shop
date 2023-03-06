import { createSlice } from "@reduxjs/toolkit";
import { ProductTypes } from "../types/ProductTypes";

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
        (item: ProductTypes) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cartItems.map((item:ProductTypes) =>
            item.name === existItem.name ? newItem : item
        ): [...state.cartItems, newItem];
      state.cartItems = cartItems;
    },
    removeProduct: (state, action) => {
      const cartItems = state.cartItems.filter(
        (item:ProductTypes) => item.slug !== action.payload.slug
      );
       state.cartItems = cartItems;
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = {...action.payload}
    },
    addPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
    clearCartItems: (state) => {
      state.cartItems = []
    },
    reset: (state) => {
      state.cartItems = []
      state.shippingAddress = {}
      state.paymentMethod = ''
    },
  },
});

export default cartSlice.reducer;
export const { addProduct, removeProduct, reset, addShippingAddress,addPaymentMethod, clearCartItems } = cartSlice.actions;
