import axios from "axios";
import { Movie } from "./movieReducer";
import { agent } from "@/utils/httpsAgent";
import { api } from "@/utils/apiAddress";

export const addMovie = async (payload: { movie: Movie; token: string }) => {
  const { movie, token } = payload;
  const response = await axios.post(api + "/api/v1/admin/movie/add", movie, {
    headers: {
      Authorization: "Bearer " + token,
    },
    httpsAgent: agent,
  });
  return response.data;
};

export const removeMovie = async (payload: { movie: Movie; token: string }) => {
  const { movie, token } = payload;
  const response = await axios.delete(
    api + "/api/v1/admin/movie/delete/" + movie.title,
    {
      headers: { Authorization: "Bearer " + token },
      httpsAgent: agent,
    },
  );
  return response.data;
};

export const modifyMovie = async (payload: { movie: Movie; token: string }) => {
  const { movie, token } = payload;
  const response = await axios.put(api + "/api/v1/admin/movie/update", movie, {
    headers: {
      Authorization: "Bearer " + token,
    },
    httpsAgent: agent,
  });
  return response.data;
};
