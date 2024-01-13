"use client";
import ScreeningList from "./ScreeningList";
import ScreeningDetails from "./ScreeningDetails";
import { ScreeningProvider } from "./ScreeningContext";
import { useState } from "react";
import { Screening } from "@/types/types";

const Screening = () => {
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(
    null,
  );
  return (
    <ScreeningProvider>
      <div className="grid p-5 place-items-center">
        <div className="relative mx-5">
          {selectedScreening !== null && (
            <button
              className="btn btn-primary absolute left-0 top-0"
              onClick={() => setSelectedScreening(null)}
            >
              Back to list
            </button>
          )}
          <ScreeningDetails
            selectedScreening={selectedScreening}
          />
        </div>
        {selectedScreening === null && (
          <ScreeningList
            setSelectedScreening={setSelectedScreening}
          />
        )}
      </div>
    </ScreeningProvider>
  );
};

export default Screening;
