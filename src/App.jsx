import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { myRouter } from './router'

function App() {

  return (
    <>
    <div className='wrapper'>
    <RouterProvider router = {myRouter}/>
    </div>
    </>
  )
}

export default App
