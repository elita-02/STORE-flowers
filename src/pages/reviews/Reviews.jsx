import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../redux/reviews/reviewsSlice'; // Туура жолду текшер
import ReviewForm from '../../Components/ReviewForm/ReviewForm';
import './Reviews.scss';

function getMonthName(dateString) {
  const months = [
    'Январе', 'Феврале', 'Марте', 'Апреле', 'Мае', 'Июне',
    'Июле', 'Августе', 'Сентябре', 'Октябре', 'Ноябре', 'Декабре'
  ];
  const date = new Date(dateString);
  return months[date.getMonth()];
}

function Reviews() {
  const dispatch = useDispatch();
  const { items: reviews, loading, error } = useSelector((state) => state.reviews);

  // 🔥 API'ни чакыруу
  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h2>📸 Фото отчёты</h2>
      </div>

      <div className="reviews-form-section">
      </div>

      <div className="reviews-list">
        {loading && <p>Жүктөлүүдө...</p>}
        {error && <p className="error">Ката чыкты: {error}</p>}

        {reviews.length === 0 && !loading && <p>Азырынча пикирлер жок.</p>}

        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <img src={review.image} alt={review.title} />
            <div className="review-info">
              <h4>{review.title}</h4>
              <p>ОТ клиента: {review.description}</p>
              <p className="review-date">📅 Добавлен в {getMonthName(review.createdAt || new Date())}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
