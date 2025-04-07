import React from "react";
import "./MovieModal.css";

const MovieModal = ({ 
  selectedMovie, 
  showModal, 
  closeModal, 
  handleExternalLink, 
  openTrailerModal,
  showExternalModal,
  closeExternalModal,
  confirmExternalRedirect,
  externalUrl,
  isFavorite,
  toggleFavorite
}) => {
  if (!showModal || !selectedMovie) return null;

  const handleWatchClick = () => {
    if (selectedMovie.watchLink) {
      handleExternalLink(selectedMovie.watchLink);
    }
  };

  return (
    <>
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
              <button 
                className="modal-watch-btn"
                onClick={handleWatchClick}
              >
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
              <button 
                className="modal-trailer-btn"
                onClick={() => selectedMovie.trailerLink && openTrailerModal(selectedMovie.trailerLink)}
              >
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
                onClick={toggleFavorite}
              >
                <img
                  src={isFavorite 
                    ? "/CineVerse1.0/images/heart-fill.png" 
                    : "/CineVerse1.0/images/heart.png"
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

      {showExternalModal && (
        <div className="external-modal-overlay" onClick={closeExternalModal}>
          <div className="external-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Вы уверены, что хотите перейти на внешний сайт?</h3>
            <p>Вы покидаете CineVerse и переходите на Kinopoisk.</p>
            <div className="external-modal-buttons">
              <button className="external-modal-btn confirm-btn" onClick={confirmExternalRedirect}>
                Перейти
              </button>
              <button className="external-modal-btn cancel-btn" onClick={closeExternalModal}>
                Остаться
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieModal;