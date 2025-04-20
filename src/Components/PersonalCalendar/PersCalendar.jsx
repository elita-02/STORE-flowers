import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PersCalendar.scss';

const PersonalCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    phone: '',
    flower: '',
    category: '',
    address: ''
  });
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        toast.success('Вы успешно вошли', {
          autoClose: 3000,  // 3 секунддан кийин жабылат
          closeOnClick: false,  // Колдонуучу басса жабылбайт
          pauseOnHover: false,  // Hover'де билдирүү жабылбайт
          hideProgressBar: false, // Прогресс тилкесин көрсөтөт
          newestOnTop: true,  // Жаңы билдирүүлөр жогоруда болот
          rtl: false,  // Оңго бурулган (жок)
          pauseOnFocusLoss: true, // Фокус жоголгон учурда билдирүү токтойт
          draggable: true, // Билдирүүнү сүйрөп жүрүүгө болот
        });
      } else {
        setUserEmail(null);
        toast.error('Пожалуйста, авторизуйтесь', {
          autoClose: 3000,  // 3 секунддан кийин жабылат
          closeOnClick: true, // Колдонуучу басканда жабылат
          pauseOnHover: false,  // Hover'де билдирүү жабылбайт
          hideProgressBar: false,
          newestOnTop: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userEmail) {
      const fetchEvents = async () => {
        const db = getFirestore();
        const q = query(collection(db, 'calendarEvents'), where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);
        const fetchedEvents = querySnapshot.docs.map(doc => doc.data());
        setEvents(fetchedEvents);
      };
      fetchEvents();
    }
  }, [userEmail]);

  const handleAddEvent = async () => {
    if (newEvent.name && newEvent.date) {
      const db = getFirestore();
      await addDoc(collection(db, 'calendarEvents'), {
        ...newEvent,
        email: userEmail
      });
      toast.success(`"${newEvent.name}" добавлен на ${newEvent.date}`, { autoClose: 3000 });

      setNewEvent({
        name: '',
        date: '',
        phone: '',
        flower: '',
        category: '',
        address: ''
      });

      const q = query(collection(db, 'calendarEvents'), where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);
      const updatedEvents = querySnapshot.docs.map(doc => doc.data());
      setEvents(updatedEvents);

    } else {
      toast.error('Заполните обязательные поля (Имя и Дата)', { autoClose: 3000 });
    }
  };

  return (
    <div className="calendar-container container">
      <h2>Личный календарь</h2>
      {userEmail ? (
        <>
          <div className="form-group">
            <input type="text" placeholder="Имя получателя" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
            <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
            <input type="text" placeholder="Телефон" value={newEvent.phone} onChange={(e) => setNewEvent({ ...newEvent, phone: e.target.value })} />
            <input type="text" placeholder="Название цветов" value={newEvent.flower} onChange={(e) => setNewEvent({ ...newEvent, flower: e.target.value })} />
            <input type="text" placeholder="Категория" value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })} />
            <input type="text" placeholder="Адрес доставки" value={newEvent.address} onChange={(e) => setNewEvent({ ...newEvent, address: e.target.value })} />
            <button onClick={handleAddEvent}>Добавить</button>
          </div>

          <div className="event-list">
            <h3>Ваши записи:</h3>
            {events.length > 0 ? (
              <ul>
                {events.map((event, index) => (
                  <li key={index}>
                    <strong>{event.name}</strong> — {event.date}<br />
                    📞 {event.phone}<br />
                    🌸 {event.flower}<br />
                    📦 {event.category}<br />
                    📍 {event.address}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет добавленных событий.</p>
            )}
          </div>
        </>
      ) : (
        <p>Пожалуйста, авторизуйтесь</p>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000} // 3 секунддан кийин жабылат
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false} // Колдонуучу басканда жабылбайт
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={false} // Hover'де жабылбайт
      />
    </div>
  );
};

export default PersonalCalendar;
