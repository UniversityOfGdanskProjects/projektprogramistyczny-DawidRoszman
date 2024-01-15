"use client";
import React, { useContext, useEffect, useState } from "react";
import { useToken } from "../components/TokenContext";
import { Ticket, User } from "@/types/types";
import fetchUser from "@/utils/fetchUserData";
import axios from "axios";
import { TicketsContext, UserContext } from "./context";
import GoBackBtn from "@/components/GoBackBtn";
import { api } from "@/utils/apiAddress";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const token = useToken();
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token === null) return;
    if (token.token === "") {
      return;
    }
    const fetchU = async () => {
      const userData = await fetchUser(token.token);
      setUser(userData);
    };
    const fetchTickets = async () => {
      const tickets = await axios.get(api + "/api/v1/tickets/get", {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      });
      setTickets(tickets.data);
      console.log(tickets.data);
    };
    fetchTickets();
    fetchU();
  }, [token]);

  if (token === null) return <div>Unauthorized</div>;
  if (token.token === "") return <div>Unauthorized</div>;
  if (user === null) return <div>Loading...</div>;
  if (tickets === null) return <div>Loading...</div>;
  return (
    <UserContext.Provider value={user}>
      <TicketsContext.Provider value={tickets}>
        <GoBackBtn />
        {children}
      </TicketsContext.Provider>
    </UserContext.Provider>
  );
};

export default AccountLayout;

