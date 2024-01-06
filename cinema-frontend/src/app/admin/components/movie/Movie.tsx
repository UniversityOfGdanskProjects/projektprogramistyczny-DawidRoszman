"use client";
import React from "react";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import { MovieProvider } from "./MovieContext";
import AddMovieForm from "./AddMovieForm";

const Movie = () => {
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  return (
    <div>
      <MovieProvider>
        <MovieList setSelectedMovie={setSelectedMovie} />
        <MovieDetails selectedMovie={selectedMovie} />
        <AddMovieForm />
      </MovieProvider>
    </div>
  );
};

export default Movie;
