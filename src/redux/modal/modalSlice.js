// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isOpen: false,
//   items: [],
// };

// const modalSlice = createSlice({
//   name: 'modal',
//   initialState,
//   reducers: {
//     openModal: (state, action) => {
//       state.isOpen = true;
//       state.items = action.payload;
//     },
//     closeModal: (state) => {
//       state.isOpen = false;
//     },
//     removeItem: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload); 
//     },
//   },
// });

// export const { openModal, closeModal, removeItem } = modalSlice.actions;

// export default modalSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  items: [],
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.items = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.items = [];
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { openModal, closeModal, removeItem } = modalSlice.actions;

export const selectModal = (state) => state.modal;

export default modalSlice.reducer;