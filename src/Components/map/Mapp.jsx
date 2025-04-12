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

        const markers = [
          {
            coords: [42.8746, 74.5698],
            text: 'Панфилова 188/1'
          },
          {
            coords: [42.8705, 74.6000],
            text: 'Исанова 123'
          },
          {
            coords: [42.8600, 74.5800],
            text: 'Московская 45'
          }
        ];

        // DG.marker([42.8746, 74.5698])
        //   .addTo(newMap)
        //   .bindPopup('Панфилова 188/1');
        markers.forEach(({ coords, text }) => {
          DG.marker(coords)
            .addTo(newMap)
            .bindPopup(text);
        });

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
    <div className='container karta'>
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