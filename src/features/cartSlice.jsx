import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      // console.log(action.payload);
      const itemInCart = state.cart
        .map((item) => item.name)
        .includes(action.payload.name);

      if (!itemInCart) {
        state.cart.push({ ...action.payload, quantity: 1 });

        state.cart.map(
          (item) => item.name === action.payload.name
        ).quantity = 1;
      }

      if (itemInCart) {
        state.cart.find((item) => item.id === action.payload.id).quantity++;
      }
    },

    deleteItemFromCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item.name !== action.payload.name
      );
    },

    increaseItemQuantity(state, action) {
      const itemInQuestion = state.cart.find(
        (item) => item.name === action.payload.name
      );
      if (!itemInQuestion) return;
      itemInQuestion.quantity++;
    },

    decreaseItemQuantity(state, action) {
      const itemInQuestion = state.cart.find(
        (item) => item.name === action.payload.name
      );

      if (!itemInQuestion) return;

      if (itemInQuestion.quantity > 1) itemInQuestion.quantity--;
      else {
        cartSlice.caseReducers.deleteItemFromCart(state, action);
      }
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItemToCart,
  deleteItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
