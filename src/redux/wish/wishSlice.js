import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    addWish: (state, action) => {
      const isExist = state.items.some((item) => item.id === action.payload.id);
      if (!isExist) {
        state.items.push(action.payload);
      }
    },
    removeWish: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addWish, removeWish } = wishSlice.actions;
export default wishSlice.reducer; 