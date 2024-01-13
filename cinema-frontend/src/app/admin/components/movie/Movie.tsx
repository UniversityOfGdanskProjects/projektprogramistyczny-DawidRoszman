"use client";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import { MovieProvider } from "./MovieContext";
import { useState } from "react";
import { Movie } from "./movieReducer";

const Movie = ({ token }: { token: string }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  return (
    <MovieProvider>
      <div className="grid place-items-center">
        <div className="relative mx-5">
          {selectedMovie !== null && (
            <button
              className="btn btn-primary absolute left-0 top-0"
              onClick={() => setSelectedMovie(null)}
            >
              Go back
            </button>
          )}
          <MovieDetails token={token} selectedMovie={selectedMovie} />
        </div>
        {selectedMovie === null && (
          <MovieList token={token} setSelectedMovie={setSelectedMovie} />
        )}
      </div>
    </MovieProvider>
  );
};

export default Movie;
