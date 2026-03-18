import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // {productId, name, price, image, qty}
};

const findIndex = (items, productId) =>
  items.findIndex((item) => item.productId === productId);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, name, price, image, qty = 1 } = action.payload;
      const index = findIndex(state.items, productId);
      if (index >= 0) {
        state.items[index].qty += qty;
      } else {
        state.items.push({ productId, name, price, image, qty });
      }
    },
    updateQuantity: (state, action) => {
      const { productId, qty } = action.payload;
      const index = findIndex(state.items, productId);
      if (index >= 0 && qty > 0) {
        state.items[index].qty = qty;
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

