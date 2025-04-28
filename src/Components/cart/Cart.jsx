import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';
import { updateQuantity } from '../../redux/cart/CartSlice';
import { Link } from 'react-router-dom';
import QuickViewModal from '../QuickViewModal/QuickViewModal';

function Cart() {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleIncrement = (id) => {
        dispatch(updateQuantity({ id, quantity: 1 }));
    };

    const handleDecrement = (id) => {
        dispatch(updateQuantity({ id, quantity: -1 }));
    };

    const getItemTotalPrice = (price, quantity) => {
        const numericPrice = parseFloat(price) || 0;
        const numericQty = parseInt(quantity) || 0;
        return (numericPrice * numericQty).toFixed(2);
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseInt(item.quantity) || 0;
            return total + (price * qty);
        }, 0).toFixed(2);
    };

    return (
        <div className='caar '>
            <div className={`cart ${isModalOpen ? 'open' : 'closed'} `}>
                <div className="cart-content-wrapper ">
                    <div className="cart-left">
                        <div className="cart_top">
                            <p>Продукт ({items.length > 0 ? items.length : 'Корзина пуста'})</p>
                            <p>Цена</p>
                            <p>Количество</p>
                            <p>Общая цена</p>
                        </div>

                        {items.length === 0 ? (
                            <p className="empty-cart">Корзина азырынча бош</p>
                        ) : (
                            items.map((item) => (
                                <div className="cart_product" key={item.id}>
                                    <div className="cart_title">
                                        <Link className='QuickViewModal' onClick={() => setSelectedItem(item)}>
                                            <img src={item.image} alt={item.title} />
                                        <p>{item.title}</p>
                                        </Link>
                                    </div>
                                    <span className="new-price">{parseFloat(item.price).toFixed(2)} сом</span>

                                    <div className="quantity-controls">
                                        <button className="quantity-btn">
                                            <span onClick={() => handleDecrement(item.id)}>-</span>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <span onClick={() => handleIncrement(item.id)}>+</span>
                                        </button>
                                    </div>

                                    <span className="total-price">
                                        {getItemTotalPrice(item.price, item.quantity)} сом
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="cart-right">
                        <p>Сумма заказов</p>
                        {items.length > 0 && (
                            <div className="cart_total">
                                <p>Общая сумма: {getTotalPrice()} сом</p>
                            </div>
                        )}
                        <div><input type="radio" /> <p>Бесплатная доставка курьером по Бишкеку при заказе от 3000 сомов</p></div>
                        <div><input type="radio" /> <p>Курьером "до двери" получателя: 300сом</p></div>
                        <div><input type="radio" /> <p>Курьером, в отдаленные районы...: 400сом</p></div>
                        <div><input type="radio" /> <p>Курьером, за чертой города (Согласовывается): 500сом</p></div>
                        <div><input type="radio" /> <p>Самовывоз</p></div>
                        <div><p>Варианты доставки будут обновлены при оформлении заказа.</p></div>
                        <div><p>Рассчитать стоимость доставки</p></div>
                        <div>
                            <p className='total_par'>Итого</p>
                            {items.length > 0 && (
                                <div className="cart_total">
                                    <p>{getTotalPrice()} сом</p>
                                </div>
                            )}
                        </div>
                        <div className='cart_btn'>
                            <Link to="/checkoutpage">
                                <button>Оформить заказ</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {selectedItem && (
                <QuickViewModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
}

export default Cart;

