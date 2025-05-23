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

  
  const handleRemoveItem = (id) => {
    onRemoveItem(id);
  };

  return (
    <div className="custom-modal-overlay" onClick={handleClose}>
      <div
        className="custom-modal-content"
        onClick={(e) => e.stopPropagation()} // Модалдын ичин басканда жабылбасын деп
      >
        <button
          className="custom-close-btn"
          onClick={handleClose}
          aria-label="Закрыть окно"
        >
          ×
        </button>

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
                      onClick={() => handleRemoveItem(item.id)} // Туура кылдык
                      aria-label="Удалить товар"
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
          <Link to="/checkoutpage">
            <button className="custom-modal-three">ОФОРМЛЕНИЕ ЗАКАЗА</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
