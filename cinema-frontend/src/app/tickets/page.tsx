import { Screening, Seat } from "@/types/types";
import { api } from "@/utils/apiAddress";
import { formatDateForView } from "@/utils/formatDateForView";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import ReservationForm from "./components/ReservationForm";

async function Tickets({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  if (searchParams === undefined || !searchParams.id) {
    redirect("/explore");
  }
  const screeningId = searchParams.id;
  const screening: Screening = await (
    await axios.get(api + "/api/v1/cinema/screenings/" + screeningId)
  ).data;
  const seatTaken = await (
    await axios.get(
      api + "/api/v1/cinema/screenings/" + screeningId + "/seatsTaken",
    )
  ).data;
  return (
    <div className="mx-12">
      <div className="grid place-items-center">
        <div className="flex flex-col items-center p-5">
          <h1>Movie: {screening.movie.title}</h1>
          <h2>On: {formatDateForView(new Date(screening.date))}</h2>
          <h2>In: Auditorium {screening.auditorium.number}</h2>
        </div>
      </div>
      <div>
        <ReservationForm
          screeningId={screeningId}
          seatsTaken={seatTaken}
          seats={screening.auditorium.seats}
        />
      </div>
    </div>
  );
}

export default Tickets;
