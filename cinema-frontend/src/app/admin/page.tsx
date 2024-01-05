"use client";

import { agent } from "@/utils/httpsAgent";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const cookieStore = useCookies();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = cookieStore.get("token");
    if (token === undefined) {
      redirect("/login");
    }
    const checkIfIsValid = async () => {
      const response = await axios.get(
        "https://pi.dawidroszman.eu:8080/api/v1/auth/is-admin",
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
  }, [cookieStore]);

  if (!isAdmin) {
    return <div>Unauthorized</div>;
  }
};

export default page;
