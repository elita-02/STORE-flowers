
  import React, { useEffect, useRef, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import gsap from "gsap";
  import { useSelector } from "react-redux";
  import "./Header.scss";

  import logo from "../../assets/img/log.jpg";
  import search from "../../assets/svg/search.svg";
  import wishlist from "../../assets/svg/wishlist.svg";
  import car from "../../assets/svg/car.svg";
  import call from "../../assets/svg/call.svg";
  import pinkflowers from "../../assets/svg/pinkFlower.svg";
  import { FaInstagram, FaTelegram, FaWhatsapp, FaRegHeart } from "react-icons/fa";
  import { PiShoppingCartLight } from "react-icons/pi";
  import burger from "../../assets/img/burger.jpg"
  import BurgerMenu from '../burgerMenu/BurgerMenu';
  function Header() {
    const flowersRef = useRef([]);
    const cartItems = useSelector((state) => state.cart.items);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const navigate = useNavigate();
    
    const [categorySearch, setCategorySearch] = useState("");
    const [productSearch, setProductSearch] = useState("");

    useEffect(() => {
      if (!window.googleTranslateElementInit) {
        const addGoogleTranslateScript = () => {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
          document.body.appendChild(script);
        };

        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "ru",
              includedLanguages: "ru,ky,en,tr",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        };

        addGoogleTranslateScript();
      }
    }, []);

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

    const handleSearch = () => {
      const params = new URLSearchParams();
      if (categorySearch) params.append("category", categorySearch);
      if (productSearch) params.append("product", productSearch);
      navigate(`/tovar?${params.toString()}`);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") handleSearch();
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

 

    // Закрытие меню при клике вне области
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsMenuOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const toggleMenu = () => {
      setIsMenuOpen((prev) => !prev);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsMenuOpen(false);
        }
      };
  
      if (isMenuOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      // Тазалоо үчүн
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isMenuOpen]);
    return (
      <div className="header ">
        <div className="top-bar  ">

          <div className=" topp container ">
            <div className="left ">
              <div className="selectors">
                <p>Язык</p>
                <div className="language-translate" id="google_translate_element"></div>
                <div className="links">
                  <div className="serdWish link-item">
                    <img src={wishlist} alt="Закладки"   className="serdWish"/>
                    <Link to="/wishlist">Закладки</Link>
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
       
          <div className="burger-menu" onClick={toggleMenu}>
            <img src={burger} alt="Меню" className="burger-icon" />
          </div>
               
          {/* Мобильное меню */}
          <div ref={menuRef}>
        <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

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
            
              <div className="search">
                <input
                  className="input_two"
                  type="text"
                  placeholder="Поиск по товарам"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <img src={search} alt="Поиск" onClick={handleSearch} style={{ cursor: "pointer" }} />
              </div>
            </div>
            

    
            <nav className="forum-nav">
              <Link to="/">Главная</Link>
              <Link to="/reviews">Отзывы</Link>
              <Link to="/aksia">Акции</Link>
              <Link to="/postspage">Новости</Link>
              <Link to="/tovar">Каталог товаров</Link>
              <Link to="/PetalMaker">Создай букет</Link>
            </nav>
          </div>

          <div className="contact-cart">
            <div className="social-icons">
              <a href="996702368268" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
              <a href="@BishkekFlowersBot" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaTelegram />
              </a>
              <a href="https://www.instagram.com/bishkekflowers17/" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
            
            <div className="phone">996700 368268</div>
            <div className="cart-info">
              <Link to="/wishlist" className="cart-icon-link">
                <FaRegHeart className="cart-icon" />
                {wishlistItems.length > 0 && (
                  <span className="wishlist-badge">{wishlistItems.length}</span>
                )}
              </Link>

              <Link to="/korzina" className="cart-icon-link">
                <PiShoppingCartLight className="cart-icon-cart" />
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

