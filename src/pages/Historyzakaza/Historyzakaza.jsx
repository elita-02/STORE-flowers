import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmOrder } from '../../redux/order/ordersSlice';

import './Historyzakaza.scss';

function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Сегодня';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчера';
  } else {
    return date.toLocaleString();
  }
}

function Historyzakaza() {
  const orders = useSelector((state) => state.orders?.list || []);
  const dispatch = useDispatch();

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="history">
      <h1>История заказов</h1>
      {sortedOrders.length === 0 ? (
        <p>Нет заказов</p>
      ) : (
        sortedOrders.map((order, index) => (
          <div key={index} className="order-card">
            <h2>Отправитель: {order.senderName}</h2>
            <p>Получатель: {order.receiverName}</p>
            <p>Общая сумма: {order.totalPrice} сом</p>
            <p>Дата: {formatDate(order.createdAt)}</p>

            <div className="items">
              <h3>Заказы:</h3>
              {order.items.map((item, i) => (
                <div key={i} className="item-row">
                  <img src={item.image} alt={item.title} />
                  <span>{item.title} x {item.quantity}</span>
                  <span>{(parseFloat(item.price) * item.quantity).toFixed(2)} сом</span>
                </div>
              ))}
            </div>

            {order.confirmed ? (
              <p className="confirmed">✅ Заказ получен</p>
            ) : (
              <button
                onClick={() => dispatch(confirmOrder(order.id))}
                className="confirm-btn"
              >
                Товар получен
              </button>

            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Historyzakaza;



