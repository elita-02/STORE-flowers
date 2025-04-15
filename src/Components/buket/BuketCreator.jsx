import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBukets } from '../../redux/PetalMaker/buketSlice';
import './buket.scss';

const BuketCreator = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.buket);
  const [selectedFlowers, setSelectedFlowers] = useState([]);

  useEffect(() => {
    dispatch(fetchBukets());
  }, [dispatch]);

  const normalizeData = (items) => {
    return items
      .filter(item => item.title && item.price && item.category)
      .map(item => ({
        ...item,
        price: parseFloat(item.price.toString().replace(/[^0-9.]/g, '')),
        discount: parseFloat(item.discount?.toString().replace('%', '')) || 0
      }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KGS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const groupByCategory = (items) => {
    return items.reduce((acc, item) => {
      const category = item.category.toLowerCase();
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  };

  const handleSelectFlower = (flower) => {
    setSelectedFlowers((prev) => {
      const existing = prev.find((item) => item.id === flower.id);
      if (existing) {
        return prev.map((item) =>
          item.id === flower.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prev, { ...flower, count: 1 }];
      }
    });
  };

  const handleRemoveFlower = (flowerId) => {
    setSelectedFlowers((prev) =>
      prev
        .map((item) =>
          item.id === flowerId ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const totalPrice = selectedFlowers.reduce(
    (sum, flower) =>
      sum + flower.count * flower.price * (1 - flower.discount / 100),
    0
  );

  const groupedData = useMemo(() => {
    const normalized = normalizeData(items);
    return groupByCategory(normalized);
  }, [items]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="buket-container">
      <h1 className="main-title">💐 Собери свой букет</h1>

      {Object.entries(groupedData).map(([category, items]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div className="flowers-grid">
            {items.map((flower) => {
              const selected = selectedFlowers.find(f => f.id === flower.id);
              return (
                <div key={flower.id} className="flower-card">
                  {flower.discount > 0 && (
                    <div className="discount-badge">-{flower.discount}%</div>
                  )}
                  <div className="flower-image-container">
                    <img
                      src={flower.image}
                      alt={flower.title}
                      className="flower-image"
                      onError={(e) => {
                        e.target.src = '/default-flower.jpg';
                        e.target.classList.add('error-image');
                      }}
                    />
                  </div>
                  <div className="flower-info">
                    <h3 className="flower-title">{flower.title}</h3>
                    <p className="flower-description">{flower.description}</p>
                    <div className="price-container">
                      {flower.discount > 0 ? (
                        <>
                          <span className="original-price">
                            {formatPrice(flower.price)}
                          </span>
                          <span className="discounted-price">
                            {formatPrice(flower.price * (1 - flower.discount / 100))}
                          </span>
                        </>
                      ) : (
                        <span className="current-price">
                          {formatPrice(flower.price)}
                        </span>
                      )}
                    </div>

                    {/* + / - контроллору */}
                    <div className="quantity-controls">
                      <button
                        className="btn-minus"
                        onClick={() => handleRemoveFlower(flower.id)}
                      >
                        −
                      </button>
                      <span className="flower-count">
                        {selected?.count || 0}
                      </span>
                      <button
                        className="btn-plus"
                        onClick={() => handleSelectFlower(flower)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="selected-flowers">
        <h3>✨ Ваш букет:</h3>
        {selectedFlowers.length === 0 ? (
          <p>Вы ещё не выбрали цветы</p>
        ) : (
          <>
            <ul>
              {selectedFlowers.map((flower) => (
                <li key={flower.id} className="selected-item">
                  <span>{flower.title}</span> — {flower.count} шт.
                  <button onClick={() => handleRemoveFlower(flower.id)}>Удалить</button>
                </li>
              ))}
            </ul>
            <div className="total-price">
              Общая стоимость: <strong>{formatPrice(totalPrice)}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuketCreator;
