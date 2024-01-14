"use client";
import React, { useContext } from 'react';
import { formatDateForView } from '@/utils/formatDateForView';
import { TicketsContext, UserContext } from './context';
import Link from 'next/link';

const Page = () => {

  const user = useContext(UserContext);
  const tickets = useContext(TicketsContext);

  if (user === null || tickets === null) return <div>Loading...</div>;

  return (
    <div className='md:px-32 pt-16'>
      <div className='text-center text-3xl'>Welcome {user.firstName}</div>
      <div className='grid md:grid-cols-2 place-items-center'>
        {tickets.map((ticket) => {
          return (
            <div key={ticket.id} className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{ticket.movieTitle} - {formatDateForView(new Date(ticket.screeningDate))}</h2>
                <div className="card-actions justify-end">
                  <Link href={"/account/" + ticket.id} className="btn btn-primary">Details</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

  );
};

export default Page;