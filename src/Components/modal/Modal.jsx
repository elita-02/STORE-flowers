import React from 'react';
import './Modal.scss';
import { Link } from 'react-router-dom';
const Modal = ({ isOpen, onClose, items, onRemoveItem }) => {
    if (!isOpen || !items.length) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="modal-body">
                    <div className="products-list">
                        {items.map((item) => (
                            <div key={item.id} className="produc-item">
                                <img src={item.image} alt={item.title} className="product-image" />
                                <div className="product-x">
                                    <div className="modal-titl">
                                        <p>{item.title}</p>
                                        <p className="modal-price">{item.price}</p>

                                        <button 
                                            className="close-title" 
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

                <div className="modal-btns">
                    <Link to="/korzina">
                    <button className="modal_one">ПРОСМОТР КОРЗИНЫ</button>
                    </Link>
                    <button className="modal_two">ДОБАВИТЬ ПОДАРОК</button>
                    <button className="modal_three">ОФОРМЛЕНИЕ ЗАКАЗА</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
