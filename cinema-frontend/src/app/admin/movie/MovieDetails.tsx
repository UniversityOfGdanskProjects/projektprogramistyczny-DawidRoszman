import React from "react";
import { useMovie } from "./MovieContext";
import { Movie } from "./movieReducer";
import MovieForm from "./MovieForm";
import Image from "next/image";

const MovieDetails = ({ selectedMovie }: { selectedMovie: Movie | null }) => {
  const movies = useMovie();
  if (!movies) return <div>Loading...</div>;
  if (selectedMovie) {
    const currMovie =
      movies.find((f) => f.title === selectedMovie?.title) || null;
    if (!currMovie) return <div>Movie not found</div>;
    return (
      <div className="grid place-items-center pt-10">
        <div className="p-3 max-w-screen-md">
          <p>Title: {currMovie.title}</p>
          <p>Description: {currMovie.description}</p>
          <p>Release date: {currMovie.released}</p>
          <p>
            Image:{" "}
            <Image
              alt="movie poster"
              className="w-36"
              src={currMovie.imageUrl}
            />
          </p>
          <p>Trailer url: {currMovie.trailer}</p>
        </div>

        <div className="collapse w-fit text-center bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Modify Movie</div>
          <div className="collapse-content">
            <MovieForm key={currMovie.title} selectedMovie={selectedMovie} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="m-5">
      <div className="collapse w-fit text-center bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Add Movie</div>
        <div className="collapse-content">
          <MovieForm key={"add-movie"} selectedMovie={selectedMovie} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
