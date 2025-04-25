

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.scss';
import { addOrder } from '../../redux/order/ordersSlice';
import { Link } from 'react-router-dom';


function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(2);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');

  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deliveryTimes = [
    'с 09:00 до 12:00',
    'с 12:00 до 15:00',
    'с 15:00 до 18:00',
    'с 18:00 до 21:00',
    'с 21:00 до 00:00'
  ];

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

  const handleConfirm = () => {
    if (!senderName || !senderPhone || !receiverName || !receiverPhone || !paymentMethod || !agreeTerms) {
      alert('Пожалуйста, заполните все обязательные поля и примите условия.');
      return;
    }

    const orderData = {
      senderName,
      senderPhone,
      receiverName,
      receiverPhone,
      deliveryDate: deliveryDate?.toISOString(),
      selectedTime,
      deliveryOption,
      paymentMethod,
      totalPrice: getTotalPrice(),
      items,
      createdAt: new Date().toISOString()
    };

    dispatch(addOrder(orderData));
    navigate('/history');
  };

  return (
    <div className="checkout container">
      <div className='checkout-header'>
        <Link to="/korzina"  className="step-link">
        <span className={`step ${activeStep === 1 ? 'active' : ''}`}>КОРЗИНА</span>
        </Link>
        <div className='arrow'>→</div>
        <span className={`step ${activeStep === 2 ? 'active' : ''}`}>Информация о заказе</span>
        <div className='arrow'>→</div>
        <Link to="/history" className="step-link">
          <span className={`step ${activeStep === 3 ? 'active' : ''}`}>Завершение заказа</span>
        </Link>

      </div>

      <div className="checkout-cel">
        <div className="chekcout-input">
          <div className="checout-line">
            <p>Уже покупали? Нажмите для входа</p>
            <h3>ЗАПОЛНИТЕ ДАННЫЕ ОТПРАВИТЕЛЯ</h3>
            <h2>Ваше Имя *</h2>
            <input type="text" value={senderName} onChange={e => setSenderName(e.target.value)} placeholder='Введите ваше имя' />
            <h2>Ваш номер телефона *</h2>
            <input type="text" value={senderPhone} onChange={e => setSenderPhone(e.target.value)} placeholder='Введите ваш номер телефона' />
            <div className="anon-checkbox">
              <label>
                <input type="checkbox" />
                Анонимная доставка (необязательно)
              </label>
            </div>
          </div>

          <div className='checkout-phone'>
            <h1>ДАННЫЕ ПОЛУЧАТЕЛЯ</h1>
            <h2>Имя получателя *</h2>
            <input type="text" value={receiverName} onChange={e => setReceiverName(e.target.value)} placeholder='Имя получателя' />
            <h2>Телефон получателя *</h2>
            <input type="text" value={receiverPhone} onChange={e => setReceiverPhone(e.target.value)} placeholder='+996 (000) 000-000' />
            <h2>Адрес получателя (необязательно)</h2>
            <input type="text" placeholder='Улица / Дом' />
            <h2>Дата доставки (необязательно)</h2>
            <DatePicker
              selected={deliveryDate}
              onChange={(date) => setDeliveryDate(date)}
              placeholderText="Выберите дату доставки"
              dateFormat="dd.MM.yyyy"
              locale={ru}
              className="custom-date-input"
              popperPlacement="bottom-start"
            />
          </div>

          <div className='checkout-time'>
            <h2>Время доставки (необязательно)</h2>
            <ul className="time-checkboxes">
              {deliveryTimes.map((time, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name="deliveryTime"
                      checked={selectedTime === time}
                      onChange={() => setSelectedTime(time)}
                    />
                    {time}
                  </label>
                </li>
              ))}
            </ul>

            <h2>Примечание к заказу (необязательно)</h2>
            <textarea className="custom-note-input" placeholder="Например: особые пожелания" />
          </div>
        </div>

        <div className="checkout-text">
          <h1>Ваш заказ</h1>
          <div className="checkout-header-row">
            <h2>ТОВАР</h2>
            <h2>ПОДЫТОГ</h2>
          </div>

          {items.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span>{item.title} x {item.quantity}</span>
              <span>{getItemTotalPrice(item.price, item.quantity)} сом</span>
            </div>
          ))}

          <div className="checkout-header-row1">
            <h2>ПОДЫТОГ</h2>
            <h2>{getTotalPrice()} сом</h2>
          </div>

          <h2 className='dostav'>Доставка</h2>
          <ul className="delivery-options">
            {[
              { value: "door", label: 'Курьером "до двери" — 300 сом' },
              { value: "remote", label: 'Отдаленные районы — 400 сом' },
              { value: "outskirts", label: 'За городом (согласовывается) — 500 сом' },
              { value: "kant", label: 'Кант / Сокулук — 1,500 сом' },
              { value: "pickup", label: 'Самовывоз' }
            ].map(option => (
              <li key={option.value}>
                <label>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value={option.value}
                    checked={deliveryOption === option.value}
                    onChange={() => setDeliveryOption(option.value)}
                  />
                  {option.label}
                </label>
              </li>
            ))}
          </ul>

          <div className="checkout-header-row">
            <h2>Итого</h2>
            <h2>{getTotalPrice()} сом</h2>
          </div>

          <h2>Способ оплаты *</h2>
          <ul className="payment-options">
            {[
              { value: "card", label: 'Картой (Visa / Mastercard)' },
              { value: "cash", label: 'Наличными' },
              { value: "mbank", label: 'Mbank (Элсом / О! / Balance)' }
            ].map(method => (
              <li key={method.value}>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={() => setPaymentMethod(method.value)}
                  />
                  {method.label}
                </label>
              </li>
            ))}
          </ul>

          <div className="terms-checkbox">
            <label>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              Я прочитал(а) и принимаю правила и условия сайта *
            </label>
          </div>
          <Link to="/history">
            <button className="confirm-order" onClick={handleConfirm}>
              ПОДТВЕРДИТЕ ЗАКАЗ
            </button>

          </Link>

          <p>Ваши личные данные используются для обработки заказов и в соответствии с нашей политикой конфиденциальности.</p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;




