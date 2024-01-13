import { Screening } from "@/types/types";
import { formatDateForView } from "@/utils/formatDateForView";
import Link from "next/link";
import React from "react";

export default function ScreeningsView({
  screenings,
  page,
  limit
}: {
  screenings: Screening[];
  page: number;
  limit: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 place-items-center">
      {screenings
        .slice((page - 1) * limit, page * limit)
        .map((screening) => {
          const date = new Date(screening.date);
          return (
            <div key={screening.id} className="card w-96 bg-base-100 shadow-xl">
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
  );
}
