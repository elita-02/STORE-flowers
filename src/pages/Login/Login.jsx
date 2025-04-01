import React, { useState } from 'react';
import "./Login.scss";
import { Link, useNavigate } from 'react-router-dom';
import google from "../../assets/svg/google.svg";
import fecbook from "../../assets/svg/fecbook.svg";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function createLog() {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      if (res) {
        toast.success("User successfully created!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const [isModal, setIsModal] = useState(true);
  const navigate = useNavigate();
 
  const handleClose = () => {
    setIsModal(false);
    navigate('/login', { replace: true });
  };

  const renderFormContent = () => (
    <>
      <h2 className="form-title">🌸 Добро пожаловать в BISHKEK-FLOWERS</h2>
      <p className="auth-switch">
        Нет аккаунта? <Link to="/registration">Зарегистрируйтесь</Link>
      </p>

      <div className="form-group">
        <label>Email или телефон</label>
        <input 
          type="text" 
          placeholder="example@mail.com или +996 555 123 456"
          className="form-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
        />
        <a href="/forgot-password" className="forgot-password">
          Забыли пароль?
        </a>
      </div>

      <button onClick={createLog} className="submit-btn" type="submit">
        Войти
      </button>

      <div className="social-login">
        <p>Или войти через:</p>
        <div className="social-buttons">
          <img 
            src={google} 
            alt="google"
            className="social-icon" 
            onClick={() => window.location.href='/google-auth'}
          />
          <img 
            src={fecbook} 
            alt="facebook"
            className="social-icon"
            onClick={() => window.location.href='/facebook-auth'}
          />
        </div>
      </div>

      <p className="terms-text">
        Входя в аккаунт, вы соглашаетесь с 
        <a href="#"> условиями использования сервиса</a>
      </p>
    </>
  );

  return (
    <div className="login-container">
      {isModal ? (
        <div className="login-overlay">
          <div className="floating-login-container">
            <button 
              className="close-btn" 
              onClick={handleClose}
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
        <div className="static-login-container">
          {renderFormContent()}
        </div>
      )}
    </div>
  );
}

export default Login;