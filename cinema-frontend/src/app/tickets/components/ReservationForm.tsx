"use client";
import { Seat } from "@/types/types";
import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { isSeatTaken } from "../utils/isSeatTaken";
import { api } from "@/utils/apiAddress";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToken } from "@/app/components/TokenContext";

const ReservationForm = ({
  seats,
  seatsTaken,
  screeningId,
}: {
  seats: Seat[];
  seatsTaken: string[];
  screeningId: string;
}) => {
  const [step, setStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [discounts, setDiscounts] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const token = useToken();

  if (token === null || token.token === "" || token.token === null) return null;

  const handleChangeStep = (newStep: number) => {
    if (step > newStep) setStep(newStep);
  };
  const handleBuyTicket = async (order: { id: string; discount: string }[]) => {
    const checkTickets = order.map(async (seat) => {
      const seatTaken = await isSeatTaken(screeningId, seat.id);
      if (seatTaken) {
        alert("Someone else bought the ticket try buying another one");
        router.push("/explore");
        return;
      }
    });
    Promise.all(checkTickets);

    try {
      const response = await axios.post(
        api + "/api/v1/tickets/buy",
        {
          screeningId: screeningId,
          orders: order,
        },
        {
          headers: {
            Authorization: "Bearer " + token.token,
          },
        },
      );
      alert("Ticket bought");
      console.log(response.data);
      router.replace(`/account/${response.data}`);
    } catch (e) {
      alert("Something went wrong");
      console.log(e);
    }
  };
  return (
    <div className="grid place-items-center">
      <ul className="steps">
        <li className={`step ${step >= 1 && "step-primary"}`}>
          <button onClick={() => handleChangeStep(1)}>Choose seats</button>
        </li>
        <li className={`step ${step >= 2 && "step-primary"}`}>
          <button onClick={() => handleChangeStep(2)}>Choose discounts</button>
        </li>
        <li className={`step ${step >= 3 && "step-primary"}`}>
          <button onClick={() => handleChangeStep(3)}>Purchase</button>
        </li>
        <li className={`step ${step >= 4 && "step-primary"}`}>
          <button onClick={() => handleChangeStep(4)}>Receive Product</button>
        </li>
      </ul>

      {step === 1 && (
        <StepOne
          setStep={setStep}
          seats={seats}
          seatsTaken={seatsTaken}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />
      )}
      {step === 2 && (
        <StepTwo
          seats={seats}
          selectedSeats={selectedSeats}
          setStep={setStep}
          setDiscounts={setDiscounts}
        />
      )}
      {step === 3 && (
        <StepThree
          handleBuyTicket={handleBuyTicket}
          seats={seats}
          discounts={discounts}
        />
      )}
    </div>
  );
};

export default ReservationForm;
