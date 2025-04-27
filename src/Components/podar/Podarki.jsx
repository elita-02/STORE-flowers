import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesserts } from '../../redux/podar/podarkiSlice';
import './Podarki.scss';
import { useNavigate } from 'react-router-dom';
import karzina from '../../assets/svg/karzina.svg';
import hart from '../../assets/svg/wishlist.svg';
import redHeart from '../../assets/svg/redser.svg';
import gul2 from '../../assets/svg/gul2.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { addWish, removeWish } from '../../redux/wish/wishSlice';
import { addToCart, removeFromCart } from '../../redux/cart/cartSlice';
import Modal from '../modal/Modal';

function Podarki() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { desserts, loading, error } = useSelector((state) => state.podar);
  const wishlist = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setSlidesPerView(1);
      } else if (width <= 900) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 
  useEffect(() => {
    dispatch(fetchDesserts());
  }, [dispatch]);

  
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

 
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

 
  const handleAddToCart = (dessert) => {
    dispatch(addToCart(dessert));
    setIsModalOpen(true);
  };

  
  const handleWishClick = (dessert) => {
    const isWished = wishlist.some((item) => item.id === dessert.id);
    if (!isWished) {
      dispatch(addWish(dessert));
    } else {
      dispatch(removeWish(dessert.id));
    }
  };

  const handleQuickView = (dessert) => {
    setSelectedItem(dessert);
    setIsModalOpen(true);
  };

  const handleOrder = (dessert) => {
    navigate(`/order/${dessert.id}`);
  };


  const handleRemoveItem = (id) => {
    dispatch({ type: "cart/removeFromCart", payload: id });
  };
  
  return (
    <div className="desserts-container">
      <h1 className="desserts-heading">Подарки</h1>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className="desserts-swiper"
      >
        {desserts.map((dessert) => {
          const isWished = wishlist.some((item) => item.id === dessert.id);
          return (
            <SwiperSlide key={dessert.id}>
              <div className="dessert-card">
                <div className="image-wrapper">
                  <img
                    src={dessert.image}
                    alt={dessert.title}
                    className="dessert-image"
                  />
                  <button
                    className="quick-view-btn"
                    onClick={() => handleQuickView(dessert)}
                  >
                    Быстрый просмотр
                  </button>
                </div>
                <div className="icon-wrapper">
                  <img
                    src={isWished ? redHeart : hart}
                    onClick={() => handleWishClick(dessert)}
                    alt="Wishlist"
                    className="heart-icon"
                  />
                  <img
                    src={karzina}
                    onClick={() => handleAddToCart(dessert)}
                    alt="Cart"
                    className="cart-icon"
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
                <button
                  className="order-button"
                  onClick={() => handleOrder(dessert)}
                >
                  Заказать
                </button>
                <img src={gul2} alt="Flower" className="flower-icon" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        items={selectedItem ? [selectedItem] : cartItems}
        onRemoveItem={(itemId) => dispatch(removeFromCart(itemId))}
      />
    </div>
  );
}

export default Podarki;