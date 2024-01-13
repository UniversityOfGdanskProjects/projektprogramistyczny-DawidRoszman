import { agent } from "@/utils/httpsAgent";
import axios from "axios";

export interface Action {
  payload: any;
  type: Type;
}

export enum Type {
  ADD_MOVIE = "ADD_MOVIE",
  REMOVE_MOVIE = "REMOVE_MOVIE",
  MODIFY_MOVIE = "MODIFY_MOVIE",
  SET_MOVIES = "SET_MOVIES",
}

export interface Movie {
  title: string;
  description: string;
  released: number;
  imageUrl: string;
  trailer: string;
}

export const MovieReducer = (state: Movie[], action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Type.ADD_MOVIE:
      return [...state, payload.movie];
    case Type.REMOVE_MOVIE:
      return state.filter((movie) => movie.title !== payload.movie.title);
    case Type.MODIFY_MOVIE:
      return state.map((movie) =>
        movie.title === payload.movie.title ? payload.movie : movie,
      );
    case Type.SET_MOVIES:
      return payload.movies;
    default:
      return state;
  }
};
