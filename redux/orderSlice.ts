import { createSlice } from "@reduxjs/toolkit";

//! Use createAsyncThunk

// const initialState = {
//     loading: false,
//     error: null,
//     order: {},
//     successPay: false,
//     loadingPay: false,
//     loadingDeliver: false,
//     successDeliver: false,
// };

const initialState = {
    loading: false,
    error: null,
    order: {
      _id: '63f0fb872bf874f1a024f807',
      user: {
      _id: '63ef6ccc73d3cc9bb30a1acf',
      name: "John",
      email: "admin@example.com",
      password: "$2a$10$DNm35JoMnWuYQNTnyTHSOOZTwmXK2FlETw/wTzvLTkaSFYlW8uxya",
      isAdmin: true
      },
      orderItems: [
        {
          _id:'63ef6ccc73d3cc9bb30a1ad6',
          name: 'Free Shirt',
          slug: 'free-shirt',
          category: 'Shirts',
          image: '/images/shirt1.jpg',
          price: 70,
          brand: 'Nike',
          rating: 4.5,
          numReviews: 8,
          countInStock: 20,
          description: 'A popular shirt',
          quantity: 2,
          isFeatured: true,
          banner: '/images/banner1.jpg',
        }
      ],
      shippingAddress: {
        fullName: 'Mohammed Ben aoumeur',
        address: 'Akevler Mh. 1069. Sk.,Ntowers sitesi, Block No: 07, Daire: 184',
        city: 'Istanbul',
        postalCode: '30152',
        country: 'Turkey'
      },
      paymentMethod: 'Stripe',
      itemsPrice: 170,
      shippingPrice: 15,
      taxPrice: 25.5,
      totalPrice: 210.5,
      isPaid: false,
      paidAt: '2023-02-18T16:23:35.845+00:00',
      isDelivered: false,
      deliveredAt:false,
    },
    successPay: false,
    loadingPay: false,
    loadingDeliver: false,
    successDeliver: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      //...
    },
    fetchSuccess: (state, action) => {
      //...
    },
    fetchFail: (state, action) => {
      //...
    },
    payRequest: (state) => {
      //...
    },
    paySuccess: (state, action) => {
      //...
    },
    payFail: (state, action) => {
      //...
    },
    payReset: (state) => {
      //...
    },
    deliverRequest: (state) => {
      //...
    },
    deliverSuccess: (state, action) => {
      //...
    },
    deliverFail: (state, action) => {
      //...
    },
    deliverReset: (state) => {
      //...
    },
    reset: (state) => {''
    },
  },
});

export default orderSlice.reducer;
export const {fetchRequest, fetchSuccess, fetchFail,payRequest, paySuccess, payFail, payReset, deliverRequest, deliverSuccess, deliverFail,deliverReset, reset} = orderSlice.actions;
