// import React, { useState } from 'react';
// import './QuickViewModal.scss';  

// function QuickViewModal({ item, onClose }) {
   
//     const whatsappUrl = `https://wa.me/996706247507?text=Здравствуйте,%20сколько%20стоит%20${encodeURIComponent(item.title)}%20и%20вот%20её%20сурот:%20${encodeURIComponent(item.image)}`;


//     const [quantity, setQuantity] = useState(1); 

 
//     const price = parseFloat(item.price);  
//     const totalPrice = (price * quantity).toFixed(2);  

 
//     const increaseQuantity = () => {
//         setQuantity(prevQuantity => prevQuantity + 1);
//     };


//     const decreaseQuantity = () => {
//         if (quantity > 1) {  
//             setQuantity(prevQuantity => prevQuantity - 1);
//         }
//     };

//     console.log('Item price:', item.price); 
//     console.log('Parsed price:', price);  

//     return (
//         <div className="quick-view-modal">
//             <div className="modal-content">
//                 <div className="fort">
//                     <div className="image-container">
//                         <img src={item.image} alt={item.title} />
//                     </div>
//                     <div className="details-container">
//                         <img
//                             onClick={onClose}
//                             className="close-button"
//                             src="https://icones.pro/wp-content/uploads/2022/05/icone-fermer-et-x-noir-2.png"
//                             alt="Close"
//                         />
//                         <h2>{item.title}</h2>
//                         <div className="line"></div>
//                         <p>{item.description}</p>
//                         <div className='summa'>

//                             <div className="quantity-controls">
//                                 <button onClick={decreaseQuantity}>-</button>
//                                 <span>{quantity}</span>
//                                 <button onClick={increaseQuantity}>+</button>
//                             </div>


//                             <p><strong>Цена:</strong> {totalPrice} сом</p>
//                         </div>

//                         <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
//                             <button className="What-btn">WhatsApp</button>
//                         </a>

//                         <button className='vkorzin'>В КОРЗИНУ</button>
//                         <p className="foto">Фотоотчет: ФОТООТЧЕТ с получателем в праздничные дни (14 Февраля, 8 марта) делаем ПО ВОЗМОЖНОСТИ</p>
//                         <div className="line"></div>
//                         <p>Категория: {item.category}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default QuickViewModal;

import React, { useState } from 'react';
import './QuickViewModal.scss';

function QuickViewModal({ item, onClose }) {
    const whatsappUrl = `https://wa.me/996706247507?text=Здравствуйте,%20сколько%20стоит%20${encodeURIComponent(item.title)}%20и%20вот%20её%20сурот:%20${encodeURIComponent(item.image)}`;

    const [quantity, setQuantity] = useState(1);

    const price = parseFloat(item.price);
    const totalPrice = (price * quantity).toFixed(2);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className="quick-view-modal">
            <div className="modal-content">
                <div className="fort">
                    <div className="image-container">
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className="details-container">
                        <img
                            onClick={onClose}
                            className="close-button"
                            src="https://icones.pro/wp-content/uploads/2022/05/icone-fermer-et-x-noir-2.png"
                            alt="Close"
                        />
                        <h2>{item.title}</h2>
                        <div className="line"></div>
                        <p>{item.description}</p>
                        <div className="summa">
                            <div className="quantity-controls">
                                <button onClick={decreaseQuantity}>-</button>
                                <span>{quantity}</span>
                                <button onClick={increaseQuantity}>+</button>
                            </div>
                            <p><strong>Цена:</strong> {totalPrice} сом</p>
                        </div>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <button className="What-btn">WhatsApp</button>
                        </a>
                        <button className="vkorzin">В КОРЗИНУ</button>
                        <p className="foto">Фотоотчет: ФОТООТЧЕТ с получателем в праздничные дни (14 Февраля, 8 марта) делаем ПО ВОЗМОЖНОСТИ</p>
                        <div className="line"></div>
                        <p>Категория: {item.category}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuickViewModal;





