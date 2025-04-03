import React, { useState, useEffect, useRef } from "react";
import "./PopularSeries.css";
import moviesData from "../../../db.json";

const PopularSeries = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [favorites, setFavorites] = useState({});
  const sliderRef = useRef(null);

  const movies = moviesData.movies || moviesData;

  const PopularSeries = Array.isArray(movies)
    ? movies.filter((movie) => movie.category === "popularS")
    : [];

  // Загрузка избранного из localStorage при монтировании компонента
  useEffect(() => {
    const savedFavorites = localStorage.getItem("movieFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Сохранение избранного в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Функция для переключения статуса избранного
  const toggleFavorite = (movieId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      if (newFavorites[movieId]) {
        delete newFavorites[movieId];
      } else {
        newFavorites[movieId] = true;
      }
      return newFavorites;
    });
  };

  // Проверка, находится ли фильм в избранном
  const isFavorite = (movieId) => {
    return !!favorites[movieId];
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const scrollAmount = slider.clientWidth;

      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const scrollAmount = slider.clientWidth;

      slider.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

      setCanScrollLeft(slider.scrollLeft > 0);
      setCanScrollRight(slider.scrollLeft < maxScrollLeft);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScrollButtons);

      checkScrollButtons();

      return () => {
        slider.removeEventListener("scroll", checkScrollButtons);
      };
    }
  }, []);

  const openMovieInfo = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && showModal) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [showModal]);

  if (PopularSeries.length === 0) {
    return (
      <section className="popular-section">
        <div className="popular-container">
          <h2 className="popular-title">
            <span className="popular-title-text">Популярные сериалы</span>
          </h2>
          <div className="popular-loading">Loading popular movies...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="popular-section">
      <div className="popular-container">
        <h2 className="popular-title">
          <span className="popular-title-text">Популярные сериалы</span>
          <span className="popular-title-icon"></span>
        </h2>

        <div className="popular-slider-container">
          {canScrollLeft && (
            <button className="prev-btn" onClick={scrollLeft}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div className="popular-slider" ref={sliderRef}>
            {PopularSeries.map((movie) => (
              <div className="popular-movie-card" key={movie.id}>
                <div
                  className="popular-movie-poster"
                  style={{ backgroundImage: `url(${movie.poster})` }}
                  onClick={() => openMovieInfo(movie)}
                >
                  <div className="popular-movie-overlay"></div>
                  <div className="popular-movie-info">
                    <h3 className="popular-movie-title">{movie.title}</h3>
                    <p className="popular-movie-year">{movie.year}</p>
                    <div className="popular-movie-buttons"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button className="next-btn" onClick={scrollRight}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {/* Movie info modal */}
      {showModal && selectedMovie && (
        <div className="movie-modal" onClick={closeModal}>
          <div
            className="movie-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeModal}>
              ×
            </button>
            <div
              className="modal-poster"
              style={{ backgroundImage: `url(${selectedMovie.poster})` }}
            ></div>
            <div className="modal-info">
              <h2 className="modal-title">{selectedMovie.title}</h2>
              <div className="modal-rating">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="#FFD700"
                    stroke="#FFD700"
                    strokeWidth="1"
                  />
                </svg>
                <span className="modal-rating-value">
                  {selectedMovie.rating}
                </span>
                <span className="modal-year">{selectedMovie.year}</span>
              </div>
              <div className="modal-genres">
                {selectedMovie.genre &&
                  selectedMovie.genre.map((g, index) => (
                    <span key={index} className="modal-genre-tag">
                      {g}
                    </span>
                  ))}
              </div>
              <div className="modal-details">
                <p>
                  <strong>Режиссер:</strong>{" "}
                  {selectedMovie.director
                    ? Array.isArray(selectedMovie.director)
                      ? selectedMovie.director.join(", ")
                      : selectedMovie.director
                    : "Не указан"}
                </p>
                <p>
                  <strong>В ролях:</strong>{" "}
                  {selectedMovie.actors
                    ? selectedMovie.actors.join(", ")
                    : "Не указаны"}
                </p>
                <p className="modal-description">
                  {selectedMovie.description || "Описание отсутствует"}
                </p>
              </div>
              <div className="modal-actions">
                <button className="modal-watch-btn">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3L19 12L5 21V3Z" fill="white" />
                  </svg>
                  Смотреть
                </button>
                <button className="modal-trailer-btn">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 12L8 5V19L18 12Z" fill="white" />
                  </svg>
                  Трейлер
                </button>
                <button
                  className="modal-favorite-btn"
                  onClick={() =>
                    selectedMovie && toggleFavorite(selectedMovie.id)
                  }
                >
                  <img
                    src={
                      selectedMovie && favorites[selectedMovie.id]
                        ? "/heart-fill.png"
                        : "/heart.png"
                    }
                    alt="Heart Icon"
                    width="16"
                    height="16"
                  />
                  В избранное
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PopularSeries;
