import React, { useState, useEffect, useRef } from "react";
import "./Search.css";
import searchIcon from "../../../assets/Header/search-icon.svg";
import moviesData from "../../../../db.json";
import MovieModal from "../../MovieModal/MovieModal";
import TrailerModal from "../../TrailerModal/TrailerModal";

const Search = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [showExternalModal, setShowExternalModal] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");
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
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
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

  const openTrailerModal = () => {
    setShowTrailerModal(true);
    setShowModal(false);
  };

  const closeTrailerModal = () => {
    setShowTrailerModal(false);
    setShowModal(true);
  };

  const openExternalModal = (url) => {
    setExternalUrl(url);
    setShowExternalModal(true);
  };

  const closeExternalModal = () => {
    setShowExternalModal(false);
  };

  const handleExternalLink = (url) => {
    openExternalModal(url);
  };

  const confirmExternalRedirect = () => {
    window.open(externalUrl, "_blank");
    closeExternalModal();
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        if (showExternalModal) {
          closeExternalModal();
        } else if (showTrailerModal) {
          closeTrailerModal();
        } else if (showModal) {
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
  }, [showModal, showTrailerModal, showExternalModal, isOpen]);

  const isFavorite = selectedMovie ? favorites[selectedMovie.id] || false : false;

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

      <MovieModal 
        selectedMovie={selectedMovie}
        showModal={showModal}
        closeModal={closeModal}
        handleExternalLink={handleExternalLink}
        openTrailerModal={openTrailerModal}
        showExternalModal={showExternalModal}
        closeExternalModal={closeExternalModal}
        confirmExternalRedirect={confirmExternalRedirect}
        externalUrl={externalUrl}
        isFavorite={isFavorite}
        toggleFavorite={() => selectedMovie && toggleFavorite(selectedMovie.id)}
      />

      {showTrailerModal && selectedMovie && (
        <TrailerModal 
          isOpen={showTrailerModal}
          onClose={closeTrailerModal}
          trailerUrl={selectedMovie.trailerLink}
          movieTitle={selectedMovie.title}
        />
      )}
    </div>
  );
};

export default Search;