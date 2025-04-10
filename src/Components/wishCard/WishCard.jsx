import React from 'react';
import './WishCard.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/cart/CartSlice';
import gul2 from '../../assets/svg/gul2.svg';
import deleteImg from "../../assets/svg/delate.svg";
import { removeWish } from '../../redux/wish/wishSlice'; 

function WishCard({ data, handleWishClick }) { 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...data, quantity: 1 }));
    navigate('/corzina');
  };

  const handleDelete = () => {
    dispatch(removeWish(data.id)); 
  };

  return (
    <div className="dessert-item ">
      <div className="image-container">
        <img src={data.image} alt={data.title} />
        <button className="wish-view-btn" onClick={() => alert("Quick View")}>
          Быстрый просмотр
        </button>
      </div>
      
      {/* Добавляем onClick для удаления */}
      <div className="icon-container">
        <img 
          src={deleteImg} 
          alt="Delete" 
          className='delete_icon'
          onClick={handleDelete} // Подключаем обработчик
        />
      </div>

      <div className="dessert-info">
        <div className="price-container">
          <h3>{data.title}</h3>
          <p className="new-price">{data.price}</p>
        </div>
      </div>
      
      <button className="order-btn" onClick={handleAddToCart}>
        <span className="order-btn-text">Заказать</span>
      </button>
      
      <img src={gul2} alt="Flower" className="flower-img" />
    </div>
  
  );
}

export default WishCard;