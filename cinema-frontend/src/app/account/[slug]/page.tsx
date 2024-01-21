"use client";
import React, { useContext, useEffect, useState } from "react";
import { TicketsContext } from "../context";
import { formatDateForView } from "@/utils/formatDateForView";
import axios from "axios";
import { useToken } from "@/app/components/TokenContext";
import { api } from "@/utils/apiAddress";
import { Seat } from "@/types/types";
import Loading from "@/components/Loading";
import Image from "next/image";

const TicketDetails = ({ params }: { params: { slug: string } }) => {
  const token = useToken();
  const tickets = useContext(TicketsContext);
  const [seats, setSeats] = useState<Seat[] | null>(null);
  const ticket = tickets?.find((ticket) => ticket.id === params.slug);
  useEffect(() => {
    const fetchSeats = async () => {
      if (token === null || ticket === null || ticket === undefined) return;
      const response = await axios.get(
        api + "/api/v1/tickets/get/" + ticket.id,
        {
          headers: {
            Authorization: "Bearer " + token.token,
          },
        }
      );
      setSeats(response.data);
    };
    fetchSeats();
  }, [ticket, token]);

  if (tickets === null) return <div>Loading...</div>;
  if (ticket === undefined) return <div>Loading...</div>;
  if (token === null) return <div>Unauthorized</div>;

  if (seats === null) return <Loading />;
  return (
    <div className="pt-12 grid place-items-center">
      <div className="card max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{ticket.movieTitle}</h2>
          <h2>{formatDateForView(new Date(ticket.screeningDate))}</h2>
          <p>Auditorium {ticket.auditoriumNumber}</p>
          <p>Your seat/s:</p>
          {seats
            .toSorted((a, b) => (a.row > b.row ? 1 : -1))
            .map((seat) => {
              return (
                <p key={seat.id}>
                  Row: {seat.row} Place: {seat.column}{" "}
                </p>
              );
            })}
          <p>
            Your ticket number:
            <br /> {ticket.id}
          </p>
          <p className="grid place-items-center">
            <img
              alt="qr code"
              src={
                "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                ticket.id
              }
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
