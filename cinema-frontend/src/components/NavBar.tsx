"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { User } from "@/types/types";
import fetchUserData from "@/utils/fetchUserData";
import ThemeToggler from "./ThemeToggler";

function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const cookieStore = useCookies();

  useEffect(() => {
    setToken(cookieStore.get("token"));
    const fetchUser = async () => {
      if (token !== undefined) {
        setUser(await fetchUserData(token));
      }
    };

    fetchUser();
  }, [token, cookieStore]);

  return (
    <nav className="bg-base-200 p-4 px-10 flex justify-between items-center">
      <h1 className="font-bold">Cinema</h1>
      <div className="flex gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {token ? (
            <div className="flex justify-center items-center gap-3">
              <div className="text-base-conent">
                {user?.firstName} {user?.lastName}
              </div>
              <button
                className="btn btn-warning"
                onClick={() => {
                  cookieStore.remove("token");
                  window.location.reload();
                }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link className="btn btn-primary" href="/login">
                Login
              </Link>
              <Link className="btn btn-primary" href="/register">
                Register
              </Link>
            </div>
          )}
        </Suspense>
        <ThemeToggler />
      </div>
    </nav>
  );
}

export default NavBar;
