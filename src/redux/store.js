import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import aksyReducer from './Aksy/AksySlice';
import podarReducer from './podar/podarkiSlice';

export const mystore = configureStore({
  reducer: {
    category: categoryReducer,
    aksys: aksyReducer,
    podar: podarReducer, 
  },
});
