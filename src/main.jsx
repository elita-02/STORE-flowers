// import 'bootstrap/dist/css/bootstrap.min.css';
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux'
// import { mystore } from './redux/store.js'
// import { ToastContainer, toast } from 'react-toastify';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//   <Provider store={mystore}>
//    <App/>
//    <ToastContainer/>
//   </Provider>
//  </StrictMode>,
// )


// import 'bootstrap/dist/css/bootstrap.min.css';
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { Provider } from 'react-redux';
// import { mystore, persistor } from './redux/store.js'; // <-- mystore туура аталышта болсо
// import { PersistGate } from 'redux-persist/integration/react';
// import { ToastContainer } from 'react-toastify';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={mystore}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//       <ToastContainer />
//     </Provider>
//   </StrictMode>,
// );


import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </StrictMode>
);
