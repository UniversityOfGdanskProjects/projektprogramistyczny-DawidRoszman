import { api } from "@/utils/apiAddress";
import axios from "axios";

export async function isSeatTaken(screeningId: string, seatId: string) {
    const response = await axios.get(api+`/api/v1/cinema/screenings/${screeningId}/seat/${seatId}`);
    return response.data;
}