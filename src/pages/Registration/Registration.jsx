import React, { useState } from 'react';
import "./Registration.scss";
import { Link, useNavigate } from 'react-router-dom';
import google from "../../assets/svg/google.svg";
import fecbook from "../../assets/svg/fecbook.svg";
import { auth, googleProvider } from "../../firebase";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";

function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModal, setIsModal] = useState(true);
    const navigate = useNavigate();

    async function createUser() {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res);
            if (res) {
                toast.success("Аккаунт успешно создан!");
                setIsModal(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const handleClose = () => {
        setIsModal(false);
    };

    const handleLoginClick = () => {
        setIsModal(false);
        navigate('/login');
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google auth result:", result);
            toast.success("Вы успешно зарегистрированы через Google!");
            setIsModal(false);
            navigate("/");
        } catch (error) {
            console.error("Google auth error:", error);
            toast.error("Ошибка при входе через Google");
        }
    };

    const renderFormContent = () => (
        <div className="registration-container">
            <h2 className="title">🌸 BISHKEK-FLOWERS</h2>
            <p className="description">Зарегистрируйтесь и получите 10% скидку на первый заказ!</p>

            <form className='reg-grid' autoComplete="on" onSubmit={(e) => { e.preventDefault(); createUser(); }}>
                <div className="input-group">
                    <label>Ваше имя</label>
                    <input
                        type="text"
                        placeholder="Например: Айгерим"
                        className="input-field"
                        name="name"
                        autoComplete="name"
                    />
                </div>

                <div className="input-group">
                    <label>Электронная почта</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="example@mail.com"
                        className="input-field"
                        value={email}
                        name="email"
                        autoComplete="email"
                    />
                </div>

                <div className="input-group">
                    <label>Пароль</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="••••••••"
                        className="input-field"
                        value={password}
                        name="new-password"
                        autoComplete="new-password"
                    />
                </div>

                <div className="input-group">
                    <label>Телефон</label>
                    <input
                        type="tel"
                        placeholder="+996 555 123 456"
                        className="input-field"
                        name="tel"
                        autoComplete="tel"
                    />
                </div>
            </form>
            <button onClick={createUser} className="submit-button">
                Создать аккаунт
            </button>

            <div className="social-login-container">
                <p>Или зарегистрируйтесь через:</p>
                <div className="social-button-container">
                    <img
                        src={google}
                        alt="google"
                        className="social-button"
                        onClick={handleGoogleSignUp}
                    />
                </div>
            </div>

            <p className="terms-condition">
                Нажимая кнопку, вы соглашаетесь с <a href="#">условиями обработки данных</a>
            </p>

            <p className="switch-auth">
                Уже есть аккаунт? <Link to="/login" onClick={handleLoginClick}>Войти</Link>
            </p>
        </div>
    );

    return (
        <div className="modal-container">
            {isModal && (
                <div className="overlay" onClick={(e) => {
                    if (e.target.className === 'overlay') {
                        handleClose();
                    }
                }}>
                    <div className="modal-box">
                        <button className="close-button" onClick={handleClose} aria-label="Закрыть окно">
                            &times;
                        </button>
                        {renderFormContent()}
                    </div>
                </div>
            )}
            {!isModal && (
                <div className="static-registration">
                    <div className="form-wrapper">
                        {renderFormContent()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Registration;