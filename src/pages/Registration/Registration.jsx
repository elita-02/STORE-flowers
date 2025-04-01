import React, { useState } from 'react';
import "./Registration.scss";
import { Link, useNavigate } from 'react-router-dom';
import google from "../../assets/svg/google.svg"
import fecbook from "../../assets/svg/fecbook.svg"
import { auth } from "../../firebase";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function createUser() {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      if (res) {
        toast.success("Аккаунт успешно создан!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

    const navigate = useNavigate();
    const [isModal, setIsModal] = useState(true);

    const handleClose = () => {
        setIsModal(false);
        navigate('/registration', { replace: true });
    };

    const handleLoginClick = () => {
        setIsModal(false);
        navigate('/login');
    };

    const renderFormContent = () => (
        <><div>

        </div>
            <h2 className="form-title">🌸 BISHKEK-FLOWERS</h2>
            <p className="welcome-text">Зарегистрируйтесь и получите 10% скидку на первый заказ!</p>
            
            <div className="form-grid">
                <div className="form-group">
                    <label>Ваше имя</label>
                    <input type="text" placeholder="Например: Айгерим" className="form-input" />
                </div>
                <div className="form-group">
                    <label>Электронная почта</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@mail.com" className="form-input" value={email}/>
                </div>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label>Пароль</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="form-input"   value={password}/>

                </div>
                <div className="form-group">
                    <label>Телефон</label>
                    <input type="tel" placeholder="+996 555 123 456" className="form-input" />
                </div>
            </div>

            <div className="form-group">
                <label>Адрес доставки</label>
                <input type="text" placeholder="Укажите основной адрес доставки" className="form-input" />
            </div>

            <div className="form-group">
                <label>Любимые цветы</label>
                <select className="form-select">
                    <option>Выберите из списка</option>
                    <option>Розы</option>
                    <option>Тюльпаны</option>
                    <option>Орхидеи</option>
                </select>
            </div>

            <div className="preference-group">
                <h4>Предпочтения по упаковке:</h4>
                <div className="checkbox-grid">
                    <label className="checkbox-label">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Минимализм
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Классика
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Премиум
                    </label>
                </div>
            </div>

            <button onClick={createUser} className="submit-btn">
                Создать аккаунт
            </button>

            <div className="social-login">
  <p>Или зарегистрируйтесь через:</p>
  <div className="social-buttons">
    <img 
      src={google} 
      alt="google"
      className="social-icon" 
      onClick={() => window.location.href='/google-auth'}
    />
    <img 
      src={fecbook} 
      alt="fecbook"
      className="social-icon"
      onClick={() => window.location.href='/facebook-auth'}
    />
  </div>
</div>

            <p className="terms-text">
                Нажимая кнопку, вы соглашаетесь с <a href="#">условиями обработки данных</a>
            </p>

            <p className="auth-switch">
                Уже есть аккаунт? <Link to="/login" onClick={handleLoginClick}>Войти</Link>
            </p>
        </>
    );

    return (
        <div className="registration-container">
            {isModal ? (
                <div className="login-overlay">
                    <div className="floating-login-container">
                        <button 
                            className="close-btn" 
                            onClick={handleClose}
                            aria-label="Закрыть окно"
                        >
                            &times;
                        </button>
                        <div className="flower-pattern"></div>
                        <div className="login-form">
                            {renderFormContent()}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="static-registration-container">
                    <div className="registration-form">
                        {renderFormContent()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Registration;