"use client";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import { MovieProvider } from "./MovieContext";
import { useState } from "react";
import { Movie } from "./movieReducer";
import { useToken } from "@/app/components/TokenContext";

const Movie = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  return (
    <MovieProvider>
      <div className="grid place-items-center">
        <div className="relative mx-5 mt-20">
          {selectedMovie !== null && (
            <button
              className="btn btn-primary absolute left-0 top-0"
              onClick={() => setSelectedMovie(null)}
            >
              Go to list
            </button>
          )}
          <MovieDetails selectedMovie={selectedMovie} />
        </div>
        {selectedMovie === null && (
          <MovieList setSelectedMovie={setSelectedMovie} />
        )}
      </div>
    </MovieProvider>
  );
};

export default Movie;
