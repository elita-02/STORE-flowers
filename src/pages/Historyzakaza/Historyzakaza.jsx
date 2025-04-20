import React from 'react';
import { useSelector } from 'react-redux';

function Historyzakaza() {
  const orders = useSelector((state) => state.orders?.list || []); // 👈 корголгон окуу

  return (
    <div className="history">
      <h1>История заказов</h1>
      {orders.length === 0 ? (
        <p>Нет заказов</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h2>Отправитель: {order.senderName}</h2>
            <p>Получатель: {order.receiverName}</p>
            <p>Сумма: {order.totalPrice} сом</p>
            <p>Дата: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Historyzakaza;


