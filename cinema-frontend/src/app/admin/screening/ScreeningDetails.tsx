import React from "react";
import { useScreening } from "./ScreeningContext";
import { Screening } from "@/types/types";
import ScreeningForm from "./ScreeningForm";

const ScreeningDetails = ({
  selectedScreening: selectedScreening,
}: {
  selectedScreening: Screening | null;
}) => {
  const screening = useScreening();
  if (!screening) return <div>Loading...</div>;
  if (selectedScreening) {
    selectedScreening.date = new Date(selectedScreening.date);
    const currScreening =
      screening.find((f) => f.id === selectedScreening?.id) || null;
    if (!currScreening) return <div>Screening not found</div>;
    currScreening.date = new Date(currScreening.date);
    return (
      <div className="grid place-items-center pt-10">
        <div className="p-3">
          <p>Movie: {currScreening.movie.title}</p>
          <p>Screening id: {currScreening.id}</p>
          <p>On: {currScreening.date.toLocaleDateString()} </p>
          <p>At: {currScreening.date.toLocaleTimeString()}</p>
          <p>Auditorium: {currScreening.auditorium.number}</p>
        </div>

        <div className="collapse w-fit text-center bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Modify Screening
          </div>
          <div className="collapse-content">
            <ScreeningForm
              key={selectedScreening.id}
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
        <div className="collapse-title text-xl font-medium">Add Screening</div>
        <div className="collapse-content">
          <ScreeningForm
            key={"add-movie"}
            selectedScreening={selectedScreening}
          />
        </div>
      </div>
    </div>
  );
};

export default ScreeningDetails;
