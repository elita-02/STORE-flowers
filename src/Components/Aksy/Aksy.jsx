import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesserts } from '../../redux/Aksy/AksySlice'; // Асинхрондук аракет
import './Aksy.scss'
import karzina from '../../assets/svg/karzina.svg';
import hart from '../../assets/svg/hart.svg';
import gul2 from '../../assets/svg/gul2.svg'

function Aksy() {
    const dispatch = useDispatch();
    const { desserts, loading, error } = useSelector((state) => state.aksys);

    useEffect(() => {
        dispatch(fetchDesserts()); 
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div className="desserts">
            <h1>Акции</h1>
            <div className="desserts-list">
                {desserts.map((dessert, index) => (
                    
                    <div key={dessert.id} className="dessert-item">
                        <div className="image-container">
                            <img src={dessert.image} alt={dessert.title} />
                            <div className="discount">{dessert.discount}</div>
                        </div>

                        <div className="icon-container">
                            <img src={hart} alt="Heart" className="heart-icon" />
                            <img src={karzina} alt="Cart" className="cart-icon" />
                        </div>

                        <div className="dessert-info">
                            <div className="price-container">
                                <div className="old-price">{dessert.old_price}</div>
                                <div className="new-price">{dessert.price} сом</div>
                            </div>
                            <h3>{dessert.title}</h3>
                        </div>

                        <button>
                            <span>Заказать</span>
                        </button>
                        <img src={gul2} alt="Flower" className="flower-img" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Aksy;


