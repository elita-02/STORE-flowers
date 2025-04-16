
import React from 'react';
import BannerComponent from '../../Components/Banner/Banner';
import Mapp from '../../Components/map/Mapp';
import watt from "../../assets/img/watt.png"
import "./Ban.scss"

function Banner() {
    // Закодированное сообщение
    const message = encodeURIComponent("Добро пожаловать в наш магазин FLOWERS-STORE!");
    
    return (
        <>
            <BannerComponent />
            <Mapp />
            <div className='wat-container'>
                <a 
                    href={`https://wa.me/996702368268?text=${message}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="wat-link"
                >
                    <img 
                        src={watt} 
                        alt="Связаться через WhatsApp" 
                        className="wat-icon"
                    />
                </a>
            </div>
        </>
    );
}

export default Banner;


