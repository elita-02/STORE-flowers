import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart/cartSlice';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Izbrannyi.scss';

function Izbrannyi() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [review, setReview] = useState('');
  const [userName, setUserName] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const productId = state?.id;

  useEffect(() => {
    if (productId) {
      const fetchReviews = async () => {
        const q = query(collection(db, 'reviews'), where('productId', '==', productId));
        const snapshot = await getDocs(q);
        setSubmittedReviews(snapshot.docs.map(doc => doc.data()));
      };
      fetchReviews();
    }
  }, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) return;
    if (!user) {
      alert('Авторизация талап кылынат.');
      return;
    }

    const finalName = user.displayName || userName || user.email;

    const newReview = {
      review,
      userName: finalName,
      createdAt: serverTimestamp(),
      productId,
    };

    await addDoc(collection(db, 'reviews'), newReview);
    setSubmittedReviews(prev => [...prev, newReview]);
    setReview('');
    setUserName('');
    setIsReviewFormVisible(false); 
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...state, quantity: 1 }));
    navigate('/corzina');
  };

  const handleBack = () => navigate(-1);

  const toggleReviewForm = () => setIsReviewFormVisible(prev => !prev);

  if (!state) {
    return <p style={{ padding: '40px' }}>Нет данных о товаре.</p>;
  }

  return (
    <div className="izbrannyi-page container">
      <h2 className="title">🌸 Избранный товар</h2>

      <div className="wish-card">
        <img src={state.image} alt={state.title} className="wish-card-image" />
        <div className="wish-card-content">
          <h3>{state.title}</h3>
          <p className="price">💐 Цена: {state.price}</p>
          <p className="description">{state.description || 'Описание отсутствует.'}</p>

          <div className="wish-card-actions">
            <Link to="/korzina" className="order-link">
              <button onClick={handleAddToCart} className="order-btn">🛒 В корзину</button>
            </Link>
            <button onClick={handleBack} className="back-btn">🔙 Назад</button>
          </div>
        </div>
      </div>

      {submittedReviews.length > 0 && (
        <div className="review-carousel">
          <h4>Отзывы покупателей:</h4>

          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            spaceBetween={20}
          >
            {submittedReviews.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="review-item">
                  <p className="review-text">{item.review}</p>
                  <p className="review-author">👤 {item.userName}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="review-section">
        {user ? (
          <>
            <button onClick={toggleReviewForm} className="leave-review-btn">
              {isReviewFormVisible ? 'Скрыть форму' : 'Оставить отзыв'}
            </button>

            {isReviewFormVisible && (
              <form onSubmit={handleReviewSubmit}>
                {!user.displayName && (
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                )}
                <textarea
                  placeholder="Ваш отзыв..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                />
                <button type="submit" className="submit-review">Отправить</button>
              </form>
            )}
          </>
        ) : (
          <p className="login-warning">Чтобы оставить отзыв, авторизуйтесь.</p>
        )}
      </div>
    </div>
  );
}

export default Izbrannyi;