import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  
  return (
    <div className="auth-page modal-auth-page">
      <div className="auth-container">
        {!showSignup ? (
          // Форма входа
          <div className="auth-form login-form">
            <h2 className="form-title">Вход в аккаунт</h2>
            
            <div className="input-group">
              <label>Электронная почта</label>
              <input type="email" />
            </div>
            
            <div className="input-group">
              <label>Пароль</label>
              <div className="password-field">
                <input type={showPassword ? "text" : "password"} />
                <button 
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Скрыть" : "Показать"}
                </button>
              </div>
            </div>
            
            <button className="submit-button">Войти</button>
            
            <div className="auth-links">
              <a href="#" className="forgot-password">Забыли пароль?</a>
              <div className="signup-prompt">
                У вас нет аккаунта? <a href="#" onClick={(e) => {
                  e.preventDefault();
                  setShowSignup(true);
                }}>Создать аккаунт</a>
              </div>
            </div>
          </div>
        ) : (
          // Форма регистрации
          <div className="auth-form signup-form">
            <h2 className="form-title">Создать аккаунт</h2>
            
            <div className="input-group">
              <label>Имя</label>
              <input type="text" />
            </div>
            
            <div className="input-group">
              <label>Фамилия</label>
              <input type="text" />
            </div>
            
            <div className="input-group">
              <label>Электронная почта</label>
              <input type="email" />
            </div>
            
            <div className="input-group">
              <label>Пароль</label>
              <input type="password" />
            </div>
            
            <div className="terms-row">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                Создавая аккаунт, я соглашаюсь с <a href="#">Условиями использования</a> и <a href="#">Политикой конфиденциальности</a>
              </label>
            </div>
            
            <button className="submit-button">Создать аккаунт</button>
            
            <div className="login-prompt">
              Уже есть аккаунт? <a href="#" onClick={(e) => {
                e.preventDefault();
                setShowSignup(false);
              }}>Войти</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;