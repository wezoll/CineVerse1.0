import React from 'react';
import './TrailerModal.css';

const TrailerModal = ({ isOpen, onClose, trailerUrl, movieTitle }) => {
  if (!isOpen) return null;
  
  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getYoutubeVideoId(trailerUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  
  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div className="movie-modal" onClick={onClose}>
      <div className="movie-modal-content trailer-modal-content" onClick={handleContentClick}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        
        <div className="trailer-wrapper">
          <div className="trailer-header">
            <h3 className="trailer-title">Трейлер: {movieTitle}</h3>
          </div>
          
          <div className="trailer-container">
            <iframe 
              className="trailer-iframe"
              src={embedUrl}
              title={`Трейлер ${movieTitle}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;