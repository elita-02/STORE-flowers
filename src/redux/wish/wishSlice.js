// import { createSlice } from "@reduxjs/toolkit";

// const wishSlice = createSlice({
//   name: "wishlist",
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addWish: (state, action) => {
//       const isExist = state.items.some((item) => item.id === action.payload.id);
//       if (!isExist) {
//         state.items.push(action.payload);
//       }
//     },
//     removeWish: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//   },
// });

// export const { addWish, removeWish } = wishSlice.actions;
// export default wishSlice.reducer; 

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Каалоо тизмесине кошуу
    addWish: (state, action) => {
      const isExist = state.items.some(item => item.id === action.payload.id);
      if (!isExist) {
        state.items.push(action.payload);
      }
    },
    
    // Каалоо тизмесинен өчүрүү
    removeWish: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    // Бардыгын тазалоо (опциялык)
    clearWishlist: (state) => {
      state.items = [];
    }
  },
});

export const { addWish, removeWish, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;