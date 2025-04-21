import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../redux/reviews/reviewsSlice';
import './Reviews.scss';

function getFormattedDate(dateString) {
  const months = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function Reviews() {
  const dispatch = useDispatch();
  const { items: photoReviews, loading, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const videoReviews = [
    {
      id: 'v1',
      title: 'Видео отзыв от клиента (апрель)',
      description: 'Очень понравился букет, быстрая доставка и отличный сервис!',
      video: 'https://i.imgur.com/ADQl8eu.mp4',
      createdAt: '2025-04-15T10:00:00Z',
    },
    {
      id: 'v2',
      title: 'Видео отзыв от клиента (февраль)',
      description: 'Прекрасное обслуживание, буду заказывать снова!',
      video: 'https://i.imgur.com/hsjcj2l.mp4',
      createdAt: '2025-02-22T09:30:00Z',
    }
  ];

  return (
    <div className='reviews-page'>
    <div className=" container">
      <div className="reviews-header">
        <h2>📸 Фото и Видео отзывы</h2>
      </div>

      <div className="reviews-list">
        {videoReviews.map((review) => (
          <div key={review.id} className="review-card">
            <video controls width="100%">
              <source src={review.video} type="video/mp4" />
              Ваш браузер не поддерживает воспроизведение видео.
            </video>
            <div className="review-info">
              <h4>{review.title}</h4>
              <p>От клиента: {review.description}</p>
              <p className="review-date">
                📅 Добавлено: {getFormattedDate(review.createdAt)}
              </p>
            </div>
          </div>
        ))}

        {loading && <p>Жүктөлүүдө...</p>}
        {error && <p className="error">Ката чыкты: {error}</p>}
        {!loading && photoReviews.length === 0 && <p>Азырынча фото пикирлер жок.</p>}

        {photoReviews.map((review) => (
          <div key={review.id} className="review-card">
            <img src={review.image} alt={review.title} />
            <div className="review-info">
              <h4>{review.title}</h4>
              <p>От клиента: {review.description}</p>
              <p className="review-date">
                📅 Добавлено: {getFormattedDate(review.createdAt || new Date())}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Reviews;
