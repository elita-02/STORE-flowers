import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity } from '../../redux/cart/CartSlice';
import './Cart.scss';

function Cart() {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(true); 

    // Товарды көбөйтүү
    const handleIncrement = (id) => {
        dispatch(updateQuantity({ id, quantity: 1 }));
    };

    // Товарды азайтуу
    const handleDecrement = (id) => {
        dispatch(updateQuantity({ id, quantity: -1 }));
    };

    // Ар бир товар үчүн жалпы бааны эсептөө
    const getItemTotalPrice = (price, quantity) => {
        const numericPrice = parseFloat(price) || 0;
        const numericQty = parseInt(quantity) || 0;
        return (numericPrice * numericQty).toFixed(2);
    };

    // Бардык товарлардын жалпы суммасын эсептөө
    const getTotalPrice = () => {
        return items.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseInt(item.quantity) || 0;
            return total + (price * qty);
        }, 0).toFixed(2);
    };

    // Модалды жабуу
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
<div className={`cart ${isModalOpen ? 'open' : 'closed'} container`}>
<div className="cart-content-wrapper">
  
  {/* СОЛ ТАРАП: Товарлар */}
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
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
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
      <button>Оформить заказ</button>
    </div>
  </div>
</div>
</div>

    );
}

export default Cart;
