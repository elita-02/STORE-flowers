import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice"
import aksyReducer from './Aksy/AksySlice'; 

export const mystore = configureStore({
  reducer: {
    category: categoryReducer,
    aksys: aksyReducer, 
  },
});