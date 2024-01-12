import axios from "axios";
import { Movie } from "./movieReducer";
import { agent } from "@/utils/httpsAgent";

export const addMovie = async (payload: { movie: Movie; token: string }) => {
  const { movie, token } = payload;
  const response = await axios.post(
    "http://pi.dawidroszman.eu:8080/api/v1/admin/add-movie",
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

export const removeMovie = async (payload: { movie: Movie; token: string }) => {
  const { movie, token } = payload;
  const response = await axios.delete(
    "http://pi.dawidroszman.eu:8080/api/v1/admin/delete-movie/" + movie.title,
    {
      headers: { Authorization: "Bearer " + token },
      httpsAgent: agent,
    },
  );
  return response.data;
};

export const modifyMovie = async (payload: { movie: Movie; token: string }) => {
  const { movie, token } = payload;
  const response = await axios.put(
    "http://pi.dawidroszman.eu:8080/api/v1/admin/update-movie",
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
