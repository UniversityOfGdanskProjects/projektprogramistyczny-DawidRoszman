"use client";
import axios from "axios";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { User } from "../../types/types";
import { useCookies } from "next-client-cookies";

function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const cookieStore = useCookies();

  useEffect(() => {
    setToken(cookieStore.get("token"));
    const fetchUser = async () => {
      if (token !== undefined) {
        const userData = await axios.get(
          "https://pi.dawidroszman.eu:8080/api/v1/user/get-info",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );

        setUser(userData.data);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <nav className="bg-base-200 p-4 flex justify-between items-center">
      <h1 className="text-white font-bold">Cinema</h1>
      {token ? (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="text-white flex justify-center items-center gap-3">
            <div>
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
        </Suspense>
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
    </nav>
  );
}

export default NavBar;
