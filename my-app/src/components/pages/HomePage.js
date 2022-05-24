import React, { Fragment } from "react";
import MovieList from "../movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movie-layout page-container pb-10">
        <h2 className="text-white text-3xl font-bold mb-10 capitalize">
          Now Playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className="movie-layout page-container pb-10">
        <h2 className="text-white text-3xl font-bold mb-10 capitalize">
          Top rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movie-layout page-container pb-10">
        <h2 className="text-white text-3xl font-bold mb-10 capitalize">
          Most popular
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
