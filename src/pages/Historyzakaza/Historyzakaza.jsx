import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmOrder } from '../../redux/order/ordersSlice';
import { auth } from '../../firebase'; 
import './Historyzakaza.scss';

function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const timeString = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });

  if (date.toDateString() === today.toDateString()) {
    return `Сегодня в ${timeString}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Вчера в ${timeString}`;
  } else {
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

function Historyzakaza() {
  const currentUser = auth.currentUser;
  const allOrders = useSelector((state) => state.orders?.list || []);
  const dispatch = useDispatch();
  const filteredOrders = currentUser?.email === 'admin@example.com'
    ? allOrders
    : allOrders.filter(order => order.userId === currentUser?.uid);

  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="history">
      <h1>История заказов</h1>
      {sortedOrders.length === 0 ? (
        <p>Нет заказов</p>
      ) : (
        sortedOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h2>Заказ #{order.id}</h2>
              <span className="order-date">{formatDate(order.createdAt)}</span>
            </div>

            <div className="order-contacts">
              <p><strong>Отправитель:</strong> {order.senderName} ({order.senderPhone})</p>
              <p><strong>Получатель:</strong> {order.receiverName} ({order.receiverPhone})</p>
            </div>

            <div className="order-details">
              <h3>Детали заказа:</h3>
              <div className="items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <div className="item-info">
                      {item.image && <img src={item.image} alt={item.title} />}
                      <span>{item.title} × {item.quantity}</span>
                    </div>
                    <span className="item-price">{item.price * item.quantity} сом</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-footer">
              <div className="order-total">
                <strong>Итого:</strong> {order.totalPrice} сом
              </div>
              {order.confirmed ? (
                <span className="confirmed-badge">✓ Подтвержден</span>
              ) : (
                <button
                  onClick={() => dispatch(confirmOrder(order.id))}
                  className="confirm-btn"
                >
                  Подтвердить получение
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Historyzakaza;



