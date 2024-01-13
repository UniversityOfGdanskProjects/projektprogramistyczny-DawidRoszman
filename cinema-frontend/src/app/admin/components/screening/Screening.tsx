"use client";
import ScreeningList from "./ScreeningList";
import ScreeningDetails from "./ScreeningDetails";
import { ScreeningProvider } from "./ScreeningContext";
import { useState } from "react";
import { Screening } from "@/types/types";

const Screening = ({ token }: { token: string }) => {
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(
    null,
  );
  return (
    <ScreeningProvider>
      <div className="grid place-items-center">
        <div className="relative mx-5">
          {selectedScreening !== null && (
            <button
              className="btn btn-primary absolute left-0 top-0"
              onClick={() => setSelectedScreening(null)}
            >
              Go back
            </button>
          )}
          <ScreeningDetails
            token={token}
            selectedScreening={selectedScreening}
          />
        </div>
        {selectedScreening === null && (
          <ScreeningList
            token={token}
            setSelectedScreening={setSelectedScreening}
          />
        )}
      </div>
    </ScreeningProvider>
  );
};

export default Screening;
