import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/Header/logo.svg";
import searchIcon from "../../assets/Header/search-icon.svg";
import avatar from "../../assets/Header/avatar.png";
import AuthModal from "./AuthModal/AuthModal";
import Search from "./Search/Search";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 50) {
        header.classList.add("shrink");
      } else {
        header.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  };
  
  if (isModalOpen || isSearchOpen) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  const closeModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsModalOpen(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="nav-header">
        <nav className="navigation">
          <div className="nav-left">
            <div className="logo">
              <img
                src={logo}
                alt=""
                className="nav-logo"
                onClick={() => scrollToSection("home")}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="nav-right">
            <ul className="nav-els">
              <li className="nav-el" onClick={() => scrollToSection("home")}>
                Главная
              </li>
              <li className="nav-el" onClick={() => scrollToSection("TrendingMovies")}>
                Актуальные фильмы
              </li>
              <li className="nav-el" onClick={() => scrollToSection("PopularSeries")}>
                Популярные сериалы
              </li>
              <li className="nav-el" onClick={() => scrollToSection("FAQ")}>
                FAQ
              </li>
            </ul>
            <div className="nav-icons">
              <img 
                src={searchIcon} 
                alt="" 
                className="search-icon" 
                onClick={toggleSearch} 
                style={{ cursor: "pointer" }}
              />
              <img
                src={avatar}
                alt=""
                className="user-avatar"
                onClick={toggleModal}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </nav>
      </header>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={toggleModal}>
              ×
            </button>
            <AuthModal />
          </div>
        </div>
      )}
      
      <Search isOpen={isSearchOpen} onClose={toggleSearch} />
    </>
  );
};

export default Header;