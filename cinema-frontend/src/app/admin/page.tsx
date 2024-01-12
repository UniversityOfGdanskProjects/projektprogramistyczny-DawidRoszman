"use client";

import { agent } from "@/utils/httpsAgent";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import fetchUserData from "@/utils/fetchUserData";
import { User } from "@/types/types";
import Loading from "@/components/Loading";
import Movie from "./components/movie/Movie";
import { checkIfIsAdmin } from "@/utils/checkIfIsAdmin";
import GoHome from "@/components/GoHome";

const Page = () => {
  const cookieStore = useCookies();
  const [isAdmin, setIsAdmin] = useState(null);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    const token = cookieStore.get("token");
    if (token === undefined) {
      redirect("/login");
    }
    setToken(token);
    const checkIfIsValid = async () => {
      const isAdmin = await checkIfIsAdmin(token);
      setIsAdmin(isAdmin);
    };
    checkIfIsValid();
    const fetchUser = async () => {
      const userData = await fetchUserData(token);
      setUser(userData);
    };
    fetchUser();
  }, [cookieStore]);

  if (isAdmin === null || token === undefined) {
    return <Loading />;
  }

  if (!isAdmin) {
    return <div className="text-5xl text-center">Unauthorized</div>;
  }
  return (
    <div>
      <div className="">
        <GoHome />
      </div>
      <div className="text-center pt-10">
        <h1 className="text-5xl">
          Welcome to admin page {user !== null ? user.firstName : ""}
        </h1>
      </div>
      <div>
        <Movie token={token} />
      </div>
    </div>
  );
};

export default Page;
