import { createSlice } from "@reduxjs/toolkit";
import { getAccounts } from "../services/apiAccounts";
import toast from "react-hot-toast";

const initialState = {
  accounts: (await getAccounts()) || [],
  currentAccount: JSON.parse(localStorage.getItem("currentAccount")) || null,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    newAccount(state, action) {
      // ! do the checks...

      state.accounts.push(action.payload);
      state.currentAccount = action.payload;
    },

    logIntoAccount(state, action) {
      // ! find if account exists
      const account = state.accounts.find(
        (acc) =>
          acc.username === action.payload.username &&
          +acc.password === +action.payload.password
      );

      if (!account) {
        toast.error("Wrong credentials.. Please try again");

        return;
      }

      // ! make it current
      state.currentAccount = account;

      toast.success("Login successful");
    },

    fakeLogin(state, action) {
      const account = state.accounts.find(
        (acc) =>
          acc.username === action.payload.username &&
          acc.password === action.payload.password
      );

      // ! make it current
      state.currentAccount = account;

      toast.success("Login successful");
    },

    logOutOfAccount(state) {
      state.currentAccount = null;
      localStorage.removeItem("currentAccount");
      console.log("removed");
      toast.success("You've successfully logged out");
    },
  },
});

export const { newAccount, logIntoAccount, logOutOfAccount, fakeLogin } =
  accountsSlice.actions;

export default accountsSlice.reducer;
