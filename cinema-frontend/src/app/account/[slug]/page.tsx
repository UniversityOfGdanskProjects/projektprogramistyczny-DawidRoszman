"use client";
import React, { useContext } from 'react';
import { TicketsContext } from '../context';
import { formatDateForView } from '@/utils/formatDateForView';

const TicketDetails = ({ params }: { params: { slug: string; }; }) => {
  const tickets = useContext(TicketsContext);
  if (tickets === null) return <div>Loading...</div>;
  const ticket = tickets.find((ticket) => ticket.id === params.slug);
  if (ticket === undefined) return <div>Loading...</div>;
  return (
    <div className='grid place-items-center'>
      <div className="card max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{ticket.movieTitle}</h2>
          <h2>{formatDateForView(new Date(ticket.screeningDate))}</h2>
          <p>Your seat: Row: {ticket.row} Place: {ticket.column} in Auditorium {ticket.auditoriumNumber}</p>
          <p>Your ticket number:<br /> {ticket.id}</p>
          <p className='grid place-items-center'>
            <img src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + ticket.id} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;