import { Screening, Seat } from "@/types/types";
import { api } from "@/utils/apiAddress";
import { formatDateForView } from "@/utils/formatDateForView";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Tickets({ params, searchParams }: {
  params: { slug: string; };
  searchParams?: { [key: string]: string | string[] | undefined; };

}) {
  if (searchParams === undefined || !searchParams.id) {
    redirect("/explore");
  }
  const screeningId = searchParams.id;
  const screening: Screening = await (await axios.get(api + "/api/v1/cinema/screenings/" + screeningId)).data;
  const seatTaken = await (await axios.get(api + "/api/v1/cinema/screenings/" + screeningId + "/seatsTaken")).data;
  return (
    <div className="mx-12">
      <div className="grid place-items-center">
        <div className="flex flex-col items-center p-5">
          <h1>Movie: {screening.movie.title}</h1>
          <h2>On: {formatDateForView(new Date(screening.date))}</h2>
          <h2>In: Auditorium {screening.auditorium.number}</h2>
          <h1>Choose your seat</h1>
        </div>
      </div>
      <div>
        <div className="grid place-items-center">
          {/* screen */}
          <span>Screen</span>
          <div className="mt-0 pt-0 mb-10 divider divider-primary w-64 h-4"></div>

          <div className="grid grid-cols-3 place-items-center w-fit">
            {screening.auditorium.seats.map((seat) => {
              return (
                <>
                  {seatTaken.includes(seat.id) ? <button className="btn btn-outline disabled:bg-secondary btn-square disabled:btn-secondary" disabled ></button> :
                    <Link href={"/tickets/buy-ticket?id=" + screening.id + "&seat=" + seat.id} key={seat.id} className={`btn btn-primary btn-outline btn-square`}></Link>
                  }
                </>
              );
            })}
          </div>
        </div>

        <div>
          <h1>Legend</h1>
          <div className="flex">
            <button className="btn btn-primary btn-outline btn-square"></button>
            <p className="h-12 flex items-center"> - available</p>
          </div>
          <div className="flex">
            <button className="btn btn-secondary btn-square"></button>
            <p className="h-12 flex items-center"> - taken</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Tickets;
