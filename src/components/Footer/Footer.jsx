import React from "react";
import "./Footer.css";
import logo from "/images/logoF.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo-section">
            <div className="footer-logo">
              <img src={logo} alt="CineVerse logo" />
            </div>
            <div className="social-links">
              <p>Следите за нами</p>
              <div className="social-icons">
                <a
                  href="https://github.com/wezoll/CineVerse"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://t.me/wezoll"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <i className="fab fa-telegram-plane"></i>
                </a>
                <a
                  href="https://www.instagram.com/wezoll"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h3>Сервис</h3>
              <ul>
                <li>
                  <a href="#">Главная страница</a>
                </li>
                <li>
                  <a href="#TrendingMovies">Фильмы</a>
                </li>
                <li>
                  <a href="#PopularSeries">Сериалы</a>
                </li>
                {/* <li>
                  <a href="#">Контент</a>
                </li>
                <li>
                  <a href="#">Интеграции</a>
                </li> */}
              </ul>
            </div>

            <div className="footer-section">
              <h3>Категории</h3>
              <ul>
                <li>
                  <a href="#top10">Новинки</a>
                </li>
                <li>
                  <a href="#PopularFilms">Популярные</a>
                </li>
                <li>
                  <a href="#MovieCategory">Боевики</a>
                </li>
                <li>
                  <a href="#PopularFilms">Фантастика</a>
                </li>
                <li>
                  <a href="#PopularFilms">Драмы</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Компания</h3>
              <ul>
                <li>
                  <a href="#FAQ">О нас</a>
                </li>
                <li>
                  <a href="#FAQ">Карьера</a>
                </li>
                <li>
                  <a href="#FAQ">FAQ</a>
                </li>
                <li>
                  <a href="#FAQ">Команда</a>
                </li>
                <li>
                  <a href="#Feedback">Контакты</a>
                </li>
              </ul>
            </div>

            <div className="footer-section contact-section">
              <h3>Контакты</h3>
              <ul>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Астана, проспект Мангилик Ел, С1</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:cineverse@gmail.com" className="footer-email">
                    support@cineverse.com
                  </a>
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  <span>+7 (707) 707-70-07</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 CineVerse. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
