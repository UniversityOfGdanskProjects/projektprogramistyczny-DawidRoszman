import React from "react";
import { Screening } from "./screeningReducer";
import { useScreening } from "./ScreeningContext";

const ScreeningDetails = ({
  selectedScreening: selectedScreening,
  token,
}: {
  selectedScreening: Screening | null;
  token: string;
}) => {
  const movies = useScreening();
  if (!movies) return <div>Loading...</div>;
  if (selectedScreening) {
    const currScreening =
      movies.find((f) => f.id === selectedScreening?.id) || null;
    if (!currScreening) return <div>Movie not found</div>;
    return (
      <div className="grid place-items-center pt-10">
        <div className="p-3">
          <p>Movie: {currScreening.movie}</p>
          <p>
            On: {currScreening.date.getDay()}/{currScreening.date.getMonth()}/
            {currScreening.date.getFullYear()}
          </p>
          <p>At: {currScreening.time.getTime()}</p>
          <p>Auditorium: {currScreening.auditorium}</p>
        </div>

        <div className="collapse w-fit text-center bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Modify Movie</div>
          <div className="collapse-content">
            <ScreeningForm
              token={token}
              key={currScreening.id}
              selectedScreening={selectedScreening}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="m-5">
      <div className="collapse w-fit text-center bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Add Movie</div>
        <div className="collapse-content">
          <MovieForm
            token={token}
            key={"add-movie"}
            selectedMovie={selectedMovie}
          />
        </div>
      </div>
    </div>
  );
};

export default ScreeningDetails;
