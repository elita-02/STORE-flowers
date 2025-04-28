import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/newpost/postsSlice';
import { useNavigate } from 'react-router-dom';
import './Posts.css';

const PostsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading, error } = useSelector((state) => state.posts);
    const cardsRef = useRef([]);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        cardsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            cardsRef.current.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, [items]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div className="posts-page">
            <section className="founders-hero">
                <div className="founders-text">
                    <h1>Мы – Элита и Нурзада 💖</h1>
                    <p>
                        Каждое цветок мы создаём с любовью.  
                        Здесь живут тёплые чувства, крепкая дружба и настоящая красота.
                    </p>
                </div>
            </section>

            <div className="posts-list">
                <h2>📰 НОВОСТИ О НАШЕМ МАГАЗИНЕ</h2>

                {[...items].reverse().map((post, index) => {
                    const isFirstCard = index === 0; 

                    return (
                        <div
                            key={post.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className={`post-card ${index % 2 === 0 ? 'left' : 'right'}`}
                            onClick={() => {
                                if (isFirstCard) {
                                    navigate('/decorative'); 
                                }
                            }}
                            style={{ cursor: isFirstCard ? 'pointer' : 'default' }}
                        >
                            <div className="post-image-wrapper">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    onError={(e) => {
                                        e.target.src = '/default-image.jpg';
                                        e.target.classList.add('error-image');
                                    }}
                                />
                            </div>
                            <div className="post-content">
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                                <p style={{ fontSize: '18px', color: 'black', marginTop: '10px' }}>
                                    {post.createdAt}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PostsPage;





