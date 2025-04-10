// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateQuantity } from '../../redux/cart/CartSlice';
// import "./Cart.scss";

// function Cart() {
//     const items = useSelector((state) => state.cart.items);
//     const dispatch = useDispatch();

//     // Товарды көбөйтүү
//     const handleIncrement = (id) => {
//         dispatch(updateQuantity({ id, quantity: 1 }));
//     };
//     const handleAddToCart = (dessert) => {
//       dispatch(addToCart(dessert)); // Продуктту корзинага кош
//       setIsModalOpen(true);         // Модалды ач
//   };
  
//     // Товарды азайтуу
//     const handleDecrement = (id) => {
//         dispatch(updateQuantity({ id, quantity: -1 }));
//     };
 
//     // Ар бир товар үчүн жалпы бааны эсептөө
//     const getItemTotalPrice = (price, quantity) => {
//         return (price * quantity).toFixed(2);
//     };

//     // Бардык товарлардын жалпы суммасын эсептөө
//     const getTotalPrice = () => {
//         return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//     };

//     return (
//         <div className="cart">
//             <div className="cart_top container">
//                 <p>Продукт ({items.length > 0 ? items.length : 'Корзина пуста'})</p>
//                 <p>Цена</p>
//                 <p>Количество</p>
//                 <p>Общая цена</p>
//             </div>

//             {items.length === 0 ? (
//                 <p></p>
//             ) : (
//                 items.map((item) => (
//                     <div className="cart_product container" key={item.id}>
//                         <div className="cart_title">
//                             <img src={item.image} alt={item.title} />
//                             <p>{item.title}</p>
//                         </div>
//                         <span className="new-price">${item.price}</span>

//                         <div className="quantity-controls">
//                             <button className="quantity-btn">
//                                 <span onClick={() => handleDecrement(item.id)}>-</span>
//                                 <span className="quantity-value">{item.quantity}</span>
//                                 <span onClick={() => handleIncrement(item.id)}>+</span>
//                             </button>
//                         </div>

//                         {/* Ар бир товар үчүн жалпы бааны көрсөтүү */}
//                         <span className="total-price">${getItemTotalPrice(item.price, item.quantity)}</span>
//                     </div>
//                 ))
//             )}

//             {/* Бардык товарлардын жалпы суммасын көрсөтүү */}
//             {items.length > 0 && (
//                 <div className="cart_total">
//                     <p>Общая сумма: ${getTotalPrice()}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Cart;


// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateQuantity } from '../../redux/cart/CartSlice';
// import './Cart.scss';

// function Cart() {
//     const items = useSelector((state) => state.cart.items);
//     const dispatch = useDispatch();

//     // Товарды көбөйтүү
//     const handleIncrement = (id) => {
//         dispatch(updateQuantity({ id, quantity: 1 }));
//     };

//     // Товарды азайтуу
//     const handleDecrement = (id) => {
//         dispatch(updateQuantity({ id, quantity: -1 }));
//     };

//     // Ар бир товар үчүн жалпы бааны эсептөө
//     const getItemTotalPrice = (price, quantity) => {
//         const numericPrice = parseFloat(price) || 0;
//         const numericQty = parseInt(quantity) || 0;
//         return (numericPrice * numericQty).toFixed(2);
//     };

//     // Бардык товарлардын жалпы суммасын эсептөө
//     const getTotalPrice = () => {
//         return items.reduce((total, item) => {
//             const price = parseFloat(item.price) || 0;
//             const qty = parseInt(item.quantity) || 0;
//             return total + (price * qty);
//         }, 0).toFixed(2);
//     };

//     return (
//         <div className="cart">
//             <div className="cart_top container">
//                 <p>Продукт ({items.length > 0 ? items.length : 'Корзина пуста'})</p>
//                 <p>Цена</p>
//                 <p>Количество</p>
//                 <p>Общая цена</p>
//             </div>

//             {items.length === 0 ? (
//                 <p className="empty-cart">Корзина азырынча бош</p>
//             ) : (
//                 items.map((item) => (
//                     <div className="cart_product container" key={item.id}>
//                         <div className="cart_title">
//                             <img src={item.image} alt={item.title} />
//                             <p>{item.title}</p>
//                         </div>
//                         <span className="new-price">{parseFloat(item.price).toFixed(2)} сом</span>

//                         <div className="quantity-controls">
//                             <button className="quantity-btn">
//                                 <span onClick={() => handleDecrement(item.id)}>-</span>
//                                 <span className="quantity-value">{item.quantity}</span>
//                                 <span onClick={() => handleIncrement(item.id)}>+</span>
//                             </button>
//                         </div>

//                         <span className="total-price">
//                             {getItemTotalPrice(item.price, item.quantity)} сом
//                         </span>
//                     </div>
//                 ))
//             )}

//             {items.length > 0 && (
//                 <div className="cart_total">
//                     <p>Общая сумма: {getTotalPrice()} сом</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Cart;


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity } from '../../redux/cart/CartSlice';
import './Cart.scss';

function Cart() {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(true); // Модалдын ачылышы

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
        <div className={`cart ${isModalOpen ? 'open' : 'closed'}`}>
            <div className="cart_top container">
                <p>Продукт ({items.length > 0 ? items.length : 'Корзина пуста'})</p>
                <p>Цена</p>
                <p>Количество</p>
                <p>Общая цена</p>
            </div>

            {items.length === 0 ? (
                <p className="empty-cart">Корзина азырынча бош</p>
            ) : (
                items.map((item) => (
                    <div className="cart_product container" key={item.id}>
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

            {items.length > 0 && (
                <div className="cart_total">
                    <p>Общая сумма: {getTotalPrice()} сом</p>
                </div>
            )}

            {/* Модалдык терезени жабуу */}
        </div>
    );
}

export default Cart;
