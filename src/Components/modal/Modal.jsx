import React from "react";
import "./Modal.scss";
import { Link, useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, items, onRemoveItem }) => {
  const navigate = useNavigate();

  if (!isOpen || !items.length) return null;

  const handleClose = () => {
    onClose();
    navigate(); 
  };

  

  return (
    <div className="custom-modal-overlay" onClick={handleClose}>
         <button
    className="custom-close-btn"
    onClick={handleClose}
    aria-label="Закрыть окно"
  >
    ×
  </button>
  <div
    className="custom-modal-content"
    onClick={(e) => e.stopPropagation()}
  >
        <div className="custom-modal-body">
          <div className="custom-products-list">
            {items.map((item) => (
              <div key={item.id} className="custom-produc-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="custom-product-image"
                />
                <div className="custom-product-x">
                  <div className="custom-modal-titl">
                    <p>{item.title}</p>
                    <p className="custom-modal-price">{item.price}</p>

                    <button
                    className="custom-close-title"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    ×
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="custom-modal-btns">
          <Link to="/Korzina">
            <button className="custom-modal-one">ПРОСМОТР КОРЗИНЫ</button>
          </Link>
          <button className="custom-modal-two">ДОБАВИТЬ ПОДАРОК</button>
          <button className="custom-modal-three">ОФОРМЛЕНИЕ ЗАКАЗА</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
