import axios from "axios";

export async function fetchMovies() {
  const response = await axios.get(
    "http://pi.dawidroszman.eu:8080/api/v1/cinema/movies",
  );
  const movies = response.data;
  return movies;
}
