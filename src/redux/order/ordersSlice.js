import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: JSON.parse(localStorage.getItem('orders')) || []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        id: Date.now(),
        confirmed: false,
        userId: action.payload.userId
      };
      state.list.unshift(newOrder);
      localStorage.setItem('orders', JSON.stringify(state.list));
    },
    confirmOrder: (state, action) => {
      const order = state.list.find(order => order.id === action.payload);
      if (order) {
        order.confirmed = true;
        localStorage.setItem('orders', JSON.stringify(state.list));
      }
    }
  }
});

export const { addOrder, confirmOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
