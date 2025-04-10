// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: []
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     updateQuantity(state, action) {
//       const { id, quantity } = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
//       if (existingItem) {
//         existingItem.quantity += quantity;
//         // Сан 0дан аз болбошу керек
//         if (existingItem.quantity <= 0) {
//           existingItem.quantity = 1;
//         }
//       }
//     },
//     addToCart(state, action) {
//       const newItem = action.payload;
//       const existingItem = state.items.find(item => item.id === newItem.id);
//       if (existingItem) {
//         existingItem.quantity += newItem.quantity;
//       } else {
//         state.items.push(newItem);
//       }
//     }
//   }
// });

// export const { updateQuantity, addToCart } = cartSlice.actions;
// export default cartSlice.reducer;


// redux/cart/CartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity += quantity;
        if (item.quantity <= 0) {
          // quantity 0 же андан аз болсо, товарды өчүр
          state.items = state.items.filter(i => i.id !== id);
        }
      }
    },
  },
});

export const { addToCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
