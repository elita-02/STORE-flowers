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
  const handleRemoveItem = (id) => {
    dispatch({ type: "cart/removeFromCart", payload: id });
  };
  
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
              <div className="dessert-details">
                  <h3 className="dessert-title">{dessert.title}</h3>
                  <div className="price-info">
                    {dessert.oldPrice && (
                      <span className="old-price">{dessert.oldPrice}</span>
                    )}
                    <span className="new-price">{dessert.price}</span>
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
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default Aksy;
