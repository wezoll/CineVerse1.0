import React, { useState, useEffect, useRef } from "react";
import "./TrendingMovies.css";
import moviesData from "../../../db.json";

const TrendingMovies = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [favorites, setFavorites] = useState({});
  const sliderRef = useRef(null);

  const movies = moviesData.movies || moviesData;

  const trendingMovies = Array.isArray(movies)
    ? movies.filter((movie) => movie.category === "trending")
    : [];

  const featuredMovie = trendingMovies[currentSlide] || trendingMovies[0];

  const moviesPerPage = 5;

  const totalPages = Math.ceil((trendingMovies.length - 1) / moviesPerPage);

  const getPageMovies = () => {
    const otherMovies = trendingMovies.filter(
      (_, index) => index !== currentSlide
    );
    const startIndex = currentPage * moviesPerPage;
    return otherMovies.slice(startIndex, startIndex + moviesPerPage);
  };

  const otherMovies = getPageMovies();

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % trendingMovies.length;
    setCurrentSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      currentSlide > 0 ? currentSlide - 1 : trendingMovies.length - 1;
    setCurrentSlide(prevIndex);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const changePage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(0);
    }
  };

  const toggleFavorite = (movieId) => {
    setFavorites(prev => ({
      ...prev,
      [movieId]: !prev[movieId]
    }));
  };

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

  if (trendingMovies.length === 0) {
    return (
      <section className="trending-section">
        <div className="trending-container">
          <h2 className="trending-title">
            <span className="trending-title-text">Актуальные</span>
          </h2>
          <div className="trending-loading">Loading trending movies...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="trending-section">
      <div className="trending-container">
        <h2 className="trending-title">
          <span className="trending-title-text">Актуальные</span>
          <span className="trending-title-icon"></span>
        </h2>

        <div className="trending-layout">
          <div className="featured-movie-card">
            <div
              className="featured-movie-poster"
              style={{ backgroundImage: `url(${featuredMovie.poster})` }}
            >
              <div className="movie-overlay"></div>
              <div className="movie-info">
                <h3 className="movie-title">{featuredMovie.title}</h3>
                <p className="movie-year">{featuredMovie.year}</p>
                <div className="featured-movie-buttons">
                  <button
                    className="more-info-btn"
                    onClick={() => openMovieInfo(featuredMovie)}
                  >
                    Подробнее
                  </button>
                  <button 
                    className="favorite-btn"
                    onClick={() => toggleFavorite(featuredMovie.id)}
                  >
                    <img
                      src={favorites[featuredMovie.id] ? "/CineVerse/heart-fill.png" : "/CineVerse/heart.png"}
                      alt="Heart Icon"
                      width="20"
                      height="20"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="small-movies-container">
            <div className="small-movies-flex">
              {otherMovies.map((movie) => (
                <div className="small-movie-card" key={movie.id}>
                  <div
                    className="small-movie-poster"
                    style={{ backgroundImage: `url(${movie.poster})` }}
                    onClick={() =>
                      goToSlide(
                        trendingMovies.findIndex((m) => m.id === movie.id)
                      )
                    }
                  >
                    <div className="movie-overlay"></div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <button
                className="movies-page-nav-btn"
                onClick={changePage}
                disabled={totalPages <= 1}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform:
                      currentPage === totalPages - 1
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
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

        <div className="trending-navigation">
          <button className="slider-prev-btn" onClick={prevSlide}>
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

          <div className="slider-dots">
            {trendingMovies
              .slice(0, Math.min(trendingMovies.length, 6))
              .map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${
                    currentSlide === index ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
          </div>

          <button className="slider-next-btn" onClick={nextSlide}>
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
        </div>
      </div>

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
                  onClick={() => selectedMovie && toggleFavorite(selectedMovie.id)}
                >
                  <img
                    src={selectedMovie && favorites[selectedMovie.id] ? "/CineVerse/heart-fill.png" : "/CineVerse/heart.png"}
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

export default TrendingMovies;