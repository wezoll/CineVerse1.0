import React, { useState, useEffect, useRef } from "react";
import "./PopularSeries.css";
import moviesData from "../../../db.json";
import MovieModal from "../MovieModal/MovieModal";
import TrailerModal from "../TrailerModal/TrailerModal";

const PopularSeries = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [showExternalModal, setShowExternalModal] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");
  const sliderRef = useRef(null);

  const movies = moviesData.movies || moviesData;

  const PopularSeries = Array.isArray(movies)
    ? movies.filter((movie) => movie.category === "popularS")
    : [];

  useEffect(() => {
    const savedFavorites = localStorage.getItem("movieFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

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

  const openTrailerModal = (url) => {
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
        }
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [showModal, showTrailerModal, showExternalModal]);

  const currentFavorite = selectedMovie ? isFavorite(selectedMovie.id) : false;

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
        isFavorite={currentFavorite}
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
    </section>
  );
};

export default PopularSeries;