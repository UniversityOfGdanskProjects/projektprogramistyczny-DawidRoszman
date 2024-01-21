import Loading from "@/components/Loading";
import { Seat } from "@/types/types";
import { api } from "@/utils/apiAddress";
import axios from "axios";
import React, { Suspense, useEffect } from "react";

const StepThree = ({
  seats,
  discounts,
  handleBuyTicket,
}: {
  seats: Seat[];
  discounts: { [key: string]: string };
  handleBuyTicket: (
    order: {
      id: string;
      discount: string;
    }[]
  ) => Promise<void>;
}) => {
  const [submitted, setSubmitted] = React.useState(false);
  const discountEntries = Object.entries(discounts).map((discount) => {
    return {
      id: discount[0],
      discount: discount[1],
    };
  });
  const [seatPrices, setSeatPrices] = React.useState<
    { id: string; price: number }[]
  >([]);

  useEffect(() => {
    const fetchPricesOfSeats = async (
      discounts: { id: string; discount: string }[]
    ) => {
      const x = discounts.map(async (discount) => {
        const response = await axios.get(
          api +
            "/api/v1/cinema/seats/price?seatId=" +
            discount.id +
            "&discount=" +
            discount.discount
        );
        return {
          id: discount.id,
          price: response.data as number,
        };
      });
      setSeatPrices(await Promise.all(x));
    };
    fetchPricesOfSeats(discountEntries);
  }, [discountEntries]);

  if (seatPrices.length === 0) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-3 gap-2 m-5">
        {seatPrices.map((seat) => {
          const seatInfo = seats.find((s) => s.id === seat.id);
          return (
            <div className="border border-primary p-4 rounded" key={seat.id}>
              <h1>
                Seat {seatInfo?.row}-{seatInfo?.column}{" "}
                {seatInfo?.vip && <span className="text-warning">VIP</span>}
              </h1>
              <div>Price {seat.price}</div>
            </div>
          );
        })}
        <h1 className="text-2xl">
          Sum: {seatPrices.reduce((acc, curr) => acc + curr.price, 0)}
        </h1>
        <div className="grid place-items-center">
          <button
            onClick={() => {
              setSubmitted(true);
              handleBuyTicket(discountEntries);
            }}
            {...(submitted ? { disabled: true } : {})}
            className={"btn btn-primary" + (submitted ? " disabled" : "")}
          >
            {submitted && <div className="loading"></div>}
            {!submitted && "Confirm and pay"}
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default StepThree;
