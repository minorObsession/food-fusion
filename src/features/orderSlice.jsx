import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../services/apiOrders";

const initialState = {
  // orderID: null,
  closedOrders: [],
  orders: (await getOrders()) || [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createNewOrder(state, action) {
      state.orders.push(action.payload);
    },
  },
});

export const { createNewOrder } = orderSlice.actions;

export default orderSlice.reducer;
