// import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./Header.scss";

// // Иконкалар
// import logo from "../../assets/img/log.jpg";
// import watsup from "../../assets/svg/watsup.svg";
// import instagram from "../../assets/svg/instagram.svg";
// import facbook from "../../assets/svg/facbook.svg";
// import karzin from "../../assets/svg/karzin.svg";
// import search from "../../assets/svg/search.svg";
// import serd from "../../assets/svg/serdechka.svg";
// import wishlist from "../../assets/svg/wishlist.svg";
// import car from "../../assets/svg/car.svg";
// import call from "../../assets/svg/call.svg";

// gsap.registerPlugin(ScrollTrigger);

// function Header() {
//   const flowerRef = useRef(null);

//   useEffect(() => {
//     gsap.from(flowerRef.current, {
//       duration: 2,
//       scale: 0,
//       opacity: 0,
//       rotate: 360,
//       ease: "power4.out",
//       scrollTrigger: {
//         trigger: flowerRef.current,
//         start: "top center",
//       },
//     });
//   }, []);

//   return (
//     <div className="header">
//       {/* Гул анимациясы */}
//       <div className="flower-animation" ref={flowerRef}>
//         {[...Array(6)].map((_, i) => (
//           <div key={i} className="flower-petal" />
//         ))}
//       </div>

//       {/* Жогорку панель */}
//       <div className="top-bar">
//         <div className="container">
//           <div className="left">
//             <div className="selectors">
//               <p>Валюта</p>
//               <select>
//                 <option>UAH</option>
//                 <option>RUB</option>
//                 <option>SOM</option>
//               </select>
              
//               <p>Язык</p>
//               <select>
//                 <option>RU</option>
//                 <option>KG</option>
//                 <option>ENG</option>
//               </select>

//               <p>Город</p>
//               <select>
//                 <option>Bishkek</option>
//                 <option>Moskva</option>
//                 <option>Osh</option>
//               </select>

//               <div className="links">
//                 <div className="link-item">
//                   <img src={wishlist} alt="Закладки" />
//                   <Link to="/wishlist">Закладки</Link>
//                 </div>
//                 <div className="link-item">
//                   <img src={car} alt="Доставка" />
//                   <Link to="/dostavka">Доставка</Link>
//                 </div>
//                 <div className="link-item">
//                   <img src={call} alt="Контакты" />
//                   <Link to="/contacty">Контакты</Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="right">
//             <Link to="/login">Вход</Link>
//             <span> | </span>
//             <Link to="/registration">Регистрация</Link>
//           </div>
//         </div>
//       </div>

//       {/* Негизги хедер */}
//       <div className="main-header container">
//         <Link to="/">
//           <img src={logo} alt="Логотип" className="logo" />
//         </Link>

//         <div className="search-section">
//           <div className="search-bar">
//             <div className="input_one">
//               <input 
//                 className="input" 
//                 type="text" 
//                 placeholder="Поиск по категориям" 
//               />
//             </div>
//             <div className="search">
//               <input
//                 className="input_two"
//                 type="text"
//                 placeholder="Китают товаров"
//               />
//               <img src={search} alt="Поиск" />
//             </div>
//           </div>

//           <nav className="forum-nav">
//             <Link to="/">Поиск по категориям</Link>
//             <Link to="/reviews">Отзывы</Link>
//             <Link to="/aksia">Акции</Link>
//             <Link to="/news">Новости</Link>
//             <Link to="/info">Информация</Link>
//           </nav>
//         </div>

//         <div className="contact-cart">
//           <div className="social-icons">
//             <img src={watsup} alt="WhatsApp" />
//             <img src={instagram} alt="Instagram" />
//             <img src={facbook} alt="Facebook" />
//           </div>
//           <div className="phone">+86 (067) 829 30 30</div>
//           <div className="cart-info">
//             <img src={serd} alt="Избранное" />
//             <img src={karzin} alt="Корзина" />
//             <span className="price">₴ 1 520</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;

// // Header.jsx
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

// import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import gsap from "gsap";
// import "./Header.scss";

// // Иконки
// import logo from "../../assets/img/log.jpg";
// import watsup from "../../assets/svg/watsup.svg";
// import instagram from "../../assets/svg/instagram.svg";
// import facbook from "../../assets/svg/facbook.svg";
// import karzin from "../../assets/svg/karzin.svg";
// import search from "../../assets/svg/search.svg";
// import serd from "../../assets/svg/serdechka.svg";
// import car from "../../assets/svg/car.svg";
// import call from "../../assets/svg/call.svg";
// import pinkflowers from "../../assets/svg/pinkFlower.svg";

