import React from 'react'
import roza from '../../assets/svg/roza.svg'
import gul from '../../assets/svg/gul.svg'
import podar from '../../assets/svg/podar.svg'
// import korob from '../../assets/svg/korob.svg'
import photo from '../../assets/img/photo.png'
import present from '../../assets/img/present.png'
import gul1 from '../../assets/svg/gul1.svg'
import gul2 from '../../assets/svg/gul2.svg'
// import podar1 from '../../assets/svg/podar1.svg'
import kamer from '../../assets/svg/kamer.svg'
import image1 from '../../assets/img/image1.png'
import image2 from '../../assets/img/image2.png'
import image3 from '../../assets/img/image3.png'
import { IoIosArrowForward } from "react-icons/io";
import Aksy from '../Aksy/Aksy'
import './Banner.scss'

function Banner() {
    return (
        <div className='banner container'>
            <section className='section'>
                <div className='block'>
                    <div className='block-div'>
                        <img className='img' src={roza} alt="" />
                        <h1>Скидки <span>-6%</span>  на все букеты <span> по предзаказу </span>на 8 марта</h1>
                    </div>
                    <div className='block1-div'>
                        <div className='div'>
                            <img className='img1' src={gul} alt="" />
                            <h1>Розы</h1>
                        </div>
                        <div className='div'>
                            <img className='img1' src={podar} alt="" />
                            <h1>Подарки</h1>
                        </div>
                        <div className='div'>
                            <img className='img1' src="https://www.max-gift.ru/wp-content/uploads/2025-03-14-15.37.35.jpg" alt="" />
                            <h1>Подарочные корзины</h1>
                        </div>
                        <div className='div'>
                            <img className='img1' src="https://florcat.ru/upload/delight.webpconverter/upload/iblock/dce/8igwnmlero3qanaglqiev1scg49gp6iy.JPG.webp?1741025829327372" alt="" />
                            <h1>Цветы в коробке</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className='section1'>
                <div className='cards'>
                    <div className='card'>
                        {/* <h1>Фото доставок наших букетов</h1>
                        <p>Безупречное качество обслуживания и доставка в любую точку города</p>
                        <div>
                            <img src={gul1} alt="" />
                            <img src={korob} alt="" />
                        </div> */}
                        <img src={photo} alt="" />
                    </div>
                    <div className='card1'>
                        <h1>Видео отчеты клиентов</h1>
                        <p>Наши счастливые клиенты с букетами от Flowers-Ukraine </p>
                        <div className='gul1'>
                            <img src={gul2} alt="" />
                        </div>
                        <div className='gul2'>
                            <img src={gul1} alt="" />

                        </div>
                        <img src={kamer} alt="" />
                    </div>
                    <div className='card2'>
                        {/* <h1>Подарок каждому клиенту</h1>
                        <p>К каждому заказу мы прилогаем комплимент от компании 
                        в виде маленького презента</p>
                        <div>
                        <img src={gul2} alt="" />
                        <img src={podar1} alt="" />
                        </div> */}
                        <img src={present} alt="" />
                    </div>
                </div>
            </section>
                        <Aksy />
            <section className='section2'>
                <div className='block1'>
                    <div className='bush'>
                        <h2>Форум</h2>
                        <div className='p'>
                            <p>Все новости</p>
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
                            <img src={image1} alt="" />
                        </div>
                        <div className='forum1'>
                            <h1>Как сохранить букет свежим: советы и рекомендации</h1>
                            <p>Осведомленности в сфере новых трендов цветочного дизайна и знакомства с работами...</p>
                            <img src={image2} alt="" />
                        </div>
                        <div className='forum2'>
                            <h1>Цветочный этикет - как правильно дарить цветы</h1>
                            <p>Осведомленности в сфере новых трендов цветочного дизайна и знакомства с работами...</p>
                            <img src={image3} alt="" />
                        </div>
                    </div>





                </div>
            </section>
        </div>
    )
}

export default Banner;
