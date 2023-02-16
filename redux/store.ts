import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import Cookies from 'js-cookie';

const saveToCookie = (store:any) => (next:any) => (action:any) => {
  const result = next(action);
  Cookies.set('cart', JSON.stringify(store.getState().cart));
  return result;
};

const persistedCartState = Cookies.get('cart');
const cartInitialState = persistedCartState
  ? JSON.parse(persistedCartState)
  : {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: ''
  };


const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {cart: cartInitialState},
  middleware: [saveToCookie]
});


export default store;
