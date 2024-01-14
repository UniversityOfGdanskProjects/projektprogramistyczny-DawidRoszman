"use client";
import { redirect } from "next/navigation";
import { isSeatTaken } from "../utils/isSeatTaken";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/utils/apiAddress";
import axios from "axios";
import { useToken } from "@/app/components/TokenContext";
import { useCookies } from "next-client-cookies";

const Page = ({
  params,
  searchParams
}:
  {
    params: { slug: string; };
    searchParams?: { [key: string]: string | undefined; };
  }) => {
  if (searchParams === undefined || searchParams.id === undefined) {
    redirect("/explore");
  }
  if (searchParams.seat === undefined) {
    redirect("/tickets" + searchParams.id);
  }
  useEffect(() => {

    const interval = setInterval(async () => {
      if (searchParams === undefined || searchParams.id === undefined || searchParams.seat === undefined) {
        alert("Someone else bought the ticket try buying another one");
        redirect("/explore");
      }
      const seatTaken = await isSeatTaken(searchParams.id, searchParams.seat);
      if (seatTaken) {
        redirect("/tickets?id=" + searchParams.id);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [searchParams]);

  const cookies = useCookies();
  const token = cookies.get("token");


  const [discount, setDiscount] = useState("NORMAL");
  if (!token) return;
  if (token === undefined) {
    alert("You need to be logged in to buy a ticket");
    redirect("/login");
  }

  const handleBuyTicket = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchParams === undefined || searchParams.id === undefined || searchParams.seat === undefined) {
      alert("Someone else bought the ticket try buying another one");
      redirect("/explore");
    }
    const seatTaken = await isSeatTaken(searchParams.id, searchParams.seat);
    if (seatTaken) {
      alert("Someone else bought the ticket try buying another one");
      redirect("/explore");
    }
    await axios.post(api + "/api/v1/tickets/buy",
      { screeningId: searchParams.id, seatId: searchParams.seat, discount: discount },
      {
        headers: {
          Authorization: "Bearer " + token,
        }
      }
    );
    console.log("Ticket bought");
  };

  return (
    <div>
      <h1>Page</h1>
      <p>Query parameters: {searchParams.seat}</p>
      <form onSubmit={(e) => handleBuyTicket(e)}>
        <label htmlFor="discount">Choose your discount</label>
        <select id="discount" className="select select-primary" required value={discount} onChange={e => setDiscount(e.target.value)}>
          <option value={"NORMAL"}>None</option>
          <option value={"STUDENT"}>Student</option>
          <option value={"SENIOR"}>Senior</option>
          <option value={"CHILD"}>Child</option>
        </select>
        <button type="submit" className="btn btn-primary">Buy Ticket</button>
      </form>
    </div>
  );
};


export default Page;