"use client";
import React from "react";
import { Movie, Type } from "./movieReducer";
import { useMovie, useMovieDispatch } from "./MovieContext";
import { removeMovie } from "./movieUtils";

const MovieList = ({
  setSelectedMovie,
  token,
}: {
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  token: string;
}) => {
  const movies: Movie[] | null = useMovie();
  const dispatch = useMovieDispatch();
  if (!dispatch) return null;
  const handleRemove = async (movie: Movie) => {
    const ans = prompt(
      `Are you sure you want to remove ${movie.title}? Type "yes" if you want to remove movie`,
    );
    if (ans !== "yes") return;
    try {
      await removeMovie({ movie: movie, token });
      dispatch({
        type: Type.REMOVE_MOVIE,
        payload: {
          token: token,
          movie: movie,
        },
      });
      alert("Movie removed");
    } catch (err) {
      alert(err);
    }
  };
  if (!movies) return <div>No movies to show</div>;
  return (
    <div className="flex flex-col gap-3">
      {movies.map((movie) => {
        return (
          <div className="join" key={movie.title}>
            <div className="h-[3rem] border border-neutral-content p-2 grid place-items-center justify-center join-item">
              <div>{movie.title}</div>
            </div>
            <button
              className="join-item btn btn-outline btn-success"
              onClick={() => {
                setSelectedMovie(movie);
              }}
            >
              Modify
            </button>
            <button
              className="join-item btn btn-outline btn-error"
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
