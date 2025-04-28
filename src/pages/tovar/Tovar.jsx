import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    getCategory,
    setSearch,
    setKomu,
    setOccasion,
    setColor
} from '../../redux/category/categorySlice';
import { addWish, removeWish } from '../../redux/wish/wishSlice';
import { addToCart } from '../../redux/cart/cartSlice'; 
import hart from '../../assets/svg/hart.svg';
import redser from '../../assets/svg/redser.svg';
import QuickViewModal from '../../Components/QuickViewModal/QuickViewModal';
import Modal from '../../Components/modal/Modal'; 
import './Tovar.scss';

function Tovar() {
    const { category, search, komu, occasion, color } = useSelector((state) => state.category);
    const wishlist = useSelector((state) => state.wishlist.items);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [quickViewItem, setQuickViewItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(getCategory({ cake: search, text, komu, occasion, color }));
    }, [dispatch, search, text, komu, occasion, color]);

    const menu = [
        'Букеты из розы', 'Букет из хризантем', 'Букет из альтромерии',
        'Букет из пионов', 'Букет из эустомы', 'Букет из тюльпанов',
        'Букет из орхидей', 'Букет из гортензий', 'Букет из гвоздики',
        'Дизайнерские букеты', 'Весенние букеты', 'Розы',
        'Букет невесты', 'Вкусные букеты'
    ];

    const handleAddToFavorite = (e, item) => {
        e.stopPropagation();
        const isWished = wishlist.some((wishItem) => wishItem.id === item.id);
        if (!isWished) {
            dispatch(addWish(item));
        } else {
            dispatch(removeWish(item.id));
        }
    };

    const handleQuickView = (e, id) => {
        e.stopPropagation();
        const selectedItem = category.find((item) => item.id === id);
        setQuickViewItem(selectedItem);
    };

    const handleAddToCart = (e, item) => {
        e.stopPropagation(); 
        dispatch(addToCart(item));
        setIsModalOpen(true);
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
      };

    return (
        <div className='mack-container'>
            <h1>Каталог товаров</h1>

          
            <div 
                className={`burger-btn ${isMenuOpen ? 'open' : ''}`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="menu-container">
                <div className="katalog">
                    <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
                        <h1>Букеты</h1>
                        {menu.map((item, index) => (
                            <div 
                                onClick={() => {
                                    dispatch(setSearch(item));
                                    setIsMenuOpen(false);
                                }} 
                                key={index} 
                                className="menu-item"
                            >
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="category-items">
                        <div className="cards">
                            <div className='input-option'>
                                <div className="search">
                                    <div className="search-container">
                                        {!showSearch ? (
                                            <img
                                                src="https://cdn.vectorstock.com/i/preview-1x/34/33/search-icon-magnifier-symbol-flat-vector-11283433.jpg"
                                                alt="search"
                                                onClick={() => setShowSearch(true)}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                placeholder="Что вы ищите?"
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && dispatch(setSearch(text))}
                                                autoFocus
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="filters">
                                    <select onChange={(e) => dispatch(setOccasion(e.target.value))} className="filter-select">
                                        <option value="">Повод</option>
                                        <option value="День Святого Валентина">День Святого Валентина</option>
                                        <option value="День Рождения">День Рождения</option>
                                        <option value="Без повода">Без повода</option>
                                        <option value="Юбилей">Юбилей</option>
                                        <option value="Праздник">Праздник</option>
                                        <option value="День матери">День матери</option>
                                        <option value="Событие">Событие</option>
                                        <option value="Корпоратив">Корпоратив</option>
                                        <option value="День влюбленных">День влюбленных</option>
                                    </select>
                                    <select onChange={(e) => dispatch(setKomu(e.target.value))} className="filter-select">
                                        <option value="">Кому</option>
                                        <option value="Любимой">Любимой</option>
                                        <option value="Маме">Маме</option>
                                        <option value="Девушке">Девушке</option>
                                        <option value="Друзьям">Друзьям</option>
                                        <option value="Для бабушки">Для бабушки</option>
                                        <option value="Невесте">Невесте</option>
                                        <option value="Для жены">жене</option>
                                        <option value="Для сестры">Для сестры</option>
                                        <option value="Для творческого человека">Для креативных людей</option>
                                    </select>
                                    <select onChange={(e) => dispatch(setColor(e.target.value))} className="filter-select">
                                        <option value="">Цвет</option>
                                        <option value="Красный">Красный</option>
                                        <option value="Розовый">Розовый</option>
                                        <option value="Белый">Белый</option>
                                        <option value="Разноцветный">Разноцветный</option>
                                        <option value="Персиковый">Персиковый</option>
                                        <option value="Голубой">Голубой</option>
                                        <option value="Бежевый">Бежевый</option>
                                        <option value="Пурпурный">Пурпурный</option>
                                        <option value="Черный">Черный</option>
                                        <option value="Синий">Синий</option>
                                    </select>
                                </div>
                            </div>

                            <div className="card-grid">
                                {category.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="card"
                                        onClick={() => navigate(`/Flowers/${item.id}`)}
                                        style={{ '--i': index }}
                                    >
                                        <div className="image-container">
                                            <img src={item.image} alt={item.title} className="card-image" />
                                            <img
                                                src={wishlist.some((wishItem) => wishItem.id === item.id) ? redser : hart}
                                                alt="hart"
                                                className="hart-icon"
                                                onClick={(e) => handleAddToFavorite(e, item)}
                                            />
                                            <button
                                                className="quick-view"
                                                onClick={(e) => handleQuickView(e, item.id)}
                                            >
                                                Быстрый просмотр
                                            </button>
                                        </div>
                                        <div className="card-content">
                                            <div className="h1">
                                                <h1>"{item.title}"</h1>
                                                <p>{item.price}</p>
                                            </div>
                                            <div className="line"></div>
                                            <p className="card-description">{item.description}</p>
                                            <button
                                                className="add-btn"
                                                onClick={(e) => handleAddToCart(e, item)} 
                                            >
                                                В корзину
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {quickViewItem && (
                <QuickViewModal item={quickViewItem} onClose={() => setQuickViewItem(null)} />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                items={cartItems}
                onRemoveItem={handleRemoveItem}
            />
        </div>
    );
}

export default Tovar;
