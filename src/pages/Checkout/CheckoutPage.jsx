import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CheckoutPage.scss';

function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const items = useSelector((state) => state.cart.items);
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

  return (
    <div>
      <div className='checkout container'>
        <div className='checkout-header'>
          <Link to="/korzina" className={`step ${activeStep === 1 ? 'active' : ''}`}>
            КОРЗИНА
          </Link>

          <div className='arrow'>→</div>
          <div className={`step ${activeStep === 2 ? 'active' : ''}`}>Информация о заказе</div>
          <div className='arrow'>→</div>
          <div className={`step ${activeStep === 3 ? 'active' : ''}`}>Завершение заказа</div>
        </div>

        <div className="checkout-cel">
          <div className="chekcout-input">
            <div className="checout-line">
              <p>Уже покупали? Нажмите для входа</p>

              <h3>ЗАПОЛНИТЕ ДАННЫЕ ОТПРАВИТЕЛЯ</h3>
              <h2>Ваше Имя *</h2>
              <input type="text" placeholder='Введите ваше имя' />
              <h2>Ваш номер телефона *</h2>
              <input type="text" placeholder='Введите ваше номер телефона ' />
              <div className="anon-checkbox">
                <label>
                  <input type="checkbox" />
                  Анонимная доставка (отметьте галочкой) (необязательно)
                </label>
              </div>
            </div>

            <div className='checkout-phone'>
              <h1>УКАЖИТЕ ДАННЫЕ ЧЕЛОВЕКА, КОМУ ВЫ ОТПРАВЛЯЕТЕ ПОДАРОК</h1>
              <h2>Имя получателя *</h2>
              <input type="text" placeholder='Имя получателя ' />
              <h2>Телефон получателя *</h2>
              <input type="text" placeholder='+996 (000) 000-000' />
              <h2>Адрес получателя (необязательно) </h2>
              <input type="text" placeholder='Название улицы или номер дома' />
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
              <textarea
                className="custom-note-input"
                placeholder="например особые пожелание"
              />

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
              <li>
                <label>
                  <input type="radio" name="deliveryOption" value="door" />
                  Курьером "до двери" получателя: 300сом
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="deliveryOption" value="remote" />
                  Курьером, в отдаленные районы (Аламедин, Тунгуч, Верхний Джал, VIP городки: Ортосай, Браво, Киргизия-1, Царское Село, Пригородное, Лебединовка): 400сом
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="deliveryOption" value="outskirts" />
                  Курьером, за чертой города (Согласовывается): 500сом
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="deliveryOption" value="kant" />
                  Курьером, за чертой города (Кант/Сокулук): 1,500сом
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="deliveryOption" value="pickup" />
                  Самовывоз
                </label>
              </li>
            </ul>
            <div className="checkout-header-row">
              <h2>Итого</h2>
              <h2>{getTotalPrice()} сом</h2>
            </div>
            <h2>Способ оплаты *</h2>
            <ul className="payment-options">
              <li>
                <label>
                  <input type="radio" name="paymentMethod" value="card" />
                  Оплата картой (Visa / Mastercard)
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="paymentMethod" value="cash" />
                  Наличными при получении
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="paymentMethod" value="mbank" />
                  Mbank (Элсом / О! / Balance)
                </label>
              </li>
            </ul>
            <div className="terms-checkbox">
              <label>
                <input type="checkbox" required />
                Я прочитал(а) и принимаю правила и условия сайта *
              </label>
            </div>

            <button className="confirm-order">ПОТВЕРДИТЕ ЗАКАЗ</button>
            <p>Ваши личные данные будут использоваться для обработки ваших заказов, упрощения вашей работы с сайтом и для других целей, описанных в нашей политика конфиденциальности.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

