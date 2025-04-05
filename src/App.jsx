import "./App.css";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Kinoservice from "./components/Kinoservice/Kinoservice";
import TrendingMovies from "./components/TrendingMovies/TrendingMovies";
import PopularFilms from "./components/PopularFilms/PopularFilms";
import Top10 from "./components/Top10/Top10";
import MovieCategory from "./components/MovieCategory/MovieCategory";
import PopularSeries from "./components/PopularSeries/PopularSeries";
import FAQ from "./components/FAQ/FAQ";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Footer from "./components/Footer/Footer";




function App() {
  return (
    <>
      <Header></Header>
      <div id="home">
        <Hero></Hero>
      </div>
      <div id="top10">
      <Top10></Top10>
      </div>
      <Kinoservice></Kinoservice>
      <div id="TrendingMovies">
      <TrendingMovies></TrendingMovies>
      </div>
      <div id="PopularFilms">
      <PopularFilms></PopularFilms>
      </div>
      <div id="MovieCategory>">
      <MovieCategory></MovieCategory>
      </div>
      <div id="PopularSeries">
      <PopularSeries></PopularSeries>
      </div>
      <div id="FAQ">
      <FAQ></FAQ>
      </div>
      <div id="Feedback"></div>
      <FeedbackForm></FeedbackForm>
      <Footer></Footer>
      <ScrollToTopButton></ScrollToTopButton>
    </>
  );
}
export default App;
