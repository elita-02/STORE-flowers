import React, { useState } from 'react';
import "./Contacty.scss";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTelegram, FaInstagram } from 'react-icons/fa';
import Mapp from '../../Components/map/Mapp';
import { db } from '../../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contacty() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type === "textarea" ? "message" : e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        created: Timestamp.now()
      });
      toast.success("Сообщение успешно отправлено!");
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error("Ошибка отправки:", err);
      toast.error("Произошла ошибка при отправке");
    }
  };

  return (
    <div className="contact-container ">
      <div className="contact-header container ">
        <div className=''>
           
        <h2>Свяжитесь с нами</h2>
        <p>Мы всегда готовы ответить на ваши вопросы</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-card">
            <div className="icon-circle"><FaPhone className="contact-icon"/></div>
            <h3>Телефон</h3>
            <p>996 702368268</p>
            <p>996 706247507</p>
          </div>

          <div className="info-card">
            <div className="icon-circle"><FaEnvelope className="contact-icon"/></div>
            <h3>Email</h3>
            <p>jyldyzbekovna04@outlook.com</p>
            <p>nurzadatobokelova@gmail.com</p>
          </div>

          <div className="info-card">
            <div className="icon-circle"><FaMapMarkerAlt className="contact-icon"/></div>
            <h3>Адрес</h3>
            <p>г. Бишкек, ул. Панфилова 17/1</p>
          </div>

        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className="input-border"></span>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Ваш Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="input-border"></span>
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Ваше сообщение"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <span className="input-border"></span>
            </div>

            <button type="submit" className="submit-btn">
              Отправить сообщение
              <span className="btn-wave"></span>
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
        <Mapp />
    </div>
  );
}

export default Contacty;