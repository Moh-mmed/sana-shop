import { createSlice } from "@reduxjs/toolkit";
// import Cookies from 'js-cookie';
import { ProductTypes } from "../types/DataTypes";


// console.log(Cookies.get('cart'))

const initialState = {
   cartItems: [{
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
    }],
    shippingAddress: {},
    paymentMethod: 'ddd'
//   cart: Cookies.get('cart')
//     ? JSON.parse('{ cartItems: [], shippingAddress: {}, paymentMethod: "" }')
//     : { cartItems: [], shippingAddress: {}, paymentMethod: '' },
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item:ProductTypes) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cartItems.map((item:ProductTypes) =>
            item.name === existItem.name ? newItem : item
        ): [...state.cartItems, newItem];
          
    //   Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      state = { ...state, cartItems };
    },
    removeProduct: (state, action) => {
      const cartItems = state.cartItems.filter(
        (item:ProductTypes) => item.slug !== action.payload.slug
      );
    //   Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      state = { ...state, cartItems };
    },
    reset: (state) => {
       state = {
            cartItems: [],
            shippingAddress: { location: {} },
            paymentMethod: '',
        }
    },
  },
});

export default cartSlice.reducer;
export const { addProduct, removeProduct, reset } = cartSlice.actions;
