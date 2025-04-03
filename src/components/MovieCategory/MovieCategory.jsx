import React, { useState, useEffect, useRef } from "react";
import "./MovieCategory.css";
import moviesData from "../../../db.json";

const MovieCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("action");
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState({});
  const sliderRef = useRef(null);

  const movies = Array.isArray(moviesData.movies)
    ? moviesData.movies
    : Array.isArray(moviesData)
    ? moviesData
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

  const categoryMap = {
    action: "Боевик",
    comedy: "Комедия",
    drama: "Драма",
    fantasy: "Фэнтези",
    horror: "Ужасы",
    mystery: "Детектив",
    romance: "Мелодрама",
  };

  const getCategoryDescription = () => {
    switch (selectedCategory) {
      case "action":
        return "Жанр кино, в котором главный герой сталкивается с серией событий, обычно связанных с насилием и физическими подвигами. Жанр имеет тенденцию изображать находчивого героя, борющегося против невероятных трудностей, включающих опасные для жизни ситуации, злодея или погоню, обычно заканчивающуюся победой героя.";
      case "comedy":
        return "Жанр кино, направленный на то, чтобы вызвать смех с помощью юмора. Эти фильмы преувеличивают ситуации, язык, действия, отношения и персонажей.";
      case "drama":
        return "Жанр повествования, характеризующийся серьезными тонами и содержанием, и с сюжетами, посвященными серьезным жизненным вопросам, часто с эмоционально интенсивными ситуациями.";
      case "fantasy":
        return "Жанр кино, который использует магию и другие сверхъестественные формы как основной элемент сюжета, тематики или обстановки. Такие фильмы обычно происходят в воображаемых мирах, где магия и магические существа являются обычным явлением.";
      case "horror":
        return "Жанр кино, предназначенный для вызывания страха, паники, отвращения и ужаса. Сюжет часто вращается вокруг злого антагониста, такого как монстр, и его взаимодействия с жертвой.";
      case "mystery":
        return "Жанр кино, который вращается вокруг решения загадки, обычно связанной с преступлением. Часто фокусируется на усилиях детектива или любителя, который должен раскрыть скрытые мотивы или истинную личность злоумышленника.";
      case "romance":
        return "Жанр кино, который помещает романтическую любовь в центр сюжета. Эти фильмы делают проблемы привлекательности и любви центральными элементами сюжета.";
      default:
        return "";
    }
  };

  const filteredMovies = movies.filter((movie) => {
    const categoryRussian = categoryMap[selectedCategory];
    return (
      movie.genre &&
      Array.isArray(movie.genre) &&
      movie.genre.includes(categoryRussian)
    );
  });

  const uniqueMovies = filteredMovies.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

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
      setCanScrollRight(slider.scrollLeft < maxScrollLeft - 1);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScrollButtons);

      setTimeout(checkScrollButtons, 100);

      return () => {
        slider.removeEventListener("scroll", checkScrollButtons);
      };
    }
  }, [uniqueMovies]);

  useEffect(() => {
    const handleResize = () => {
      checkScrollButtons();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const changeCategory = (category) => {
    setSelectedCategory(category);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
      setTimeout(checkScrollButtons, 100);
    }
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

  return (
    <section className="category-section">
      <div className="category-container">
        <h2 className="category-title">Поиск фильмов по категории</h2>

        <div className="category-sidebar">
          {Object.entries(categoryMap).map(([key, value]) => (
            <button
              key={key}
              className={`category-button ${
                selectedCategory === key ? "active" : ""
              }`}
              onClick={() => changeCategory(key)}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="category-content">
          <h3 className="category-content-title">
            {categoryMap[selectedCategory]}
          </h3>

          <p className="category-description">{getCategoryDescription()}</p>

          <div className="category-slider-container">
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

            <div className="category-slider" ref={sliderRef}>
              {uniqueMovies.length > 0 ? (
                uniqueMovies.map((movie) => (
                  <div className="category-movie-card" key={movie.id}>
                    <div
                      className="category-movie-poster"
                      style={{ backgroundImage: `url(${movie.poster})` }}
                    >
                      <div className="category-movie-overlay"></div>
                      <div className="category-movie-info">
                        <h3 className="category-movie-title">{movie.title}</h3>
                        <p className="category-movie-year">{movie.year}</p>
                        <div className="featured-movie-buttons">
                          <button
                            className="more-info-btn"
                            onClick={() => openMovieInfo(movie)}
                          >
                            Подробнее
                          </button>
                          <button
                            className="favorite-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(movie.id);
                            }}
                          >
                            <img
                              src={
                                isFavorite(movie.id)
                                  ? "/CineVerse/images/heart-fill.png"
                                  : "/CineVerse/images/heart.png"
                              }
                              alt="Heart Icon"
                              width="20"
                              height="20"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-movies">
                  Фильмы в данной категории не найдены
                </div>
              )}
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
                  Array.isArray(selectedMovie.genre) &&
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
                  {Array.isArray(selectedMovie.actors)
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
                        ? "/CineVerse/images/heart-fill.png"
                        : "/CineVerse/images/heart.png"
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

export default MovieCategory;