// function Header() {
//   const flowersRef = useRef([]);

//   useEffect(() => {
//     const flowerElements = flowersRef.current.filter(Boolean);
    
//     flowerElements.forEach((flower, index) => {
//       gsap.fromTo(flower,
//         {
//           y: -200,
//           opacity: 0,
//           rotation: Math.random() * 360,
//           x: Math.random() * 100 - 50
//         },
//         {
//           y: "+=600",
//           opacity: 1,
//           rotation: "+=" + (360 + Math.random() * 180),
//           duration: 12 + Math.random() * 6,
//           repeat: -1,
//           ease: "power1.inOut",
//           delay: index * 0.3
//         }
//       );
//     });

//     return () => flowerElements.forEach(f => gsap.killTweensOf(f));
//   }, []);

//   return (
//     <header className="header">
//       {/* Верхняя панель */}
//       <div className="top-bar">
//         <div className="container">
//           <div className="left">
//             <div className="selectors">
//               <select defaultValue="UAH">
//                 <option value="UAH">₴ UAH</option>
//                 <option value="USD">$ USD</option>
//                 <option value="EUR">€ EUR</option>
//               </select>

//               <select defaultValue="RU">
//                 <option value="RU">Русский</option>
//                 <option value="UA">Українська</option>
//                 <option value="EN">English</option>
//               </select>

//               <select defaultValue="KYIV">
//                 <option value="KYIV">Киев</option>
//                 <option value="KHARKIV">Харьков</option>
//                 <option value="ODESA">Одесса</option>
//               </select>
//             </div>

//             <div className="links">
//               <Link to="/wishlist" className="link-item">
//                 <img src={serd} alt="Избранное" />
//                 Избранное
//               </Link>
//               <Link to="/delivery" className="link-item">
//                 <img src={car} alt="Доставка" />
//                 Доставка
//               </Link>
//               <Link to="/contacts" className="link-item">
//                 <img src={call} alt="Контакты" />
//                 Контакты
//               </Link>
//             </div>
//           </div>

//           <div className="right">
//             <Link to="/login">Вход</Link>
//             <span>|</span>
//             <Link to="/register">Регистрация</Link>
//           </div>
//         </div>
//       </div>

//       {/* Основной хедер */}
//       <div className="main-header">
//         <div className="container">
//           {/* Анимация цветов */}
//           <div className="flower-container">
//             {[...Array(25)].map((_, i) => (
//               <div 
//                 key={i}
//                 ref={el => (flowersRef.current[i] = el)}
//                 className="flower"
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                   width: `${20 + Math.random() * 30}px`,
//                   animationDelay: `${i * 0.2}s`
//                 }}
//               >
//                 <img src={pinkflowers} alt="Цветок" />
//               </div>
//             ))}
//           </div>

//           {/* Логотип */}
//           <Link to="/" className="logo-link">
//             <img src={logo} alt="Логотип" className="logo" />
//           </Link>

//           {/* Поисковая секция */}
//           <div className="search-section">
//             <div className="search-bar">
//               <div className="search-input">
//                 <input
//                   type="text"
//                   placeholder="Поиск по категориям..."
//                   className="input"
//                 />
//               </div>
//               <div className="search-input">
//                 <input
//                   type="text"
//                   placeholder="Поиск по товарам..."
//                   className="input"
//                 />
//                 <button className="search-button">
//                   <img src={search} alt="Поиск" />
//                 </button>
//               </div>
//             </div>

//             <nav className="main-nav">
//               <Link to="/categories">Категории</Link>
//               <Link to="/reviews">Отзывы</Link>
//               <Link to="/sales">Акции</Link>
//               <Link to="/blog">Блог</Link>
//               <Link to="/about">О нас</Link>
//             </nav>
//           </div>

//           {/* Контакты и корзина */}
//           <div className="header-right">
//             <div className="socials">
//               <a href="https://wa.me/" target="_blank" rel="noreferrer">
//                 <img src={watsup} alt="WhatsApp" />
//               </a>
//               <a href="https://instagram.com/" target="_blank" rel="noreferrer">
//                 <img src={instagram} alt="Instagram" />
//               </a>
//               <a href="https://facebook.com/" target="_blank" rel="noreferrer">
//                 <img src={facbook} alt="Facebook" />
//               </a>
//             </div>

//             <div className="contact-info">
//               <a href="tel:+380678293030" className="phone">
//                 +38 (067) 829-30-30
//               </a>
//             </div>

//             <div className="cart-wrapper">
//               <Link to="/cart" className="cart">
//                 <img src={karzin} alt="Корзина" />
//                 <span className="cart-total">₴ 1,250</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;