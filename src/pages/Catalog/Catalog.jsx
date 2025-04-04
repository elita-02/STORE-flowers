import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { apiClient } from '../../axios/apiClient';
import './Catalog.scss';
import { getCategory } from '../../redux/category/categorySlice';

function Catalog() {
  const [desserts, setDesserts] = useState([]);
  const dispatch = useDispatch();

  async function fetchDesserts() {
    try {
      const response = await apiClient.get('/Nurzada/Flowers');
      console.log(response);

      if (response.data) {
        setDesserts(response.data);
      } else {
        console.log('Данные не получены');
      }
    } catch (error) {
      console.error('Ошибка при получении списка десертов:', error);
    }
  }

  useEffect(() => {
    fetchDesserts();
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div className="catalog">
      <h1>Каталог цветов</h1>
      <div className="dessert-list">
        {desserts.map((dessert) => (
          <div className="dessert-item" key={dessert.id}>
            <img src={dessert.image} alt={dessert.title} className="dessert-image" />
            <h2>{dessert.title}</h2>
            <p>{dessert.description}</p>
            <p><strong>Цена:</strong> {dessert.price}</p>
            <img src={dessert.avatar} alt="" />
            {dessert.discount && <p className="discount">Скидка: {dessert.discount}</p>}
            <p><strong>Для:</strong> {dessert.komu}</p>
            <p><strong>Повод:</strong> {dessert.povod}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
