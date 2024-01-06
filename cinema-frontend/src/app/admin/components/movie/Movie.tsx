"use client";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import { MovieProvider } from "./MovieContext";
import AddMovieForm from "./AddMovieForm";
import { useState } from "react";
import { Movie } from "./movieReducer";

const Movie = ({token}: {token: string}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  return (
    <div>
      <MovieProvider>
        <MovieList token={token} setSelectedMovie={setSelectedMovie} />
        <MovieDetails token={token} selectedMovie={selectedMovie} />
        <AddMovieForm token={token} />
      </MovieProvider>
    </div>
  );
};

export default Movie;
