
import React from "react";
import "./Header.scss";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import wishlist from "../../assets/svg/wishlist.svg";
import car from "../../assets/svg/car.svg";
import call from "../../assets/svg/call.svg";
import logo from "../../assets/img/log.jpg";
import watsup from "../../assets/svg/watsup.svg";
import instagram from "../../assets/svg/instagram.svg";
import facbook from "../../assets/svg/facbook.svg";
import karzin from "../../assets/svg/karzin.svg";
import search from "../../assets/svg/search.svg"
import serd from "../../assets/svg/serdechka.svg"
function Header() {
  return (
    <div className="header">
      <div className="top-bar ">
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
              <img src={wishlist} alt="" />
              <Link to="/wishlist">Закладки</Link>
            </div>
            <div className="link-item">
              <img src={car} alt="" />
              <Link to="/dostavka">Доставка</Link>
            </div>
            <div className="link-item">
              <img src={call} alt="" />
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
        <Link to="/">
        <img src={logo} alt="Логотип" className="logo" />
        </Link>
        
        <div className="search-section">
          <div className="search-bar">
            <div className="input_one">
            <input className="input" type="text"   
            placeholder="Поиск по категориям" />
            </div>
            <div>
                <div className="search">
            <input className="input_two" type="text" placeholder="Китают товаров" />
            <img src={search} alt="" />
                </div>
            </div>
          </div>
          <div>
               
      <nav className="forum-nav">
        <Link to="/">Поиск по категориям</Link>
        <Link to="/reviews">Отзывы</Link>
        <Link to="/aksia">Акции</Link>
        <Link to="/news">Новости</Link>
        <Link to="/info">Информация</Link>
      </nav>

          </div>
        </div>
        <div className="contact-cart">
          <div className="social-icons">
            <img src={watsup} alt="WhatsApp" />
            <img src={instagram} alt="Instagram" />
            <img src={facbook} alt="Facebook" />
          </div>
          <div className="phone">+86 (067) 829 30 30</div>
          <div className="cart-info">
            <img src={serd} alt="сердечка" />
            <img src={karzin} alt="Корзина" />
            <span className="price">₴ 1 520</span>
          </div>
        </div>
      </div>
      {/* Верхняя панель */}

    </div>

      
  )}
export default Header;

