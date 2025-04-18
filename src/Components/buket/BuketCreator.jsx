import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBukets } from '../../redux/PetalMaker/buketSlice';
import './buket.scss';

const BuketCreator = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.buket);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [activeCategory, setActiveCategory] = useState('роза');

  useEffect(() => {
    dispatch(fetchBukets());
  }, [dispatch]);

  const normalizeData = (data) =>
    data
      .filter(i => i.title && i.price && i.category)
      .map(i => ({
        ...i,
        price: parseFloat(i.price.toString().replace(/[^\d.]/g, '')),
        discount: parseFloat(i.discount?.toString().replace('%', '')) || 0,
        category: i.category.toLowerCase()
      }));

  const groupedData = useMemo(() => {
    return normalizeData(items).reduce((acc, i) => {
      (acc[i.category] = acc[i.category] || []).push(i);
      return acc;
    }, {});
  }, [items]);

  const formatPrice = (p) =>
    new Intl.NumberFormat('ru-RU', { style: 'decimal', minimumFractionDigits: 0 }).format(p) + ' сом';

  const handleSelect = (flower) =>
    setSelectedFlowers((prev) =>
      prev.some(f => f.id === flower.id)
        ? prev.map(f => f.id === flower.id ? { ...f, count: f.count + 1 } : f)
        : [...prev, { ...flower, count: 1 }]
    );

  const handleDecrease = (id) =>
    setSelectedFlowers((prev) =>
      prev.map(f => f.id === id ? { ...f, count: f.count - 1 } : f).filter(f => f.count > 0)
    );

  const handleRemoveFlower = (id) => {
    setSelectedFlowers((prev) => prev.filter(f => f.id !== id));
  };

  const totalPrice = selectedFlowers.reduce(
    (sum, f) => sum + f.count * f.price * (1 - f.discount / 100), 0
  );

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="buket-container">
      <h1 className="buket-title">💐 Собери свой букет</h1>

      <div className="buket-tabs">
        {Object.keys(groupedData).map((cat) => (
          <button
            key={cat}
            className={`buket-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="buket-grid">
        {(groupedData[activeCategory] || []).map((f) => {
          const selected = selectedFlowers.find(i => i.id === f.id);
          const discounted = f.discount > 0;
          return (
            <div key={f.id} className="buket-flower-card">
              {discounted && <div className="discount-label">-{f.discount}%</div>}
              <div className="buket-image-wrapper">
                <img
                  src={f.image}
                  alt={f.title}
                  onError={(e) => {
                    e.target.src = '/default-flower.jpg';
                    e.target.classList.add('error-image');
                  }}
                />
              </div>
              <div className="buket-info">
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                <div className="buket-price">
                  {discounted ? (
                    <>
                      <span className="original">{formatPrice(f.price)}</span>
                      <span className="discounted">
                        {formatPrice(f.price * (1 - f.discount / 100))}
                      </span>
                    </>
                  ) : (
                    <span className="regular">{formatPrice(f.price)}</span>
                  )}
                </div>
                <div className="buket-controls">
                  <button className="btn-minus" onClick={() => handleDecrease(f.id)}>−</button>
                  <span className="count-display">{selected?.count || 0}</span>
                  <button className="btn-plus" onClick={() => handleSelect(f)}>+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="buket-selection">
        <h3 className="buket-selection-title">✨ Ваш букет:</h3>
        {selectedFlowers.length === 0 ? (
          <p className="buket-empty">Вы ещё не выбрали цветы</p>
        ) : (
          <>
            <ul className="buket-selected-list">
              {selectedFlowers.map((flower) => (
                <li key={flower.id} className="buket-selected-item">
                  <span className="buket-flower-name">{flower.title}</span> — {flower.count} шт.
                  <button
                    className="buket-remove-btn"
                    onClick={() => handleRemoveFlower(flower.id)}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
            <div className="buket-order-btn-wrapper">
  <button className="buket-order-btn">Заказать</button>
</div>
            <div className="buket-total">
              Общая стоимость: <strong>{formatPrice(totalPrice)}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuketCreator;
