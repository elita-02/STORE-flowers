// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import categoryReducer from './category/categorySlice';
// import aksyReducer from './Aksy/aksySlice'; 
// import podarReducer from './podar/podarkiSlice';
// import wishlistReducer from './wish/wishSlice';
// import cartReducer from './cart/cartSlice'; 
// import modalReducer from './modal/modalSlice';
// import PetalMaker from '../pages/PetalMaker/PetalMaker';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = combineReducers({
//   category: categoryReducer,
//   aksys: aksyReducer,
//   podar: podarReducer,
//   wishlist: wishlistReducer,
//   cart: cartReducer, 
//   modal: modalReducer,
//   buket:buketReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);

// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import categoryReducer from './category/categorySlice';
import aksyReducer from './Aksy/aksySlice'; 
import podarReducer from './podar/podarkiSlice';
import wishlistReducer from './wish/wishSlice';
import cartReducer from './cart/cartSlice'; 
import modalReducer from './modal/modalSlice';
import buketReducer from './PetalMaker/buketSlice'; 
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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);