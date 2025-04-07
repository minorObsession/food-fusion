import { createSlice } from "@reduxjs/toolkit";

// if fake user --> fake cart

const fakeCart = [
  {
    id: 7,
    name: "Eggplant Parmesan",
    ingredients: ["marinara", "mozzarella", "eggplant", "parmesan"],
    unitPrice: 52,
    soldOut: false,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pizza-photos/Eggplant Parmesan.jpg",
    foodType: null,
    quantity: 2,
  },
  {
    id: 6,
    name: "Mediterranean",
    ingredients: [
      "tomato",
      "mozzarella",
      "sun-dried tomatoes",
      "olives",
      "artichoke",
    ],
    unitPrice: 34,
    soldOut: false,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pizza-photos/Mediterranean.jpg?t=2024-07-29T19%3A42%3A26.460Z",
    foodType: null,
    quantity: 2,
  },
  {
    id: 14,
    name: "PIZZA 001",
    ingredients: ["A", "F", "S", "F", "", ""],
    unitPrice: 20,
    soldOut: null,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pizza-photos/IMG_5220.png",
    foodType: "pizza",
    quantity: 3,
  },
  {
    id: 3,
    name: "Carbonara",
    ingredients: ["spaghetti", "eggs", "Pecorino Romano cheese", "guanciale"],
    unitPrice: 25,
    soldOut: false,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pizza-photos/Diavola.jpg",
    foodType: null,
    quantity: 2,
  },
  {
    id: 2,
    name: "Baked Ziti",
    ingredients: [
      "ziti pasta",
      "ground beef",
      "ricotta cheese",
      "tomato sauce",
    ],
    unitPrice: 30,
    soldOut: false,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pasta-photos/stock-photo-baked-ziti-hearty-baked-pasta-dish-with-melted-cheese-and-savory-sauce-2475559951.jpg",
    foodType: null,
    quantity: 2,
  },
  {
    id: 100,
    name: "Mushroom Chicken Pasta",
    ingredients: ["mushrooms", "chicken", "garlic", "alfredo sauce"],
    unitPrice: 28,
    soldOut: null,
    image:
      "https://ioefjkssfcuhmvvolteu.supabase.co/storage/v1/object/public/pasta-photos/stock-photo-pasta-mushrooms-with-chicken-parmesa-and-basil-on-white-backgroun-copy-space-top-view-2250819991.jpg",
    foodType: "pasta",
    quantity: 2,
  },
];

const initialState = {
  user: "customer", // current username
  cart: [], // only empty if nothing in LS for that customer
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
      // LS SYNC
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
