import { agent } from "@/utils/httpsAgent";
import axios from "axios";
import { Screening } from "../../../types/types";
import { screeningsComparator } from "@/utils/sortingScreenings";
import NavBar from "../../components/NavBar";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default async function Explore() {
  const data = await axios.get(
    "https://pi.dawidroszman.eu:8080/api/v1/cinema/screenings",
    { httpsAgent: agent },
  );
  const screenings: Screening[] = data.data;

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <NavBar />
        <section className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
            {screenings
              .toSorted((a, b) => screeningsComparator(a, b))
              .map((screening) => {
                return (
                  <div
                    key={screening.id}
                    className="card w-96 bg-base-100 shadow-xl"
                  >
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
        </section>
      </div>
    </Suspense>
  );
}
