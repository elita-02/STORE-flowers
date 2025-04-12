import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesserts } from '../../redux/podar/podarkiSlice';
import './Podarki.scss';
import { useNavigate } from "react-router-dom";
import karzina from '../../assets/svg/karzina.svg';
import hart from "../../assets/svg/wishlist.svg";
import redHeart from "../../assets/svg/redser.svg"; 
import gul2 from '../../assets/svg/gul2.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { addWish, removeWish } from '../../redux/wish/wishSlice';
import { addToCart } from '../../redux/cart/CartSlice';
import Modal from '../modal/Modal'; 
import { removeFromCart } from '../../redux/cart/CartSlice'; 

function Podarki() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { desserts, loading, error } = useSelector((state) => state.podar);
    const wishlist = useSelector((state) => state.wishlist.items);
    const cartItems = useSelector((state) => state.cart.items);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 
   
    useEffect(() => {
        dispatch(fetchDesserts());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
    return (
        <div className="desserts">
            <h1>Подарки</h1>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                modules={[Grid, Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                className="mySwiper"
            >
                {desserts.map((dessert) => {
                    const isWished = wishlist.some((item) => item.id === dessert.id);
                    return (
                        <SwiperSlide key={dessert.id}>
                            <div className="dessert-item custom-card">
                                <div className="image-container">
                                    <img src={dessert.image} alt={dessert.title} />
                                    <button
                                        className="quick-view-btn"
                                        onClick={() => handleQuickView(dessert)} >
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
                                        <div className="new-price">{dessert.price}</div>
                                    </div>
                                </div>
                                <button>
                                    Заказать
                                </button>
                                <img src={gul2} alt="Flower" className="flower-img" />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                items={cartItems} 
                onRemoveItem={handleRemoveItem} // <-- Бул жерде жөнөтүү

            />
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
    );
}

export default Podarki;
