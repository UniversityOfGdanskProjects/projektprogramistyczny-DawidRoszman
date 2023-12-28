import { agent } from "@/utils/httpsAgent";
import axios from "axios";

interface Screening {
  id: number;
  date: string;
  time: string;
  movie: {
    title: string;
    description: string;
  };
  auditorium: {
    number: number;
    seats: number;
  };
}

export default async function Explore() {
  const data = await axios.get(
    "https://pi.dawidroszman.eu:8080/api/v1/cinema/screenings",
    { httpsAgent: agent },
  );
  const screenings: Screening[] = data.data;
  return (
    <div className="grid grid-cols-3 place-items-center">
      {screenings.map((screening) => {
        return (
          <div key={screening.id} className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{screening.movie.title}</h2>
              <p>{screening.date}</p>
              <p>{screening.time}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy ticket</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
