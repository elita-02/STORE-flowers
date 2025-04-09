// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDesserts } from '../../redux/Aksy/AksySlice';
// import './Aksy.scss';

// import karzina from '../../assets/svg/karzina.svg';
// import hart from "../../assets/svg/wishlist.svg";

// import gul2 from '../../assets/svg/gul2.svg';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/grid';
// import 'swiper/css/pagination';
// import { Grid, Pagination } from 'swiper/modules';

// function Aksy() {
//     const dispatch = useDispatch();
//     const { desserts, loading, error } = useSelector((state) => state.aksys);

//     useEffect(() => {
//         dispatch(fetchDesserts());
//     }, [dispatch]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="desserts">
//             <h1>Акции</h1>
//             <Swiper
//                 slidesPerView={3}
//                 grid={{ rows: 2, fill: 'row' }}
//                 spaceBetween={30}
//                 pagination={{ clickable: true }}
//                 modules={[Grid, Pagination]}
//                 className="mySwiper"
//             >
//                 {desserts.map((dessert) => (
//                     <SwiperSlide key={dessert.id}>
//                         <div className="dessert-item">
//                             <div className="image-container">
//                                 <img src={dessert.image} alt={dessert.title} />
//                                 <div className="discount">{dessert.discount}</div>
//                             </div>

//                             <div className="icon-container">
//                                 <img src={hart} alt="Heart" className="heart-icon" />
//                                 <img src={karzina} alt="Cart" className="cart-icon" />
//                             </div>

//                             <div className="dessert-info">
//                                 <div className="price-container">
//                                     <div className="old-price">{dessert.old_price}</div>
//                                     <div className="new-price">{dessert.price} сом</div>
//                                 </div>
//                                 <h3>{dessert.title}</h3>
//                             </div>

//                             <button>
//                                 <span>Заказать</span>
//                             </button>

//                             <img src={gul2} alt="Flower" className="flower-img" />
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// }

// export default Aksy;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDesserts } from '../../redux/Aksy/AksySlice';
// import './Aksy.scss';
// import { useNavigate } from "react-router-dom"; // Навигация үчүн

// import karzina from '../../assets/svg/karzina.svg';
// import hart from "../../assets/svg/wishlist.svg";
// import gul2 from '../../assets/svg/gul2.svg';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/grid';
// import 'swiper/css/pagination';
// import { Grid, Pagination, Autoplay } from 'swiper/modules'; // Autoplay модулун коштук

// function Aksy() {
//     const dispatch = useDispatch();
//     const { desserts, loading, error } = useSelector((state) => state.aksys);

//     useEffect(() => {
//         dispatch(fetchDesserts());
//     }, [dispatch]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;



//     const navigate = useNavigate();
//     const wishlist = useSelector((state) => state.wishlist.items); // Wishlist'ти чакыруу
  
//     const isWished = wishlist.some((item) => item.id === product.id); // Эгер продукт Wishlist'те бар болсо, кызыл жүрөк чыгат
  
//     const handleWishClick = () => {
//       if (isWished) {
//         dispatch(removeWish(product.id)); // Эгер мурун кошулган болсо, өчүрүү
//       } else {
//         dispatch(addWish(product)); // Эгер жок болсо, кошуу
//       }
//     };
  
//     const handleAddToCart = () => {
//       console.log("Product:", product); // Продукту текшерүү
//       dispatch(addToCart({ ...product, quantity: 1 }));
//       navigate("/cart");
//     };
    
//     return (
//         <div className="desserts">
//             <h1>Акции</h1>
//             <Swiper
//                 slidesPerView={3}
//                 grid={{ rows: 2, fill: 'row' }}
//                 spaceBetween={30}
//                 pagination={{ clickable: true }}
//                 autoplay={{ delay: 2500, disableOnInteraction: false }}  
//                 modules={[Grid, Pagination, Autoplay]}  
//                 className="mySwiper"
//             >
//                 {desserts.map((dessert) => (
//                     <SwiperSlide key={dessert.id}>
//                         <div className="dessert-item">
//                             <div className="image-container">
//                                 <img src={dessert.image} alt={dessert.title} />
//                                 <div className="discount">{dessert.discount}</div>
//                             </div>

//                             <div className="icon-container">
//                                 <img src={isWished ? redHeart : hart}    onClick={handleWishClick}
//              alt="Heart" className="heart-icon" />
//                                 <img src={karzina} onClick={handleAddToCart} alt="Cart" className="cart-icon" />
//                             </div>

//                             <div className="dessert-info">
//                                 <div className="price-container">
//                                     <div className="old-price">{dessert.old_price}</div>
//                                     <div className="new-price">{dessert.price}</div>
//                                 </div>
//                                 <h3>{dessert.title}</h3>
//                             </div>

//                             <button>
//                                 Заказать
//                             </button>

//                             <img src={gul2} alt="Flower" className="flower-img" />
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// }

// export default Aksy;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesserts } from '../../redux/Aksy/AksySlice';
import './Aksy.scss';
import { useNavigate } from "react-router-dom";

import karzina from '../../assets/svg/karzina.svg';
import hart from "../../assets/svg/wishlist.svg";
import redHeart from "../../assets/svg/redser.svg"; // кызыл жүрөктү кошуу
import gul2 from '../../assets/svg/gul2.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination, Autoplay } from 'swiper/modules';

import { addWish, removeWish } from '../../redux/wish/wishSlice'; // өзүңүздүн жолуңузга жараша
import { addToCart } from '../../redux/cart/CartSlice'; 

function Aksy() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { desserts, loading, error } = useSelector((state) => state.aksys);
    const wishlist = useSelector((state) => state.wishlist.items);

    useEffect(() => {
        dispatch(fetchDesserts());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Жүрөк басылганда чакырылат
    const handleWishClick = (dessert) => {
        const isWished = wishlist.some((item) => item.id === dessert.id);
        if (isWished) {
            dispatch(removeWish(dessert.id));
        } else {
            dispatch(addWish(dessert));
        }
        navigate("/wishlist");
    };

    // Корзина басылганда чакырылат
    const handleAddToCart = (dessert) => {
        dispatch(addToCart({ ...dessert, quantity: 1 }));
        navigate("/cart");
    };

    return (
        <div className="desserts">
            <h1>Акции</h1>
            <Swiper
                slidesPerView={3}
                grid={{ rows: 2, fill: 'row' }}
                spaceBetween={30}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                modules={[Grid, Pagination, Autoplay]}
                className="mySwiper"
            >
                {desserts.map((dessert) => {
                    const isWished = wishlist.some((item) => item.id === dessert.id);
                    return (
                        <SwiperSlide key={dessert.id}>
                            <div className="dessert-item">
                                <div className="image-container">
                                    <img src={dessert.image} alt={dessert.title} />
                                    <div className="discount">{dessert.discount}</div>
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
                                        {dessert.old_price && (
                                            <div className="old-price">{dessert.old_price} сом</div>
                                        )}
                                        <div className="new-price">{dessert.price} сом</div>
                                    </div>
                                    <h3>{dessert.title}</h3>
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
        </div>
    );
}

export default Aksy;
