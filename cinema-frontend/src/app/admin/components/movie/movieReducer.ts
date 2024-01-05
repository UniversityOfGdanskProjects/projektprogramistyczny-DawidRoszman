import { agent } from "@/utils/httpsAgent";
import axios from "axios";

export interface Action {
  payload: { movie: Movie; token: string };
  type: Type;
}

export enum Type {
  ADD_MOVIE = "ADD_MOVIE",
  REMOVE_MOVIE = "REMOVE_MOVIE",
  MODIFY_MOVIE = "MODIFY_MOVIE",
  SEARCH_MOVIE = "SEARCH_MOVIE",
}

export interface Movie {
  title: string;
  tagline: string;
  released: number;
  imageUrl: string;
  trailer: string;
}

const addMovie = async (payload: { movie: Movie; token: string }) => {
  const { movie, token } = payload;
  const response = await axios.post(
    "https://pi.dawidroszman.eu:8080/api/v1/admin/movie/add",
    movie,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      httpsAgent: agent,
    },
  );
  return response.data;
};

const removeMovie = async (payload: { movie: Movie; token: string }) => {
  const { movie, token } = payload;
  const response = await axios.post(
    "https://pi.dawidroszman.eu:8080/api/v1/admin/movie/remove",
    movie,
    {
      headers: { Authorization: "Bearer " + token },
      httpsAgent: agent,
    },
  );
  return response.data;
};

const modifyMovie = async (payload: { movie: Movie; token: string }) => {
  const { movie, token } = payload;
  const response = await axios.post(
    "https://pi.dawidroszman.eu:8080/api/v1/admin/movie/modify",
    movie,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      httpsAgent: agent,
    },
  );
  return response.data;
};

export const MovieReducer = (state: Movie[], action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Type.ADD_MOVIE:
      addMovie(payload);
      return [...state, payload];
    case Type.REMOVE_MOVIE:
      removeMovie(payload);
      return state.filter((movie) => movie.title !== payload.movie.title);
    case Type.MODIFY_MOVIE:
      modifyMovie(payload);
      return state.map((movie) =>
        movie.title === payload.movie.title ? payload : movie,
      );
  }
};
