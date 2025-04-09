import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesserts } from '../../redux/podar/podarkiSlice'; // ← туура жол
import './Podarki.scss';
import basketIcon from '../../assets/svg/karzina.svg';
import heartIcon from "../../assets/svg/wishlist.svg";
import flowerIcon from '../../assets/svg/gul2.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

function Podarki() {
    const dispatch = useDispatch();
    const { desserts, loading, error } = useSelector((state) => state.podar);

    useEffect(() => {
        dispatch(fetchDesserts()); 
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="desserts-container">
            <h1 className="desserts-heading">Подарки</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                navigation={true} 
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="desserts-swiper"
            >
                {desserts.map((dessert) => (
                    <SwiperSlide key={dessert.id}>
                        <div className="dessert-card">
                            <div className="image-wrapper">
                                <img src={dessert.image} alt={dessert.title} className="dessert-image"/>
                                <div className="discount-badge">{dessert.discount}</div>
                            </div>

                            <div className="icon-wrapper">
                                <img src={heartIcon} alt="Heart" className="heart-icon" />
                                <img src={basketIcon} alt="Cart" className="cart-icon" />
                            </div>

                            <div className="dessert-details">
                                <div className="price-info">
                                    <div className="new-price">{dessert.price} </div>
                                </div>
                                <h3 className="dessert-title">{dessert.title}</h3>
                            </div>
                            <button className="order-button">
                                Добавить
                            </button>
                            <img src={flowerIcon} alt="Flower" className="flower-icon" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </div>
    );
}

export default Podarki;

