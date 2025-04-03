import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./Kinoservice.css";

const Kinoservice = () => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={40}
      speed={6000}
      autoplay={{
        delay: 1,
        disableOnInteraction: true,
      }}
      loop={true}
      freeMode={true}
      modules={[Autoplay, FreeMode]}
      className="mySwiper"
    >
      <SwiperSlide>
        <a
          href="https://www.netflix.com/kz-ru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/CineVerse/images/Netflix.svg" className="slider-el" alt="Netflix" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="https://www.kinopoisk.ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/CineVerse/images/Kinopoisk.svg" className="slider-el" alt="Kinopoisk" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="https://www.ivi.ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/CineVerse/images/Ivi.svg" className="slider-el" alt="Ivi" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="https://premier.one"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/CineVerse/images/Premier.svg" className="slider-el" alt="Premier" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="https://megogo.net/ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/CineVerse/images/Megogo.svg" className="slider-el" alt="Megogo" />
        </a>
      </SwiperSlide>
    </Swiper>
  );
};

export default Kinoservice;