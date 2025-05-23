
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import categoryReducer from './category/categorySlice';
import aksyReducer from './Aksy/AksySlice'; 
import podarReducer from './podar/podarkiSlice';
import wishlistReducer from './wish/wishSlice';
import cartReducer from './cart/CartSlice'; 
import modalReducer from './modal/modalSlice';
import buketReducer from './PetalMaker/buketSlice'; 
import postsReducer from './newpost/postsSlice';
import ordersReducer from './order/ordersSlice'
import reviewsReducer from './reviews/reviewsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  category: categoryReducer,
  aksys: aksyReducer,
  podar: podarReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  modal: modalReducer,
  buket: buketReducer, 
  posts: postsReducer,
  orders: ordersReducer, 
  reviews: reviewsReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);