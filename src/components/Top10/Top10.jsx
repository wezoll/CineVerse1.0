import React, { useState, useEffect, useRef } from "react";
import "./Top10.css";
import moviesData from "../../../db.json";
import TrailerModal from "../TrailerModal/TrailerModal";
import MovieModal from "../MovieModal/MovieModal";

const Top10 = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [showExternalModal, setShowExternalModal] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");
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

  const openExternalModal = (url) => {
    console.log("openExternalModal вызвана с URL:", url);
    setExternalUrl(url);
    setShowExternalModal(true);
  };

  const closeExternalModal = () => {
    console.log("closeExternalModal вызвана");
    setShowExternalModal(false);
  };

  const handleExternalLink = (url) => {
    console.log("handleExternalLink вызвана с URL:", url);
    if (url) {
      openExternalModal(url);
    } else {
      console.warn("URL не определен");
    }
  };

  const confirmExternalRedirect = () => {
    console.log("confirmExternalRedirect вызвана, URL:", externalUrl);
    window.open(externalUrl, "_blank");
    closeExternalModal();
  };

  const openTrailerModal = (url) => {
    setShowTrailerModal(true);
    setShowModal(false);
  };

  const closeTrailerModal = () => {
    setShowTrailerModal(false);
    setShowModal(true);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
  }, [showModal, showExternalModal, showTrailerModal]);

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
        toggleFavorite={toggleFavorite}
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

export default Top10;