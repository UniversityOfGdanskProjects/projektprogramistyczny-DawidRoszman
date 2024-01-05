"use client";

import { agent } from "@/utils/httpsAgent";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import fetchUserData from "@/utils/fetchUserData";
import { User } from "@/types/types";

const page = () => {
  const cookieStore = useCookies();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = cookieStore.get("token");
    if (token === undefined) {
      redirect("/login");
    }
    const checkIfIsValid = async () => {
      const response = await axios.get(
        "https://pi.dawidroszman.eu:8080/api/v1/user/is-admin",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          httpsAgent: agent,
        },
      );
      const isAdmin = response.data;
      console.log(isAdmin);
      setIsAdmin(isAdmin);
    };
    checkIfIsValid();
    const fetchUser = async () => {
      const userData = await fetchUserData(token);
      setUser(userData);
    };
    fetchUser();
  }, [cookieStore]);

  if (!isAdmin) {
    return <div>Unauthorized</div>;
  }
  return <div>Welcome to admin page {user !== null ? user.firstName : ""}</div>;
};

export default page;
