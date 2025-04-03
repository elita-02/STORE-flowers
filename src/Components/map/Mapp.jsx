import React, { useEffect, useRef, useState } from 'react';
import "./Map.scss";

function Mapp() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // 1. Добавьте API-ключ (обязательно)
    const script = document.createElement('script');
    script.src = 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full&key=ВАШ_API_КЛЮЧ';
    script.async = true;

    // 2. Обработка ошибок загрузки скрипта
    script.onerror = () => setError('Ошибка загрузки 2GIS API');

    script.onload = () => {
      DG.then(() => {
        // 3. Используйте useRef вместо id
        const newMap = new DG.Map(mapContainer.current, {
          center: [42.8746, 74.5698],
          zoom: 13
        });

        DG.marker([42.8746, 74.5698])
          .addTo(newMap)
          .bindPopup('109-1 Turusbekov St, Bishkek');

        setMap(newMap);
      }).catch(() => {
        setError('Ошибка инициализации карты');
      });
    };

    document.body.appendChild(script);

    // 4. Полная очистка
    return () => {
      if (map) map.remove();
      if (script.parentNode) document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='container'>
      {error && <div className="error container">{error}</div>}
      <div 
        ref={mapContainer} 
        style={{ 
          width: '100%', 
          height: '500px', 
          position: 'relative' 
        }}
      />
    </div>
  );
}

export default Mapp;