import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategory, setSearch } from '../../redux/category/categorySlice';
import karzin from '../../assets/svg/karzin.svg';

function Tovar() {
    const { category, loading, error, search } = useSelector((state) => state.category);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState(""); 
    const [showSearch, setShowSearch] = useState(false);

    // State for filters
    const [filters, setFilters] = useState({
        occasion: '',
        recipient: '',
        color: ''
    });

    // Fetch products based on selected filters or search
    useEffect(() => {
        dispatch(getCategory({ search, text }));
    }, [dispatch, search, text]);

    const menu = [
        'Букеты из розы', 'Букет из хризантем', 'Букет из альтромерии', 'Букет из пионов', 'Букет из эустомы',
        'Букет из тюльпанов', 'Букет из орхидей', 'Букет из гортензий', 'Букет из гвоздики', 'Дизайнерские букеты',
        'Весенние букеты', 'Розы', 'Букет невесты', 'Вкусныебукеты'
    ];

    // Function to handle category selection
    function setCake(item) {
        dispatch(setSearch(item)); // Update search value when category is selected
        setFilters({
            occasion: '',
            recipient: '',
            color: ''
        }); // Reset filters when a new category is selected
    }

    // Function to handle search input
    function changeSearch(e) {
        if (e.key === 'Enter') {  // Only trigger on Enter key
            dispatch(setSearch(text)); // Dispatch search query change
        }
    }

    // Function to toggle search visibility
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    // Function to handle category click and navigate to the product details page
    const handleCardClick = (item) => {
        navigate(`/Flowers/${item.id}`);
    };

    // Function to handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    // Filter products based on selected filters
    const filteredProducts = category.filter(item => {
        return (
            (filters.occasion ? item.povod === filters.occasion : true) &&
            (filters.recipient ? item.komu === filters.recipient : true) &&
            (filters.color ? item.color === filters.color : true)
        );
    });

    return (
        <div className="menu-container">
            <div className="katalog">
                <div className="menu">
                    <div className="menu-items">
                        <h1>Меню</h1>
                        {menu.map((item, index) => (
                            <div onClick={() => setCake(item)} key={index} className="menu-item">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="category-items">
                    <div className="cards">
                        <div className="search">
                            <h1>Каталог</h1>
                            <div className="search-container">
                                {!showSearch && (
                                    <img
                                        src="https://cdn.vectorstock.com/i/preview-1x/34/33/search-icon-magnifier-symbol-flat-vector-11283433.jpg"
                                        alt="search-icon"
                                        onClick={toggleSearch}
                                        style={{ cursor: 'pointer' }}
                                    />
                                )}
                                {showSearch && (
                                    <input
                                        type="text"
                                        placeholder="Что вы ищите?"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        onKeyDown={changeSearch}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Filter Section */}
                        <div className="filters">
                            <select
                                name="occasion"
                                value={filters.occasion}
                                onChange={handleFilterChange}
                                className="filter-select"
                            >
                                <option value="">Повод</option>
                                <option value="День Святого Валентина">День Святого Валентина</option>
                                <option value="День Рождения">День Рождения</option>
                                <option value="Без повода">Без повода</option>
                                <option value="Праздник">Праздник</option>
                                <option value="На 8 марта">На 8 марта</option>
                                <option value="Годовщина">Годовщина</option>
                            </select>
                            <select
                                name="recipient"
                                value={filters.recipient}
                                onChange={handleFilterChange}
                                className="filter-select"
                            >
                                <option value="">Кому</option>
                                <option value="Любимой">Любимой</option>
                                <option value="Маме">Маме</option>
                                <option value="Для друга">Для друга</option>
                                <option value="Девушке">Девушке</option>
                                <option value="Сестре">Сестре</option>
                                <option value="Подруге">Подруге</option>
                            </select>
                            <select
                                name="color"
                                value={filters.color}
                                onChange={handleFilterChange}
                                className="filter-select"
                            >
                                <option value="">Цвет</option>
                                <option value="Красный">Красный</option>
                                <option value="Белый">Белый</option>
                                <option value="Розовый">Розовый</option>
                                <option value="Пурпурный">Пурпурный</option>
                                <option value="Оранжевый">Оранжевый</option>
                                <option value="Желтый">Желтый</option>
                                <option value="Голубой">Голубой</option>
                            </select>
                        </div>

                        {/* Product Cards */}
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item) => (
                                <div key={item.id} className="card" onClick={() => handleCardClick(item)}>
                                    <img src={item.image} alt={item.title} className="card-image" />
                                    <div className="card-content">
                                        <div className="h1">
                                            <h1 className="card-title">{item.title}</h1>
                                            <p className="card-price">{item.price}</p>
                                        </div>
                                        <div className="line"></div>
                                        <p className="card-description">{item.description}</p>
                                        <div className="add-to-cart">
                                            <img src={karzin} alt="Корзина" className="add-to-cart-icon" />
                                            <span className="add-to-cart-text">В корзину</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Товаров не найдено</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tovar;


