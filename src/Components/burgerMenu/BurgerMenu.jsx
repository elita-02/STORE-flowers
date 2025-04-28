

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaTelegram, FaInstagram } from "react-icons/fa";
import "./BurgerMenu.scss";

const BurgerMenu = ({ isMenuOpen, toggleMenu }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`} ref={menuRef}>
      <div className="menu-header">
        <h3>Меню</h3>
        <button className="close-btn" onClick={() => toggleMenu(false)}>×</button>
      </div>

      <div className="menu-nav">
        <Link to="/" onClick={() => toggleMenu(false)}>Главная</Link>
        <Link to="/reviews" onClick={() => toggleMenu(false)}>Отзывы</Link>
        <Link to="/aksia" onClick={() => toggleMenu(false)}>Акции</Link>
        <Link to="/postspage" onClick={() => toggleMenu(false)}>Новости</Link>
        <Link to="/tovar" onClick={() => toggleMenu(false)}>Каталог товаров</Link>
        <Link to="/PetalMaker" onClick={() => toggleMenu(false)}>Создай свой букет</Link>
        <Link to="/forum" onClick={() => toggleMenu(false)}>Форум</Link>
      </div>

      <div className="menu-footer">
        <div className="right">
          <Link to="/login" onClick={() => toggleMenu(false)}>Вход</Link>
          <span> | </span>
          <Link to="/registration" onClick={() => toggleMenu(false)}>Регистрация</Link>
        </div>

        <div className="phone">996 702 368 268</div>

        <div className="social-icons">
          <a href="https://wa.me/996702368268" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
          <a href="https://t.me/BishkekFlowersBot" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaTelegram />
          </a>
          <a href="https://www.instagram.com/bishkekflowers17/" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;