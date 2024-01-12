import axios from "axios";

export async function fetchAuditoriums() {
  const responese = await axios.get(
    "http://pi.dawidroszman.eu:8080/api/v1/cinema/auditoriums",
  );
  const auditoriums = responese.data;
  console.log(auditoriums);
  return auditoriums;
}
