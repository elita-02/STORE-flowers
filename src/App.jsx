import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { myRouter } from './router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Registration from "./pages/Registration/Registration";
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination } from 'swiper/modules';

function App() {

  return (
    <>
    <div className='wrapper '>
    <RouterProvider router = {myRouter}/>
    </div>
    </>
  )
}

export default App
