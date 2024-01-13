"use client";

import { useEffect, useState } from "react";
import fetchUserData from "@/utils/fetchUserData";
import { User } from "@/types/types";
import Loading from "@/components/Loading";
import { checkIfIsAdmin } from "@/utils/checkIfIsAdmin";
import GoHome from "@/components/GoHome";
import { useToken } from "../components/TokenContext";
import Link from "next/link";

const Page = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [user, setUser] = useState<User | null>(null);
  const token = useToken();
  useEffect(() => {
    if (token === null) return;
    if (token.token === "") {
      return
    }
    const checkIfIsValid = async () => {
      const isAdmin = await checkIfIsAdmin(token.token);
      setIsAdmin(isAdmin);
    };
    checkIfIsValid();
    const fetchUser = async () => {
      const userData = await fetchUserData(token.token);
      setUser(userData);
    };
    fetchUser();
  }, [token]);

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
        <div className="flex gap-3 justify-center p-4">
          <Link className="btn btn-outline btn-primary" href="/admin/movie">
            Movies
            </Link>
            <Link className="btn btn-outline btn-primary" href="/admin/screening">
            Screenings
            </Link>
                  </div>
      </div>
          </div>
  );
};

export default Page;
