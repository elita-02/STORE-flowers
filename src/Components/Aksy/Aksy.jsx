import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Aksy.scss';
import { Link, useNavigate } from "react-router-dom";
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
import Modal from '../modal/Modal';
import QuickViewModal from '../QuickViewModal/QuickViewModal'; // ✅ Кошулган
import { removeItem } from '../../redux/modal/modalSlice';
import { fetchDesserts } from '../../redux/Aksy/aksySlice';
import { addToCart, removeFromCart } from '../../redux/cart/cartSlice';

function Aksy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { desserts, loading, error } = useSelector((state) => state.aksys);
  const wishlist = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false); // ✅ Кошулган
  const swiperRef = useRef(null);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    dispatch(fetchDesserts());
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === '-') {
        setSlidesPerView((prev) => {
          const updated = prev + 1;
          if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.params.slidesPerView = updated;
            swiperRef.current.swiper.update();
          }
          return updated;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
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

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleQuickView = (item) => {
    setSelectedItem(item);
    setQuickViewOpen(true); // ✅
  };

  const handleCloseQuickView = () => {
    setQuickViewOpen(false); // ✅
    setSelectedItem(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="desserts">
      <h1>Акция</h1>
      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        grid={{ rows: 2, fill: 'row' }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Grid, Pagination, Autoplay]}
        slidesPerView={'auto'}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1, grid: { rows: 2 } },
          480: { slidesPerView: 2, grid: { rows: 2 } },
          768: { slidesPerView: 3, grid: { rows: 2 } },
          1024: { slidesPerView: 3, grid: { rows: 2 } },
          1280: { slidesPerView: 3, grid: { rows: 2 } },
          1600: { slidesPerView: 3, grid: { rows: 2 } },
        }}
      >
        {desserts.map((dessert) => {
          const isWished = wishlist.some((item) => item.id === dessert.id);
          return (
            <SwiperSlide key={dessert.id}>
              <div className="dessert-item">
                <div className="image-container">
                  <img src={dessert.image} alt={dessert.title} />
                  <div className="discount">{dessert.discount}</div>
                  <button
                    className="quick-view-btn"
                    onClick={() => handleQuickView(dessert)}
                  >
                    Быстрый просмотр
                  </button>
                </div>
                <div className="icon-container">
                  <img
                    src={isWished ? redHeart : hart}
                    onClick={() => handleWishClick(dessert)}
                    alt="Heart"
                    className="heart-icon"
                  />
                  <img
                    src={karzina}
                    onClick={() => handleAddToCart(dessert)}
                    alt="Cart"
                    className="cart-icon"
                  />
                </div>
                <div className="dessert-info">
                  <div className="price-container">
                    <h3>{dessert.title}</h3>
                    <p className="new-price">{dessert.price}</p>
                  </div>
                </div>
                <div className='aksy-bot'>
                  <Link to="/checkoutpage">
                    <button>Заказать</button>
                  </Link>
                </div>
                <img src={gul2} alt="Flower" className="flower-img" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Корзина модалы */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
      />

      {/* Быстрый просмотр модалы */}
      {quickViewOpen && selectedItem && (
        <QuickViewModal item={selectedItem} onClose={handleCloseQuickView} />
      )}
    </div>
  );
}

export default Aksy;
