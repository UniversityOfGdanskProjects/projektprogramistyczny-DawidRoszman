import {
  Dispatch,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { Action, Movie, MovieReducer, Type } from "./movieReducer";
import axios from "axios";

export const MovieContext = createContext<Movie[] | null>(null);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function useMovie() {
  return useContext(MovieContext);
}
export function useMovieDispatch() {
  return useContext(DispatchContext);
}

export function MovieProvider({ children }: any) {
  const [movie, dispatch] = useReducer(MovieReducer, []);

  useEffect(() => {
    axios
      .get("http://pi.dawidroszman.eu:8080/api/v1/cinema/movies")
      .then((response) => {
        const movies = response.data;
        dispatch({ type: Type.SET_MOVIES, payload: { movies: movies } }); // Assuming you have a 'SET_MOVIES' action in your reducer
      });
  }, []);

  return (
    <MovieContext.Provider value={movie}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </MovieContext.Provider>
  );
}

