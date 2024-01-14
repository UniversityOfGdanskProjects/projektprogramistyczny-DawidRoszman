"use client";
import React, { useEffect } from 'react'
import Movie from './Movie'
import { useToken } from '@/app/components/TokenContext';
import { redirect } from 'next/navigation';
import { checkIfIsAdmin } from '@/utils/checkIfIsAdmin';
import GoBackBtn from '@/components/GoBackBtn';

const Page = () => {
  const token = useToken();
  useEffect(() => {
    if (token === null) return;
    if (token.token === "") {
      return
    }
    const checkIfIsValid = async () => {
      await checkIfIsAdmin(token.token);
    };
    checkIfIsValid();
  }, [token]);
  if (token && token.token === "") return (<div>Unauthorized</div>)
  return (
    <>
    <GoBackBtn />
    <Movie />
    </>
  )
}

export default Page