"use client";
import { useToken } from '@/app/components/TokenContext';
import Link from 'next/link';
import React from 'react';

const CheckIfIsLoggedIn = ({ children }: { children: React.ReactNode; }) => {
  const token = useToken();
  if (token === null) return <div>Unauthorized</div>;
  if (token.token === "") return <div className='grid place-items-center pt-5'>
    <div className="text-5xl text-center p-7">You need to be logged in to buy a ticket</div>
    <Link href="/login" className="btn btn-primary">Login</Link>
  </div>;
  return <>{children}</>;
};

export default CheckIfIsLoggedIn;