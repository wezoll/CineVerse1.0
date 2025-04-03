import React, { useState, useEffect, useRef } from "react";
import "./Search.css";
import searchIcon from "../../../assets/Header/search-icon.svg";
import moviesData from "../../../../db.json";

const Search = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState({});
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();

      const uniqueMovies = getUniqueMovies(moviesData.movies || []);
      setSearchResults(uniqueMovies);
    }
  }, [isOpen]);

  const getUniqueMovies = (movies) => {
    const uniqueMoviesMap = new Map();
    
    movies.forEach(movie => {
      if (!uniqueMoviesMap.has(movie.id)) {
        uniqueMoviesMap.set(movie.id, movie);
      }
    });
    
    return Array.from(uniqueMoviesMap.values());
  };

  useEffect(() => {
    const uniqueMovies = getUniqueMovies(moviesData.movies || []);
    
    if (searchQuery.trim() === "") {
      setSearchResults(uniqueMovies);
      return;
    }

    const filteredMovies = uniqueMovies.filter((movie) => {
      const title = movie.title.toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      return title.includes(query);
    });

    setSearchResults(filteredMovies);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const openMovieInfo = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  const toggleFavorite = (movieId) => {
    setFavorites((prev) => ({
      ...prev,
      [movieId]: !prev[movieId],
    }));
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        if (showModal) {
          closeModal();
        } else if (isOpen) {
          handleClose();
        }
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [showModal, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-container" ref={searchContainerRef}>
        <div className="search-box">
          <form onSubmit={handleSearch}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Фильмы, сериалы"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <img src={searchIcon} alt="Search" />
            </button>
          </form>
          <button className="close-search-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="search-results">
          <h3 className="search-results-title">
            {searchQuery.trim() !== ""
              ? `Поиск по запросу: "${searchQuery}"`
              : "Все фильмы и сериалы"}
          </h3>
          {searchResults.length > 0 ? (
            <div className="search-results-grid">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => openMovieInfo(movie)}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-poster"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">Ничего не найдено</p>
          )}
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
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent closing the modal when clicking the favorite button
                    selectedMovie && toggleFavorite(selectedMovie.id);
                  }}
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
    </div>
  );
};

export default Search;