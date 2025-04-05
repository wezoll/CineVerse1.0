import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";
import { useFrame } from "@react-three/fiber";
import { Canvas, useLoader } from "@react-three/fiber";
import "./Knight3d.css";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import deadpool from "../../assets/Hero/deadpool.png";
import moviesData from "../../../db.json";
import MovieModal from "../MovieModal/MovieModal";
import TrailerModal from "../TrailerModal/TrailerModal";

const Knight = () => {
  const gltf = useLoader(GLTFLoader, "/CineVerse/deadpool/scene.gltf");
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
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [showExternalModal, setShowExternalModal] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");

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
                      src={isFavorite ? "/CineVerse/images/btn-favorite-fill.png" : "/CineVerse/images/btn-favorite.png"}
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
          trailerUrl={selectedMovie?.trailerLink}
          movieTitle={selectedMovie?.title}
        />
      )}
    </>
  );
};

export default Hero;