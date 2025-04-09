// import React from 'react'
// import "./WishCard.scss"
// import { useDispatch } from "react-redux";  
// import { useNavigate } from "react-router-dom"; 
// import { addToCart } from "../../redux/cart/CartSlice"; 
// function WishCard({data}) {
//     const dispatch = useDispatch();
//   const navigate = useNavigate(); // useNavigate'ти чакыруу

//   const handleAddToCart = () => {
//     dispatch(addToCart({ ...data, quantity: 1 })); // `data` менен иштөө
//     navigate("/corzina"); // `Corzina` барагына багыттоо
//   };

//   return (
//     <div className="desserts">
//     <h1>Акции</h1>
       
//         {desserts.map((data) => (
//                 <div className="dessert-item">
//                     <div className="image-container">
//                         <img src={data.image} alt={data.title} />
//                         <div className="discount">{dessert.discount}</div>
//                     </div>

//                     <div className="icon-container">
//                         <img src={hart} alt="Heart" className="heart-icon" />
//                         <img src={karzina} alt="Cart" className="cart-icon" />
//                     </div>

//                     <div className="dessert-info">
//                         <div className="price-container">
//                             <div className="new-price">{data.price}</div>
//                         </div>
//                         <h3>{data.title}</h3>
//                     </div>

//                     <button>
//                         Заказать
//                     </button>

//                     <img src={gul2} alt="Flower" className="flower-img" />
//                 </div>
//         ))}
// </div>
//   )
// }

// export default WishCard


import React from 'react';
import './WishCard.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/cart/CartSlice';
import karzina from '../../assets/svg/karzina.svg';
import hart from "../../assets/svg/wishlist.svg";
import gul2 from '../../assets/svg/gul2.svg';

function WishCard({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...data, quantity: 1 }));
    navigate('/corzina');
  };

  return (
    <div className="dessert-item">
      <div className="image-container">
        <img src={data.image} alt={data.title} />
        <div className="discount">{data.discount}</div>
      </div>

      <div className="icon-container">
        <img src={hart} alt="Heart" className="heart-icon" />
        <img
          src={karzina}
          onClick={handleAddToCart}
          alt="Cart"
          className="cart-icon"
        />
      </div>

      <div className="dessert-info">
        <div className="price-container">
          <div className="old-price">{data.old_price}</div>
          <div className="new-price">{data.price}</div>
        </div>
        <h3>{data.title}</h3>
      </div>

      <button onClick={handleAddToCart}>Заказать</button>

      <img src={gul2} alt="Flower" className="flower-img" />
    </div>
  );
}

export default WishCard;
