// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import './Aksy.scss';
// import { Link, useNavigate } from "react-router-dom";
// import karzina from '../../assets/svg/karzina.svg';
// import hart from "../../assets/svg/wishlist.svg";
// import redHeart from "../../assets/svg/redser.svg";
// import gul2 from '../../assets/svg/gul2.svg';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/grid';
// import 'swiper/css/pagination';
// import { Grid, Pagination, Autoplay } from 'swiper/modules';
// import { addWish, removeWish } from '../../redux/wish/wishSlice';
// import Modal from '../modal/Modal';
// import { removeItem } from '../../redux/modal/modalSlice';
// import { fetchDesserts } from '../../redux/Aksy/aksySlice';
// import { addToCart, removeFromCart } from '../../redux/cart/cartSlice';
// function Aksy() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { desserts, loading, error } = useSelector((state) => state.aksys);
//   const wishlist = useSelector((state) => state.wishlist.items);
//   const cartItems = useSelector((state) => state.cart.items);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const swiperRef = useRef(null);
//   const [slidesPerView, setSlidesPerView] = useState(3); // Баштапкы

//   useEffect(() => {
//     dispatch(fetchDesserts());
//   }, [dispatch]);

//   // Ctrl - басканда карточка санын көбөйтүү
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.ctrlKey && event.key === '-') {
//         setSlidesPerView((prev) => {
//           const updated = prev + 1;
//           if (swiperRef.current && swiperRef.current.swiper) {
//             swiperRef.current.swiper.params.slidesPerView = updated;
//             swiperRef.current.swiper.update();
//           }
//           return updated;
//         });
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleAddToCart = (dessert) => {
//     dispatch(addToCart(dessert));
//     setIsModalOpen(true);
//   };

//   const handleWishClick = (dessert) => {
//     const isWished = wishlist.some((item) => item.id === dessert.id);
//     if (!isWished) {
//       dispatch(addWish(dessert));
//     } else {
//       dispatch(removeWish(dessert.id));
//     }
//   };

//   const handleRemoveItem = (itemId) => {
//     dispatch(removeFromCart(itemId));
//   };

//   const handleQuickView = (item) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="desserts">
//       <h1>Акция</h1>
//       <Swiper
//         ref={swiperRef}
//         spaceBetween={30}
//         grid={{ rows: 2, fill: 'row' }}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 2500, disableOnInteraction: false }}
//         modules={[Grid, Pagination, Autoplay]}
//         slidesPerView={'auto'}
//         className="mySwiper"
//         breakpoints={{
//           0: { slidesPerView: 2, grid: { rows: 2 } },       // Телефон (360+)
//           768: { slidesPerView: 3, grid: { rows: 2 } },     // Планшет
//           1024: { slidesPerView: 3, grid: { rows: 2 } },    // Ноутбук
//         }}
//       >


//         {desserts.map((dessert) => {
//           const isWished = wishlist.some((item) => item.id === dessert.id);
//           return (
//             <SwiperSlide key={dessert.id}>
//               <div className="dessert-item">
//                 <div className="image-container">
//                   <img src={dessert.image} alt={dessert.title} />
//                   <div className="discount">{dessert.discount}</div>
//                   <button
//                     className="quick-view-btn"
//                     onClick={() => handleQuickView(dessert)}
//                   >
//                     Быстрый просмотр
//                   </button>
//                 </div>
//                 <div className="icon-container">
//                   <img
//                     src={isWished ? redHeart : hart}
//                     onClick={() => handleWishClick(dessert)}
//                     alt="Heart"
//                     className="heart-icon"
//                   />
//                   <img
//                     src={karzina}
//                     onClick={() => handleAddToCart(dessert)}
//                     alt="Cart"
//                     className="cart-icon"
//                   />
//                 </div>
//                 <div className="dessert-info">
//                   <div className="price-container">
//                     <h3>{dessert.title}</h3>
//                     <p className="new-price">{dessert.price}</p>
//                   </div>
//                 </div>
//                 <div className='aksy-bot '>
//                   <Link to="/checkoutpage">
//                     <button>Заказать</button>
//                   </Link>
//                 </div>
//                 <img src={gul2} alt="Flower" className="flower-img" />
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//       <Modal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         items={cartItems}
//         onRemoveItem={handleRemoveItem}
//       />
//     </div>
//   );
// }

// // export default Aksy;
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import './Aksy.scss';
// import { Link } from "react-router-dom";
// import karzina from '../../assets/svg/karzina.svg';
// import hart from "../../assets/svg/wishlist.svg";
// import redHeart from "../../assets/svg/redser.svg";
// import gul2 from '../../assets/svg/gul2.svg';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/grid';
// import 'swiper/css/pagination';
// import { Grid, Pagination, Autoplay } from 'swiper/modules';
// import { addWish, removeWish } from '../../redux/wish/wishSlice';
// import { addToCart } from '../../redux/cart/cartSlice';
// import Modal from '../modal/Modal';
// import { fetchDesserts } from '../../redux/Aksy/aksySlice'; // Добавлен импорт

// function Aksy() {
//   const dispatch = useDispatch();
//   const { desserts, loading, error } = useSelector((state) => state.aksys);
//   const wishlist = useSelector((state) => state.wishlist.items);
//   const cartItems = useSelector((state) => state.cart.items);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchDesserts()); // Теперь функция определена
//   }, [dispatch]);

//   const handleAddToCart = (dessert) => {
//     dispatch(addToCart(dessert));
//     setIsModalOpen(true);
//   };

//   const handleWishClick = (dessert) => {
//     const isWished = wishlist.some((item) => item.id === dessert.id);
//     isWished ? dispatch(removeWish(dessert.id)) : dispatch(addWish(dessert));
//   };

//   if (loading) return <div className="loading">Жүктөлүүдө...</div>;
//   if (error) return <div className="error">Ката: {error}</div>;

//   return (
//     <div className="desserts">
//       <h1>Акция</h1>
//       <Swiper
//         spaceBetween={30}
//         grid={{ rows: 2, fill: 'row' }}
//         pagination={{ clickable: true }}
//         modules={[Grid, Pagination, Autoplay]}
//         breakpoints={{
//           0: { slidesPerView: 1, spaceBetween: 15 },
//           768: { slidesPerView: 2, spaceBetween: 20 },
//           1024: { slidesPerView: 3, spaceBetween: 30 }
//         }}
//         className="mySwiper"
//       >
//         {desserts.map((dessert) => (
//           <SwiperSlide key={dessert.id}>
//             <div className="dessert-item">
//               <div className="image-container">
//                 <img src={dessert.image} alt={dessert.title} loading="lazy" />
//                 <div className="discount">{dessert.discount}</div>
//               </div>
//               <div className="icon-container">
//                 <img
//                   src={wishlist.some(item => item.id === dessert.id) ? redHeart : hart}
//                   onClick={() => handleWishClick(dessert)}
//                   alt="Wishlist"
//                   className="wish-icon"
//                 />
//                 <img
//                   src={karzina}
//                   onClick={() => handleAddToCart(dessert)}
//                   alt="Cart"
//                   className="cart-icon"
//                 />
//               </div>
//               <div className="dessert-info">
//                 <h3>{dessert.title}</h3>
//                 <div className="price">{dessert.price} сом</div>
//               </div>
//               <Link to="/checkout" className="order-btn">Заказать</Link>
//               <img src={gul2} alt="Decoration" className="flower-decoration" />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} items={cartItems} />
//     </div>
//   );
// }

// export default Aksy;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Aksy.scss';
import { Link } from "react-router-dom";
import karzina from '../../assets/svg/karzina.svg';
import hart from "../../assets/svg/wishlist.svg";
import redHeart from "../../assets/svg/redser.svg";
import gul2 from '../../assets/svg/gul2.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination, Autoplay } from 'swiper/modules';
import { addWish, removeWish } from '../../redux/wish/wishSlice';
import { addToCart } from '../../redux/cart/cartSlice';
import Modal from '../modal/Modal';
import { fetchDesserts } from '../../redux/Aksy/aksySlice';

function Aksy() {
  const dispatch = useDispatch();
  const { desserts, loading, error } = useSelector((state) => state.aksys);
  const wishlist = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDesserts());
  }, [dispatch]);

  const handleAddToCart = (dessert) => {
    dispatch(addToCart(dessert));
    setIsModalOpen(true);
  };

  const handleWishClick = (dessert) => {
    const isWished = wishlist.some((item) => item.id === dessert.id);
    isWished ? dispatch(removeWish(dessert.id)) : dispatch(addWish(dessert));
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Жүктөлүүдө...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p className="error-message">Ката: {error}</p>
      <button onClick={() => window.location.reload()}>Кайталоо</button>
    </div>
  );

  return (
    <div className="desserts">
      <h1 className="section-title animate__fadeInDown">Акция</h1>
      
      <Swiper
        spaceBetween={30}
        grid={{ rows: 2, fill: 'row' }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Grid, Pagination, Autoplay]}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 }
        }}
        className="mySwiper"
      >
        {desserts.map((dessert, index) => (
          <SwiperSlide key={dessert.id}>
            <div 
              className="dessert-item animate__fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="image-container">
                <img 
                  src={dessert.image} 
                  alt={dessert.title} 
                  loading="lazy"
                  className="product-image"
                />
                <div className="discount-badge animate__pulse">
                  {dessert.discount}
                </div>
                <button
                  className="quick-view-btn animate__fadeInUp"
                  onClick={() => setIsModalOpen(true)}
                >
                  Быстрый просмотр
                </button>
              </div>
              
              <div className="icon-container">
                <img
                  src={wishlist.some(item => item.id === dessert.id) ? redHeart : hart}
                  onClick={() => handleWishClick(dessert)}
                  alt="Wishlist"
                  className="wish-icon animate__heartBeat"
                />
                <img
                  src={karzina}
                  onClick={() => handleAddToCart(dessert)}
                  alt="Cart"
                  className="cart-icon animate__bounceIn"
                />
              </div>
              
              <div className="dessert-info">
                <h3 className="product-title">{dessert.title}</h3>
                <div className="price-container">
                  <span className="price">{dessert.price} </span>
                </div>
              </div>
              
              <Link 
                to="/checkout" 
                className="order-btn animate__pulse"
              >
                Заказать
              </Link>
              
              <img 
                src={gul2} 
                alt="Decoration" 
                className="flower-decoration animate__rotateIn" 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        items={cartItems} 
      />
    </div>
  );
}

export default Aksy;
