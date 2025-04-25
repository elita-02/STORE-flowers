import React, { useState } from 'react';
import './WishCard.scss';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import gul2 from '../../assets/svg/gul2.svg';
import deleteImg from "../../assets/svg/delate.svg";
import { removeWish } from '../../redux/wish/wishSlice';
import { addToCart } from '../../redux/cart/cartSlice';
import QuickViewModal from '../QuickViewModal/QuickViewModal'; // 🌟 Модалды коштук

function WishCard({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // 🌟 Модал видемдуулүгү

  const handleAddToCart = () => {
    dispatch(addToCart({ ...data, quantity: 1 }));
    navigate('/corzina');
  };

  const handleDelete = () => {
    dispatch(removeWish(data.id));
  };

  const handleQuickView = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="dessert-tem">
        <div className="image-container">
          <Link to="/izbran" state={data}>
            <img
              src={data.image}
              alt={data.title}
              style={{ cursor: 'pointer' }}
            />
          </Link>
          <button className="wish-view-btn" onClick={handleQuickView}>
            Быстрый просмотр
          </button>
        </div>

        <div className="icon-container">
          <img
            src={deleteImg}
            alt="Delete"
            className='delete_icon'
            onClick={handleDelete}
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

      {showModal && (
        <QuickViewModal item={data} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default WishCard;