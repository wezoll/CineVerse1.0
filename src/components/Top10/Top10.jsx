import React, { useState, useEffect, useRef } from "react";
import "./Top10.css";
import moviesData from "../../../db.json";

const Top10 = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sliderRef = useRef(null);

  const movies = moviesData.movies || moviesData;

  const Top10 = Array.isArray(movies)
    ? movies.filter((movie) => movie.category === "Top10").slice(0, 10)
    : [];

  const scrollRight = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const scrollAmount = slider.clientWidth;
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const scrollAmount = slider.clientWidth;
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
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

  const renderNumber = (number) => {
    const numberStr = number.toString();
    
    return (
      <div className="number-container">
        <svg className="number" viewBox="0 0 100 120" width="100%" height="100%">
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="number-text"
          >
            {numberStr}
          </text>
        </svg>
      </div>
    );
  };

  if (Top10.length === 0) {
    return (
      <section className="Top10-section">
        <div className="Top10-container">
          <h2 className="Top10-title">
            <span className="Top10-title-text">В тренде</span>
          </h2>
          <div className="Top10-loading">Loading Top-10 movies...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="Top10-section">
      <div className="Top10-container">
        <h2 className="Top10-title">
          <span className="Top10-title-text">В тренде</span>
          <span className="Top10-title-icon"></span>
        </h2>

        <div className="Top10-slider-container">
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

          <div className="Top10-slider" ref={sliderRef}>
            {Top10.map((movie, index) => (
              <div className="top10-item" key={movie.id}>
                <div className="number-wrapper">
                  {renderNumber(index + 1)}
                </div>
                <div
                  className="poster-wrapper"
                  onClick={() => openMovieInfo(movie)}
                >
                  <div 
                    className="poster" 
                    style={{ backgroundImage: `url(${movie.poster})` }}
                  >
                    <div className="poster-overlay"></div>
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
                  {selectedMovie.director || "Не указан"}
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
                <button className="modal-favorite-btn">
                  <img
                    src="/heart.png"
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

export default Top10;