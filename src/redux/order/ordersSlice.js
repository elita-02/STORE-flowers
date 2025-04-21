import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: JSON.parse(localStorage.getItem('orders')) || []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem('orders', JSON.stringify(state.list)); // persist
    },
    confirmOrder: (state, action) => {
      const index = state.list.findIndex((order) => order.createdAt === action.payload);
      if (index !== -1) {
        state.list[index].confirmed = true;
        localStorage.setItem('orders', JSON.stringify(state.list));
      }
    }
  }
});

export const { addOrder, confirmOrder } = ordersSlice.actions;
export default ordersSlice.reducer;

