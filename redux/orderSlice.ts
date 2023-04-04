import { createSlice } from "@reduxjs/toolkit";

//! Use createAsyncThunk
const initialState = {
    loading: true,
    error: '',
    order: {},
    successPay: false,
    loadingPay: false,
    errorPay:'',
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      // state.error = '';
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.order = action.payload;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload ;
    },
    payRequest: (state) => {
      state.loadingPay = true
    },
    paySuccess: (state) => {
      state.loadingPay = false
      state.successPay= true
    },
    payFail: (state, action) => {
      state.loadingPay = false
      state.errorPay = action.payload;
    },
    payReset: (state) => {
      state.loadingPay = false
      state.successPay = false
      state.errorPay = ''
    }
  },
});

export default orderSlice.reducer;
export const { fetchRequest, fetchSuccess, fetchFail, payRequest, paySuccess, payFail,payReset } = orderSlice.actions;
