import React, { useEffect, useMemo, useState } from "react";
import { useMovie } from "./MovieContext";
import { Movie } from "./movieReducer";
import MovieForm from "./MovieForm";
import axios from "axios";
import { api } from "@/utils/apiAddress";
import { Person } from "@/types/types";
import AddPerson from "./AddPerson";
import { useToken } from "@/app/components/TokenContext";

const MovieDetails = ({ selectedMovie }: { selectedMovie: Movie | null }) => {
  const movies = useMovie();
  const [actorsForMovie, setActorsForMovie] = useState<Person[] | null>(null);
  const [actors, setActors] = useState<Person[] | null>(null);
  const tokenContext = useToken();

  const addPerson = async (person: string) => {
    if (!selectedMovie) return;
    console.log(selectedMovie.title);
    try {
      const response = await axios.put(
        api +
          "/api/v1/cinema/movies/add/actor?movieTitle=" +
          selectedMovie.title +
          "&actorName=" +
          person,
        {
          headers: {
            Authorization: "Bearer " + tokenContext?.token,
          },
        },
      );
      const newActor: Person = response.data;
      setActorsForMovie((prev) => {
        if (prev === null) return prev;
        return [...prev, newActor];
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deletePerson = async (person: string) => {
    if (!selectedMovie) return;
    try {
      await axios.put(
        api + "/api/v1/persons/removeMovie",
        {
          personName: person,
          movieTitle: selectedMovie.title,
        },
        {
          headers: {
            Authorization: "Bearer " + tokenContext?.token,
          },
        },
      );

      setActorsForMovie((prev) => {
        if (prev === null) {
          return prev;
        }
        return prev.filter((actor) => actor.name !== person);
      });
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };
  useMemo(() => {
    if (!selectedMovie) {
      setActorsForMovie(null);
      return;
    }
    const fetchActorsForMovie = async () => {
      return await axios
        .get(api + "/api/v1/cinema/movies/" + selectedMovie.title + "/actors")
        .then((res) => res.data);
    };
    const fetchActors = async () => {
      return await axios
        .get(api + "/api/v1/persons/all")
        .then((res) => res.data);
    };
    fetchActorsForMovie().then((data) => setActorsForMovie(data));
    fetchActors().then((data) => setActors(data));
  }, [selectedMovie]);

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
            <img alt="movie poster" className="w-36" src={currMovie.imageUrl} />
          </p>
          <p>Trailer url: {currMovie.trailer}</p>
          <p>Actors</p>
          <ul>
            {actorsForMovie &&
              actorsForMovie.map((actor) => {
                return (
                  <li key={actor.name}>
                    {actor.name}{" "}
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => deletePerson(actor.name)}
                    >
                      -
                    </button>
                  </li>
                );
              })}
          </ul>
          {actors && <AddPerson addPerson={addPerson} person={actors} />}
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
