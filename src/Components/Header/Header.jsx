import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useSelector } from "react-redux";
import "./Header.scss";

// Assets
import logo from "../../assets/img/log.jpg";
import watsup from "../../assets/img/wat.png";
import instagram from "../../assets/img/instagra.webp";
import facbook from "../../assets/img/faceebook.png";
import search from "../../assets/svg/search.svg";
import wishlist from "../../assets/svg/wishlist.svg";
import car from "../../assets/svg/car.svg";
import call from "../../assets/svg/call.svg";
import pinkflowers from "../../assets/svg/pinkFlower.svg";
import karzint from "../../assets/svg/karzin.svg";
import serdechka from "../../assets/svg/serdechka.svg";

function Header() {
  const flowersRef = useRef([]);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const flowerElements = flowersRef.current.filter(Boolean);

    flowerElements.forEach((flower) => {
      gsap.fromTo(
        flower,
        {
          y: -200,
          x: Math.random() * 100 - 50,
          opacity: 0,
          rotation: Math.random() * 360,
        },
        {
          y: "+=405",
          opacity: 0.8,
          rotation: "+=720",
          duration: 8 + Math.random() * 4,
          repeat: -1,
          repeatDelay: 0.2,
          ease: "power1.inOut",
          force3D: true,
        }
      );
    });

    return () => flowerElements.forEach((f) => gsap.killTweensOf(f));
  }, []);

  return (
    <div className="header">
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
        {/* Flowers animation */}
        <div className="flower-container">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (flowersRef.current[i] = el)}
              className="flower"
              style={{
                left: `${Math.random() * 90}%`,
                width: `${20 + Math.random() * 50}px`,
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
            <Link to="/PetalMaker">Создай букет</Link>
          </nav>
        </div>

        <div className="contact-cart">
          <div className="social-icons">
            <img src={watsup} alt="WhatsApp" />
            <img src={instagram} alt="Instagram" className="ins" />
            <img src={facbook} alt="Facebook" />
          </div>

          <div className="phone">+86 (067) 829 30 30</div>

          <div className="cart-info">
            <Link to="/wishlist">
              <img src={serdechka} alt="Избранное" />
              {wishlistItems.length > 0 && (
                <span className="wishlist-badge">{wishlistItems.length}</span>
              )}
            </Link>

            <Link to="/korzina">
              <img src={karzint} alt="Корзина" />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
