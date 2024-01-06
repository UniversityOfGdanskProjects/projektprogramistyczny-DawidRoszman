import React from "react";
import { Movie, Type } from "./movieReducer";
import { useMovie, useMovieDispatch } from "./MovieContext";

const MovieList = ({
  setSelectedMovie,
  token
}: {
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  token: string
}) => {
  const movies: Movie[] | null = useMovie();
  const dispatch = useMovieDispatch();
  if (!dispatch) return null;
  const handleRemove = (movie: Movie) => {
    dispatch({
      type: Type.REMOVE_MOVIE,
      payload: {
        token: token, 
        movie: movie,
      },
    });
  };
  if (!movies) return <div>No movies to show</div>;
  return (
    <div>
      {movies.map((movie) => {
        return (
          <div className="flex gap-4 p-3" key={movie.title}>
            <button
              onClick={() => {
                setSelectedMovie(movie);
              }}
            >
              {movie.title}
            </button>
            <button
              className="border-red-500 border-2 p-2 text-red-400 pointer hover:text-white hover:bg-red-400"
              onClick={() => handleRemove(movie)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
