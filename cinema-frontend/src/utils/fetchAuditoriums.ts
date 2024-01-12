import { Auditorium } from "@/types/types";
import axios from "axios";

export async function fetchAuditoriums() {
  const responese = await axios.get(
    "http://pi.dawidroszman.eu:8080/api/v1/cinema/auditoriums",
  );
  const auditoriums: Auditorium[] = responese.data;
  return auditoriums;
}
