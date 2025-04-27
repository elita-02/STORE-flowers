import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaTelegram, FaInstagram } from "react-icons/fa";
import "./BurgerMenu.scss";

const BurgerMenu = ({ isMenuOpen, toggleMenu }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu(false); // Менюну жабуу функциясын чакырабыз
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
      <Link to="/" onClick={toggleMenu}>Главная</Link>
      <Link to="/reviews" onClick={toggleMenu}>Отзывы</Link>
      <Link to="/aksia" onClick={toggleMenu}>Акции</Link>
      <Link to="/postspage" onClick={toggleMenu}>Новости</Link>
      <Link to="/tovar" onClick={toggleMenu}>Каталог товаров</Link>
      <Link to="/PetalMaker" onClick={toggleMenu}>Создай букет</Link>

      <div className="right">
        <Link to="/login" onClick={toggleMenu}>Вход</Link>
        <span> | </span>
        <Link to="/registration" onClick={toggleMenu}>Регистрация</Link>
      </div>

      <div className="phone">996 702368268</div>

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
  );
};

export default BurgerMenu;