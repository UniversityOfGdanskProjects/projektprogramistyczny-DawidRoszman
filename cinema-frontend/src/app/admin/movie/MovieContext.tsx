import {
  Dispatch,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { Action, Movie, MovieReducer, Type } from "./movieReducer";
import { fetchMovies } from "@/utils/fetchMovies";

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
    const fetchAndSetMovies = async () => {
      if (movie.length !== 0) return;
      const movies = await fetchMovies();
      dispatch({
        type: Type.SET_MOVIES,
        payload: { movies: movies },
      });
    };
    fetchAndSetMovies();
  }, [movie.length]);

  return (
    <MovieContext.Provider value={movie}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </MovieContext.Provider>
  );
}
