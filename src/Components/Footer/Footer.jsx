import React, { useState } from 'react';
import "./Footer.scss";
import logo from "../../assets/img/log.jpg";
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 
import master from "../../assets/img/mastercard.png";
import mastro from "../../assets/img/mastro.png";
import viselectro from "../../assets/img/viselectron.png";
import o from "../../assets/img/odengi.png";
import mbank from "../../assets/img/mbank.png";
import kampanon from "../../assets/img/kampan.jpg";
import bakai from "../../assets/img/bakai.png";

function Footer() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [extraOpen, setExtraOpen] = useState(false);

  const toggleInfo = () => {
    setInfoOpen(!infoOpen);
  };

  const toggleSupport = () => {
    setSupportOpen(!supportOpen);
  };

  const toggleAccount = () => {
    setAccountOpen(!accountOpen);
  };

  const toggleExtra = () => {
    setExtraOpen(!extraOpen);
  };

  return (
    <div className='footer'>
      <div className='footer_top container'>
        <Link to="/">
          <img src={logo} alt="Логотип" className="logo" />
        </Link>
        <div>
          <h4 onClick={toggleInfo} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            ИНФОРМАЦИЯ
            {infoOpen ? <FaChevronUp /> : <FaChevronDown />}
          </h4>
          <div className={`links ${infoOpen ? 'open' : ''}`}>
            <Link to="/info">О НАС</Link>
          </div>
        </div>

        <div>
          <h4 onClick={toggleSupport} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            СЛУЖБА ПОДДЕРЖКИ
            {supportOpen ? <FaChevronUp /> : <FaChevronDown />}
          </h4>
          <div className={`links ${supportOpen ? 'open' : ''}`}>
            <Link to="/contacty">СВЯЗАТЬСЯ С НАМИ</Link>
            <Link to="/cooperation">ДЛЯ СОТРУДНИЧЕСТВА</Link>
          </div>
        </div>

        <div>
          <h4 onClick={toggleAccount} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            ЛИЧНЫЙ КАБИНЕТ
            {accountOpen ? <FaChevronUp /> : <FaChevronDown />}
          </h4>
          <div className={`links ${accountOpen ? 'open' : ''}`}>
            <Link to="/registration">ЛИЧНЫЙ КАБИНЕТ</Link>
            <Link to="/wishlist">ЗАКЛАДКИ</Link>
            <Link to="/news">СПИСОК НОВОСТЕЙ</Link>
          </div>
        </div>

        <div>
          <h4 onClick={toggleExtra} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            ДОПОЛНИТЕЛЬНО
            {extraOpen ? <FaChevronUp /> : <FaChevronDown />}
          </h4>
          <div className={`links ${extraOpen ? 'open' : ''}`}>
            <Link to="/PetalMaker">CОЗДАЙ СВОЙ БУКЕТ</Link>
            <Link to="/reviews">ОТЗЫВЫ</Link>
            <Link to="/aksia">АКЦИИ</Link>
          </div>
        </div>
      </div>
      <div className='footer_bot container'>
        <div className='footer_img'>
          <p>Способы оплаты:</p>
          <a href="https://www.mbank.kg" target="_blank" rel="noopener noreferrer">
            <img src={mbank} alt="Mbank" />
          </a>
          <a href="https://www.kompanion.kg" target="_blank" rel="noopener noreferrer">
            <img src={kampanon} alt="Kompanion" />
          </a>
          <a href="https://www.bakai.kg" target="_blank" rel="noopener noreferrer">
            <img src={bakai} alt="Bakai" />
          </a>
          <a href="https://dengi.kg" target="_blank" rel="noopener noreferrer">
            <img src={o} alt="odengi" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;