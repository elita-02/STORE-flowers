import React, { useState } from 'react';
import "./Login.scss";
import { Link, useNavigate } from 'react-router-dom';
import google from "../../assets/svg/google.svg";
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleClose = () => {
    navigate(-1);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Успешный вход!");
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Успешный вход через Google!");
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Введите ваш email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Письмо для сброса пароля отправлено!");
      setShowForgotPassword(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const renderFormContent = () => (
    <>
      <div className='flower-pattern'></div>
      <h2 className="form-title">🌸 Добро пожаловать в BISHKEK-FLOWERS</h2>
      <p className="auth-switch">
        Нет аккаунта? <Link to="/registration">Зарегистрируйтесь</Link>
      </p>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="example@mail.com"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="form-group">
          <label>Пароль</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <p 
            type="button" 
            className="forgot-password"
            onClick={() => setShowForgotPassword(true)}
          >
            Забыли пароль?
          </p>
        </div>

        <button type="submit" className="submit-btn">
          Войти
        </button>
      </form>

      <div className="social-login">
        <p>Или войти через:</p>
        <div className="social-buttons">
          <img 
            src={google} 
            alt="google"
            className="social-icon" 
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>

      <p className="terms-text">
        Входя в аккаунт, вы соглашаетесь с 
        <a href="#"> условиями использования сервиса</a>
      </p>
    </>
  );

  const renderForgotPasswordContent = () => (
    <div className="forgot-password-content">
      <h3>Восстановление пароля</h3>
      <p>Введите ваш email для получения инструкций</p>
      
      <div className="form-group">
        <input
          type="email"
          placeholder="Ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="button-group">
        <button 
          className="submit-btn"
          onClick={handleForgotPassword}
        >
          Отправить
        </button>
        <button
          className="cancel-btn"
          onClick={() => setShowForgotPassword(false)}
        >
          Назад
        </button>
      </div>
    </div>
  );

  return (
    <div className="auth-container">
      <div className="auth-overlay">
        <div className="auth-box">
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
          {showForgotPassword ? renderForgotPasswordContent() : renderFormContent()}
        </div>
      </div>
    </div>
  );
}

export default Login;