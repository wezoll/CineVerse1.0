import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";
import { useFrame } from "@react-three/fiber";
import { Canvas, useLoader } from "@react-three/fiber";
import "./Knight3d.css";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import deadpool from "../../assets/Hero/deadpool.png";
import moviesData from "../../../db.json";

const Knight = () => {
  const gltf = useLoader(GLTFLoader, "/deadpool/scene.gltf");
  const knightRef = useRef();

  useFrame(() => {
    if (knightRef.current) {
      knightRef.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      ref={knightRef}
      object={gltf.scene}
      scale={120}
      position={[0, -1, 0]}
    />
  );
};

const Hero = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const heroMovie = moviesData.movies
    ? moviesData.movies.find((movie) => movie.category === "Hero")
    : null;

  const openMovieInfo = () => {
    if (heroMovie) {
      setSelectedMovie(heroMovie);
      setShowModal(true);
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
    <>
      <section className="hero-section-main">
        <div className="hero-block-main">
          <div className="movie-card-main">
            <img
              src={deadpool}
              alt="Deadpool & Wolverine"
              className="movie-image-main"
            />
            <div className="movie-info-main">
              <div className="movie-content-main">
                <h2 className="movie-title-main">
                  Дэдпул <br /> и Росомаха
                </h2>
                <p className="release-date-main">
                  Дата премьеры: 25 июля 2024г
                </p>
                <p className="movie-description-main">
                  Уэйд Уилсон попадает в организацию «Управление временными
                  изменениями», что вынуждает его вернуться к своему альтер-эго
                  Дэдпулу и изменить историю с помощью Росомахи.
                </p>
                <div className="action-buttons-main">
                  <button
                    className="details-button-main"
                    onClick={openMovieInfo}
                  >
                    Подробнее
                  </button>
                  <button 
                    className="favorite-button-main" 
                    onClick={toggleFavorite}
                  >
                    <img
                      src={isFavorite ? "/btn-favorite-fill.png" : "/btn-favorite.png"}
                      alt="Favorite"
                      width="30"
                      height="30"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-model-main">
            <Canvas camera={{ position: [0, 10, 50], fov: 3.5 }}>
              <ambientLight intensity={2.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Knight />
              <OrbitControls
                enableZoom={false}
                enableRotate={true}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </div>
      </section>

      {/* Модальное окно */}
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
                  onClick={toggleFavorite}
                >
                  <img
                    src={isFavorite ? "/heart-fill.png" : "/heart.png"}
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
    </>
  );
};

export default Hero;