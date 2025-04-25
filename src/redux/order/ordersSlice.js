import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: JSON.parse(localStorage.getItem('orders')) || []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    confirmOrder: (state, action) => {
      const orderId = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.confirmed = true;
      }
      localStorage.setItem('orders', JSON.stringify(state.orders));
    }
  }
});

export const { addOrder, confirmOrder } = ordersSlice.actions;
export default ordersSlice.reducer;

