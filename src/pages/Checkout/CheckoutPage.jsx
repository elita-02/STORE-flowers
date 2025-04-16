import React from 'react'
import Checkout from '../../Components/Checkout/Checkout'
import './CheckoutPage.scss'

function CheckoutPage() {
  return (
    <div>
      <div className='checkout-header'>
        <h2>КОРЗИНА</h2>
        <h2>Информация о заказе  </h2>
        <h2>Завершение заказа </h2>
      </div>

      <div className='checkout container'>
        <div className="checout-input">
          <div className="checout-line">
            <p>Уже покупали? Нажмите для входа</p>

            <h3>ЗАПОЛНИТЕ ДАННЫЕ ОТПРАВИТЕЛЯ</h3>
            <h2>Ваше Имя *</h2>
            <input type="text" placeholder='Введите ваше имя' />
            <h2>Ваш номер телефона *
            </h2>
            <input type="text" placeholder='Введите ваше номер телефона ' />
            <ul>
              <li> Анонимная доставка (отметьте галочкой) (необязательно) </li>
            </ul>


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
            <input type="text" placeholder='Выберете дату доставки ' />
          </div>
          <div className='checkout-time'>
            <h2>Время доставки (необязательно)</h2>
            <ul>
              <li>с 09:00 до 12:00</li>
              <li>с 12:00 до 15:00</li>
              <li>с 15:00 до 18:00</li>
              <li>с 18:00 до 21:00</li>
              <li>с 21:00 до 00:00</li>

            </ul>
            <h2>Примечание к заказу (необязательно)</h2>
            <input type="text" placeholder='например особые пожелание' />
          </div>
        </div>

        <div className="checkout-text">
          <h1>Ваш заказ</h1>
          <div>
            <h2>ТОВАР</h2>
            <h2>Подытог</h2>

          </div>
          <h2>Подытог</h2>
          <h2>Доставка</h2>
          <ul>
            <li>Курьером "до двери" получателя: 300сом</li>
            <li>Курьером, в отдаленные районы (Аламедин, Тунгуч, Верхний Джал, VIP городки: Ортосай, Браво, Киргизия-1, Царское Село, Пригородное, Лебединовка): 400сом</li>
            <li>Курьером, за чертой города (Согласовывается): 500сом</li>
            <li>Курьером, за чертой города (Кант/Сокулук): 1,500сом</li>
            <li>Самовывоз</li>
          </ul>
          <h2>Итого</h2>

          <ul>
            <li>
              <img src="./img/mbank-icon.svg" alt="MBank" />
              <span>MBank аркылуу</span>
            </li>
            <li>
              <img src="./img/ogo-icon.svg" alt="О!Деньги" />
              <span>О!Деньги</span>
            </li>
            <li>
              <img src="./img/cash-icon.svg" alt="Наличные" />
              <span>Наличный расчет</span>
            </li>
          </ul>

          <ul>
            <li>
              Я прочитал(а) и принимаю правила и условия сайта *
            </li>
          </ul>
          <button>ПОТВЕРДИТЕ ЗАКАЗ</button>
          <p>Ваши личные данные будут использоваться для обработки ваших заказов, упрощения вашей работы с сайтом и для других целей, описанных в нашей политика конфиденциальности.

          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

