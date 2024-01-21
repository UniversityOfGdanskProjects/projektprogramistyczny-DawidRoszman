"use client";

import { useEffect, useState } from "react";
import fetchUserData from "@/utils/fetchUserData";
import { User } from "@/types/types";
import GoHome from "@/components/GoHome";
import { useToken } from "../components/TokenContext";
import Link from "next/link";

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const token = useToken();
  useEffect(() => {
    if (token === null || token.token === "" || token.token === null) return;
    const fetchUser = async () => {
      if (token.token === null) return;
      const userData = await fetchUserData(token.token);
      setUser(userData);
    };
    fetchUser();
  }, [token]);
  return (
    <div>
      <div className="">
        <GoHome />
      </div>
      <div className="text-center pt-10">
        <h1 className="text-5xl">
          Welcome to admin page {user !== null ? user.firstName : ""}
        </h1>
        <div className="flex gap-3 justify-center p-4">
          <Link className="btn btn-outline btn-primary" href="/admin/movie">
            Movies
          </Link>
          <Link className="btn btn-outline btn-primary" href="/admin/screening">
            Screenings
          </Link>
          <Link className="btn btn-outline btn-primary" href="/admin/report">
            Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
