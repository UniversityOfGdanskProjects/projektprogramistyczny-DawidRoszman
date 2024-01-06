import { Dispatch, createContext, useContext, useReducer } from "react";
import { Action, Movie, MovieReducer } from "./movieReducer";

export const MovieContext = createContext<Movie[] | null>(null);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function useMovie() {
  return useContext(MovieContext);
}
export function useMovieDispatch() {
  return useContext(DispatchContext);
}

const initialState: Movie[] = [
  {
    title: "The Godfather",
    tagline: "An offer you can't refuse",
    released: 1972,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
    trailer: "https://www.youtube.com/watch?v=sY1S34973zA",
  },
];
export function MovieProvider({ children }: any) {
  const [movie, dispatch] = useReducer(MovieReducer, initialState);

  return (
    <MovieContext.Provider value={movie}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </MovieContext.Provider>
  );
}
