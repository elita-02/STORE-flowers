import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { myRouter } from './router';
// import 'bootstrap@5.3.5/dist/css/bootstrap.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
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
