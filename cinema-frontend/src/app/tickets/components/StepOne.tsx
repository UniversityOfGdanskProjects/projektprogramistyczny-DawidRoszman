import { Seat } from "@/types/types";

const StepOne = ({
  seats,
  seatsTaken,
  setStep,
  selectedSeats,
  setSelectedSeats,
}: {
  seats: Seat[];
  seatsTaken: string[];
  setStep: (step: number) => void;
  selectedSeats: string[];
  setSelectedSeats: (seats: string[]) => void;
}) => {
  return (
    <>
      {" "}
      <div className="grid place-items-center">
        {/* screen */}
        <span>Screen</span>
        <div className="mt-0 pt-0 mb-10 divider divider-primary w-64 h-4"></div>

        <div className="grid grid-cols-3 place-items-center w-fit">
          {seats.map((seat) => {
            return seatsTaken.includes(seat.id) ? (
              <button
                key={seat.id}
                className="btn btn-outline disabled:bg-secondary btn-square disabled:btn-secondary"
                disabled
              ></button>
            ) : (
              <input
                key={seat.id}
                type="checkbox"
                checked={selectedSeats.includes(seat.id)}
                className={`btn btn-outline btn-square`}
                onChange={() => {
                  if (selectedSeats.includes(seat.id)) {
                    setSelectedSeats(
                      selectedSeats.filter((s) => s !== seat.id),
                    );
                  } else {
                    setSelectedSeats([...selectedSeats, seat.id]);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="mr-52">
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
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (selectedSeats.length === 0) {
              alert("You must select at least one seat");
              return;
            }
            setStep(2);
          }}
        >
          Confirm selected seats
        </button>
      </div>
    </>
  );
};

export default StepOne;
