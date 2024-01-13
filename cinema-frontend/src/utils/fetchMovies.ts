import axios from "axios";
import { api } from "./apiAddress";

export async function fetchMovies() {
  const response = await axios.get(
    api+"/api/v1/cinema/movies",
  );
  const movies = response.data;
  return movies;
}
