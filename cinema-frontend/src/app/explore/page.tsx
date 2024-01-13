import { agent } from "@/utils/httpsAgent";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";
import { Screening } from "@/types/types";
import { formatDateForView } from "@/utils/formatDateForView";
import { api } from "@/utils/apiAddress";

export default async function Explore() {
  const data = await axios.get(
    api+"/api/v1/cinema/screenings",
    { httpsAgent: agent },
  );
  const screenings: Screening[] = data.data;

  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-base-100">
        <NavBar />
        <section className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 place-items-center">
            {screenings
              .toSorted((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (dateA.getMonth() < dateB.getMonth()) return -1;
                if (dateA.getMonth() > dateB.getMonth()) return 1;
                if (dateA.getDay() < dateB.getDay()) return -1;
                if (dateA.getDay() > dateB.getDay()) return 1;
                if (dateA.getHours() < dateB.getHours()) return -1;
                if (dateA.getHours() > dateB.getHours()) return 1;
                return 0;
              })
              .map((screening) => {
                const date = new Date(screening.date);
                return (
                  <div
                    key={screening.id}
                    className="card w-96 bg-base-100 shadow-xl"
                  >
                    <figure>
                      <img src={screening.movie.imageUrl} alt="Movie posters" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{screening.movie.title}</h2>
                      <p>{formatDateForView(date)}</p>
                      <div className="card-actions justify-end">
                        <Link
                          href={`/buy-ticket?id=${screening.id}`}
                          className="btn btn-primary"
                        >
                          Buy ticket
                        </Link>
                        <Link
                          href={`/details?id=${screening.id}`}
                          className="btn btn-accent"
                        >
                          Details
                        </Link>
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
