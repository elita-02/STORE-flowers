import React, { useState, useEffect } from 'react';
import Elita from '../../assets/img/Elita.png';
import Nur from '../../assets/img/Nur.png'
import gul1 from '../../assets/svg/gul1.svg';
import gul2 from '../../assets/svg/gul2.svg';
import kamer from '../../assets/svg/kamer.svg';


import Aksy from '../Aksy/Aksy';
import './Banner.scss';
import Podarki from '../podar/Podarki';
import BanNew from '../BanNew/BanNew';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      image: "https://www.caravan.kz/wp-content/uploads/images/685748.jpg",
      title: "BISHKEK-FLOWERS",
      text: "Волшебный мир цветов"
    },
    {
      image: "https://static.lepestki.ua/filestorage/products/338/67593/main.jpg",
      title: "Для особых моментов",
      text: "Эксклюзивные букеты от лучших флористов"
    },
    {
      image: "https://www.royal-flowers.dp.ua/image/cache/catalog/tulips/51-tulip-pink-lavender-720x720.jpg",
      title: "Ежедневная доставка",
      text: "Свежие цветы к любому мероприятию"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='banner'>
      <div className="banner-container">
        <AnimatePresence mode='wait'>
          {slides.map((slide, index) => (
            index === activeIndex && (
              <motion.div
                key={index}
                className="slide-background"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ backgroundImage: `url(${slide.image})` }} // Түзөтүлгөн линия
              >
                <div className="dark-overlay"></div>

                <motion.div
                  className="content"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h1 className="title">{slide.title}</h1>
                  <motion.p
                    className="subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {slide.text}
                  </motion.p>
                  <motion.button
                    className="cta-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="checkoutpage">
                      Сделать заказ
                    </Link>
                  </motion.button>
                </motion.div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <Aksy />
      <div className='floristy'>

        <div className="florist-header">
          <h1 className="section-title">
            <img src={gul1} alt="цветок" className="deco-flower left" />
            Мастера цветочных композиций
            <img src={gul2} alt="цветок" className="deco-flower right" />
          </h1>
          <p className="section-subtitle">
            Мы не просто собираем цветы — мы создаём настроение. 
            Наши флористы подбирают каждую деталь с любовью и заботой.
          </p>
        </div>
        <div className="florist-cards-compact">
          <div className="florist-card-static">
            <div className="card-inner">
              <div className="front-content">
                <div className="card-header">
                  <img src={Nur} alt="Алия" className="florist-photo" />
                  <h3>Нурзада – мастер композиций</h3>
                  <p>Каждую корзину она собирает с особой нежностью и вкусом.</p>
                </div>
                <div className="question-block">
                  <p className="question-text">"Как выбрать идеальный букет?"</p>
                </div>
              </div>

              <div className="hover-content">
                <div className="answer-block">
                  <p className="answer-text">
                    ✔ Сезонные цветы<br />
                    ✔ Учет характера<br />
                    ✔ Персональный подход
                  </p>
                  <div className="signature">
                    <img src={kamer} alt="подпись" className="sign-icon" />
                    <span>#СтильОтАлии</span>
                  </div>
                </div>
                <img src={gul1} className="hover-flower" alt="цветок" />
              </div>
            </div>
          </div>

          <div className="florist-card-static">
            <div className="card-inner">
              <div className="front-content">
                <div className="card-header">
                  <img src={Elita} alt="Дана" className="florist-photo" />
                  <h3>Элита – вдохновитель природы</h3>
                  <p>Любит сочетать классику и свежие идеи в каждой</p>
                </div>
                <div className="question-block">

                  <p className="question-text">"Как сохранить свежесть букета?"</p>
                </div>
              </div>

              <div className="hover-content">
                <div className="answer-block">
                  <p className="answer-text">
                    ✽ Спецраствор в подарок<br />
                    ✽ Правильная обрезка<br />
                    ✽ Уход инструкция
                  </p>
                  <div className="signature">
                    <img src={kamer} alt="подпись" className="sign-icon" />
                    <span>#СоветыДаны</span>
                  </div>
                </div>
                <img src={gul2} className="hover-flower" alt="цветок" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Podarki />
      <BanNew />
    
    </div>
  );
}

export default Banner;
