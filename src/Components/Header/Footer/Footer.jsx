import React from 'react'
import "./Footer.scss"
import logo from "../../assets/img/log.jpg"
import { Link } from 'react-router-dom'
import master from "../../assets/img/mastercard.png"
import mastro from "../../assets/img/mastro.png"
import viselectro from "../../assets/img/viselectron.png"
import o from "../../assets/img/odengi.png"
import mbank from "../../assets/img/mbank.png"; 
import kampanon from "../../assets/img/kampan.jpg";
import bakai from "../../assets/img/bakai.png";
function Footer() {
  return (
    <div className='footer'>
      <div className='footer_top container'>
            <Link to="/">
                <img src={logo} alt="Логотип" className="logo" />
                </Link>        
        <div>
          <h4>ИНФОРМАЦИЯ</h4>
          <Link to="/about">О НАС</Link>
          <Link to="/delivery">ДОСТАВКА И ОПЛАТА</Link>
        </div>

        <div>
          <h4>СЛУЖБА ПОДДЕРЖКИ</h4>
          <Link to="/contacts">СВЯЗАТЬСЯ С НАМИ</Link>
          <Link to="/cooperation">ДЛЯ СОТРУДНИЧЕСТВА</Link>
        </div>

        <div>
          <h4>ЛИЧНЫЙ КАБИНЕТ</h4>
          <Link to="/profile">ЛИЧНЫЙ КАБИНЕТ</Link>
          <Link to="/wishlist">ЗАКЛАДКИ</Link>
          <Link to="/news">СПИСОК НОВОСТЕЙ</Link>
        </div>

        <div>
          <h4>ДОПОЛНИТЕЛЬНО</h4>
          <Link to="/gifts">ПОДАРОЧНЫЕ</Link>
          <Link to="/certificates">СЕРТИФИКАТЫ</Link>
          <Link to="/sales">АКЦИИ</Link>
        </div>
      </div>
      <div className='footer_bot container'>
         <p> pCopyright © 2021. Все права защищены</p>
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
   
  )
}

export default Footer
