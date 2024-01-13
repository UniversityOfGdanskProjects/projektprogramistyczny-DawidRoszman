import axios from "axios";
import { api } from "./apiAddress";

export async function fetchAuditoriums() {
  const responese = await axios.get(api + "/api/v1/cinema/auditoriums");
  const auditoriums = responese.data;
  return auditoriums;
}
