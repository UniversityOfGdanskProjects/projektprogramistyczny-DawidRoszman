import ErrorPage from "@/components/ErrorPage";
import Loading from "@/components/Loading";
import { Screening } from "@/types/types";
import { agent } from "@/utils/httpsAgent";
import axios from "axios";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import WatchTrailer from "./components/WatchTrailer";
import GoBackBtn from "@/components/GoBackBtn";
import NavBar from "@/components/NavBar";
import GoHome from "@/components/GoHome";

export default async function Details({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams?.id) {
    redirect("/explore");
  }
  try {
    const data = await axios.get(
      `http://pi.dawidroszman.eu:8080/api/v1/cinema/screenings/${searchParams?.id}`,
      { httpsAgent: agent },
    );

    const screening: Screening = data.data;

    return (
      <Suspense fallback={<Loading />}>
        <NavBar />
        <div className="grid place-items-center md:mt-20">
          <div className="card bg-base-200 shadow-xl md:card-side lg:max-w-screen-md relative">
            <GoHome />
            <div className="md:hidden block">
              <MovieImage imageUrl={screening.movie.imageUrl} />
            </div>
            <div className="card-body grid place-items-center lg:w-1/2">
              <div>
                <h1 className="text-center mb-4 text-3xl text-primary font-bold">
                  {screening.movie.title}
                </h1>
                <p>{screening.movie.description}</p>
                <p>Movie released in: {screening.movie.released}</p>
              </div>
              <div className="text-center">
                <div>
                  <p className="text-accent">Directors:</p>
                  <ul>
                    {screening.movie.directors.map((director) => (
                      <li key={director.name}>
                        <p>{director.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-accent">Actors:</p>
                  <ul>
                    {screening.movie.actors.map((actor) => (
                      <li key={actor.name}>
                        <p>{actor.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <WatchTrailer trailer={screening.movie.trailer} />
              </div>
            </div>
            <div className="hidden md:block">
              <MovieImage imageUrl={screening.movie.imageUrl} />
            </div>
          </div>
        </div>
      </Suspense>
    );
  } catch (err: any) {
    return (
      <Suspense fallback={<Loading />}>
        <ErrorPage errorMessage={err.message} />
      </Suspense>
    );
  }
}

const MovieImage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <figure>
      <img className="w-96" src={imageUrl} alt="Movie" />
    </figure>
  );
};
