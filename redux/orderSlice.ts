import { createSlice } from "@reduxjs/toolkit";

//! Use createAsyncThunk

const initialState = {
    loading: false,
    error: null,
    order: {},
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
