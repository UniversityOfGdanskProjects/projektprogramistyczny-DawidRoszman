import { Screening } from "@/types/types";
import { api } from "@/utils/apiAddress";
import { formatDateForView } from "@/utils/formatDateForView";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Tickets({ params, searchParams }: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };

}) {
  if (searchParams === undefined || !searchParams.id) {
    redirect("/explore")
  }
  const screeningId = searchParams.id;
  const screening : Screening = await (await axios.get(api+"/api/v1/cinema/screenings/"+screeningId)).data
  return (
    <div>
      <h1>{screening.movie.title}</h1>
      <h2>{formatDateForView(new Date(screening.date))}</h2>
      <h2>{screening.auditorium.number}</h2>

      <div>
        <h1>Choose seat</h1>
        <div className="grid place-items-center">
          {/* screen */}
          <span>Screen</span>
          <div className="mt-0 pt-0 mb-10 divider divider-primary w-64 h-4"></div>

        <div className="grid grid-cols-3 place-items-center w-fit">
          {screening.auditorium.seats.map((seat) => {
            return (
              <Link href={"/tickets/buy-ticket?id="+screening.id+"&seat="+seat.id} key={seat.id} className="btn btn-outline btn-square"></Link>
            );
          })}
          </div>
      </div>

        </div>
    </div>
  );
}

export default Tickets;
