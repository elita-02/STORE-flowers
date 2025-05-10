import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import './BanNew.scss'
import image1 from '../../assets/img/image1.png';
import image2 from '../../assets/img/image2.png';
import image3 from '../../assets/img/image3.png';

function BanNew() {
  return (
    <div className='section2 container'>
      <div className='bush'>
        <h2>Новости</h2>
        <div className='p'>
          <Link to="/postspage">
            <p>Все новости</p>
          </Link>
          <div className='strel'>
            <IoIosArrowForward />
            <IoIosArrowForward />
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      
      <div className='block-text'>
        <div className='forum'>
          <h1>Какие цветы под запретом: что нельзя дарить</h1>
          <p>Осведомленности в сфере новых трендов цветочного дизайна и знакомства с работами...</p>
          <img src={image1} alt="Цветы под запретом" />
        </div>
        
        <div className='forum'>
          <h1>Как сохранить букет свежим: советы и рекомендации</h1>
          <p>Осведомленности в сфере новых трендов цветочного дизайна и знакомства с работами...</p>
          <img src={image2} alt="Сохранение букета" />
        </div>
        
        <div className='forum'>
          <h1>Цветочный этикет - как правильно дарить цветы</h1>
          <p>Осведомленности в сфере новых трендов цветочного дизайна и знакомства с работами...</p>
          <img src={image3} alt="Цветочный этикет" />
        </div>
      </div>
    </div>
  )
}

export default BanNew
