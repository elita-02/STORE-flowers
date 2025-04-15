import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategory, setSearch, setKomu, setOccasion, setColor } from '../../redux/category/categorySlice';
import hart from '../../assets/svg/hart.svg';
import QuickViewModal from '../../Components/QuickViewModal/QuickViewModal';  // Импорттогон компонентибиз
import './Tovar.scss';

function Tovar() {
    const { category, search, komu, occasion, color } = useSelector((state) => state.category);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [quickViewItem, setQuickViewItem] = useState(null);  // Модал үчүн state

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

    const handleAddToCart = (item, e) => {
        e.stopPropagation();
        dispatch(addToCart({
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: 1
        }));
    };

    const handleQuickView = (e, id) => {
        e.stopPropagation();
        const selectedItem = category.find((item) => item.id === id);  // Товардын IDсин табуу
        setQuickViewItem(selectedItem);  // Тандалган товарды set кылуу
    };

    const handleAddToFavorite = (e, id) => {
        e.stopPropagation();
        console.log("Добавлено в избранное", id);
    };

    return (
        <div className='mack-container'>
            <h1>Каталог товаров</h1>

            <div className="menu-container">
                <div className="katalog">
                    <div className="menu">
                        <div className="menu-items">
                            <h1>Букеты</h1>
                            {menu.map((item, index) => (
                                <div onClick={() => dispatch(setSearch(item))} key={index} className="menu-item">
                                    {item}
                                </div>
                            ))}
                        </div>
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
                                    <select name="occasion" onChange={(e) => dispatch(setOccasion(e.target.value))} className="filter-select">
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
                                    <select name="recipient" onChange={(e) => dispatch(setKomu(e.target.value))} className="filter-select">
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
                                    <select name="color" onChange={(e) => dispatch(setColor(e.target.value))} className="filter-select">
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
                                                src={hart}
                                                alt="hart"
                                                className="hart-icon"
                                                onClick={(e) => handleAddToFavorite(e, item.id)}
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
                                                onClick={(e) => handleAddToCart(item, e)}
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
        </div>
    );
}

export default Tovar;





