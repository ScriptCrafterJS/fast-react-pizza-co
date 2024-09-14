import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // action holds the item id
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // action holds the item id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // action holds the item id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export const getNumOfItems = (store) =>
  store.cart.cart.reduce((total, item) => total + item.quantity, 0);
export const getTotalPrice = (store) =>
  store.cart.cart.reduce((total, item) => total + item.totalPrice, 0);

export const getCart = (store) => store.cart.cart;

export const getCurrentQuantityById = (id) => {
  return (store) =>
    store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
};
export default cartSlice.reducer;
