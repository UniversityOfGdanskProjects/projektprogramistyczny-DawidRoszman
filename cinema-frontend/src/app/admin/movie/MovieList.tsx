"use client";
import React from "react";
import { Movie, Type } from "./movieReducer";
import { useMovie, useMovieDispatch } from "./MovieContext";
import { removeMovie } from "./movieUtils";
import Search from "../components/Search";
import { useToken } from "@/app/components/TokenContext";

const MovieList = ({
  setSelectedMovie,
}: {
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
}) => {
  const movies: Movie[] | null = useMovie();
  const [searchTerm, setSearchTerm] = React.useState("");
  const token = useToken();
  const dispatch = useMovieDispatch();
  if (!dispatch || !token) return null;
  const handleRemove = async (movie: Movie) => {
    const ans = prompt(
      `Are you sure you want to remove ${movie.title}? Type "yes" if you want to remove movie`,
    );
    if (ans !== "yes") return;
    try {
      await removeMovie({ movie: movie, token: token.token });
      dispatch({
        type: Type.REMOVE_MOVIE,
        payload: {
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
    <div>
      <Search search={searchTerm} setSearch={setSearchTerm} />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 p-4">
        {movies
          .filter((movie) => movie.title.includes(searchTerm))
          .map((movie) => {
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
    </div>
  );
};

export default MovieList;
