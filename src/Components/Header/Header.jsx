
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./Header.scss";

// Иконкалар
import logo from "../../assets/img/log.jpg";
import watsup from "../../assets/svg/watsup.svg";
import instagram from "../../assets/svg/instagram.svg";
import facbook from "../../assets/svg/facbook.svg";
import karzin from "../../assets/svg/karzin.svg";
import search from "../../assets/svg/search.svg";
import serd from "../../assets/svg/serdechka.svg";
import wishlist from "../../assets/svg/wishlist.svg";
import car from "../../assets/svg/car.svg";
import call from "../../assets/svg/call.svg";
import pinkflowers from "../../assets/svg/pinkFlower.svg"
function Header() {
  const flowersRef = useRef([]);

  useEffect(() => {
    const flowerElements = flowersRef.current.filter(Boolean);

    flowerElements.forEach((flower, index) => {
      gsap.fromTo(flower,
        {
          y: -200,
          x: Math.random() * 100 - 50,
          opacity: 0,
          rotation: Math.random() * 360
        },
        {
          y: "+=405",
          opacity: 0.8,
          rotation: "+=" + 720,
          duration: 8 + Math.random() * 4,
          repeat: -1,
          repeatDelay: 0.2,
          ease: "power1.inOut",
          force3D: true
        }
      );
    });

    return () => flowerElements.forEach(f => gsap.killTweensOf(f));
  }, []);


  return (
    <div className="header">


      {/* Жогорку панель */}
      <div className="top-bar">
        <div className="container">
          <div className="left">
            <div className="selectors">
              <p>Валюта</p>
              <select>
                <option>UAH</option>
                <option>RUB</option>
                <option>SOM</option>
              </select>
              
              <p>Язык</p>
              <select>
                <option>RU</option>
                <option>KG</option>
                <option>ENG</option>
              </select>

              <p>Город</p>
              <select>
                <option>Bishkek</option>
                <option>Moskva</option>
                <option>Osh</option>
              </select>

              <div className="links">
                <div className="link-item">
                  <img src={wishlist} alt="Закладки" />
                  <Link to="/wishlist">Закладки</Link>
                </div>
                <div className="link-item">
                  <img src={car} alt="Доставка" />
                  <Link to="/dostavka">Доставка</Link>
                </div>
                <div className="link-item">
                  <img src={call} alt="Контакты" />
                  <Link to="/contacty">Контакты</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <Link to="/login">Вход</Link>
            <span> | </span>
            <Link to="/registration">Регистрация</Link>
          </div>
        </div>
      </div>

      
      <div className="main-header container">
              {/* Гул анимациясы */}
              <div className="flower-container">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i}
              ref={el => (flowersRef.current[i] = el)}
              className="flower"
              style={{
                left: `${Math.random() * 90}%`,
                width: `${20 + Math.random() * 50}px`
              }}
            >
              <img src={pinkflowers} alt="flower" />
            </div>
          ))}
        </div>
        <Link to="/">
          <img src={logo} alt="Логотип" className="logo" />
        </Link>

        <div className="search-section">
          <div className="search-bar">
            <div className="input_one">
              <input 
                className="input" 
                type="text" 
                placeholder="Поиск по категориям" 
              />
            </div>
            <div className="search">
              <input
                className="input_two"
                type="text"
                placeholder="Поиск по товарам"
              />
              <img src={search} alt="Поиск" />
            </div>
          </div>

          <nav className="forum-nav">
            <Link to="/">Поиск по категориям</Link>
            <Link to="/reviews">Отзывы</Link>
            <Link to="/aksia">Акции</Link>
            <Link to="/news">Новости</Link>
            <Link to="/info">Информация</Link>
          </nav>
        </div>

        <div className="contact-cart">
          <div className="social-icons">
            <img src={watsup} alt="WhatsApp" />
            <img src={instagram} alt="Instagram" />
            <img src={facbook} alt="Facebook" />
          </div>
          <div className="phone">+86 (067) 829 30 30</div>
          <div className="cart-info">
            <img src={serd} alt="Избранное" />
            <img src={karzin} alt="Корзина" />
            <span className="price">₴ 1 520</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

