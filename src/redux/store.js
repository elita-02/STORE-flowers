import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import aksyReducer from './Aksy/AksySlice';
import podarReducer from './podar/podarkiSlice';
import wishlistReducer from "./wish/wishSlice"; 
import cartReducer from "./cart/CartSlice"
import modalReducer from "./modal/modalSlice"
export const mystore = configureStore({
  reducer: {
    category: categoryReducer,
    aksys: aksyReducer,
    podar: podarReducer, 
    wishlist: wishlistReducer, 
    cart: cartReducer, 
    modal: modalReducer,

  },
});
