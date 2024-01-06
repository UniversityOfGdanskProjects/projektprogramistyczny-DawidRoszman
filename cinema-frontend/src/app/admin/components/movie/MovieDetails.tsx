import React from "react";
import { useMovie } from "./MovieContext";
import { Movie } from "./movieReducer";
import ModifyMovieForm from "./ModifyMovieForm";

const MovieDetails = ({ selectedMovie }: { selectedMovie: Movie | null }) => {
  const movies = useMovie();
  if (!movies) return <div>Loading...</div>;
  if (selectedMovie) {
    const currMovie =
      movies.find((f) => f.title === selectedMovie?.title) || null;
    if (!currMovie) return <div>Movie not found</div>;
    return (
      <div>
        {currMovie.title} | {currMovie.tagline} | {currMovie.released} |{" "}
        {currMovie.imageUrl} | {currMovie.trailer}
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Modify Movie</div>
          <div className="collapse-content">
            <ModifyMovieForm
              key={currMovie.title}
              selectedMovie={selectedMovie}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default MovieDetails;
