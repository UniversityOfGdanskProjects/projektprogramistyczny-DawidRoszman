"use client";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import { MovieProvider } from "./MovieContext";
import AddMovieForm from "./AddMovieForm";
import { useState } from "react";
import { Movie } from "./movieReducer";

const Movie = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
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
