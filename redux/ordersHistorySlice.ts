import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: true,
    error: '',
    orders: [],
};

const ordersHistorySlice = createSlice({
  name: "ordersHistory",
  initialState,
    reducers: {
        fetchRequest: (state) => {
            state.loading = true
      },
        fetchSuccess: (state, action) => {
            state.loading = false
            state.error = ''
            state.orders = action.payload
      },
        fetchFail: (state, action) => {
           state.loading = false
            state.error = action.payload
            state.orders = []
      },
  },
});

export default ordersHistorySlice.reducer;
export const {fetchRequest, fetchSuccess,fetchFail} = ordersHistorySlice.actions;
