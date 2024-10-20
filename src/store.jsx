import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import orderReducer from "./features/orderSlice";
import accountsReducer from "./features/accountsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    accounts: accountsReducer,
  },
});

export default store;
