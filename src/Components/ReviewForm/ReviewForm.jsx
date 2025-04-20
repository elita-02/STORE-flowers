import React, { useState } from 'react';
import { storage } from '../../firebase'; // Firebase конфигурациясы
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (photo) {
      // Firebase Storage'ке сурот жүктөө
      const storageRef = ref(storage, `reviews/${Date.now()}_${photo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Прогресс көрсөткүч
        },
        (error) => {
          setMessage('Сурот жүктөөдө ката кетти: ' + error.message);
        },
        async () => {
          // Сурот ийгиликтүү жүктөлгөндөн кийин, URL'ди алуу
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Форманы серверге жөнөтүү
          const formData = new FormData();
          formData.append('name', name);
          formData.append('text', text);
          formData.append('photo', downloadURL); // Firebase Storage URL

          try {
            const response = await axios.post('http://localhost:5000/api/reviews', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage(response.data.message);
            setName('');
            setText('');
            setPhoto(null);
          } catch (error) {
            setMessage('Ката кетти: ' + error.response?.data?.message || error.message);
          }
        }
      );
    }
  };

  return (
    <div className="review-form">
      <h2>Отзыв калтыруу</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Атыңыз"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Сиздин отзыв"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Жөнөтүү</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReviewForm;
