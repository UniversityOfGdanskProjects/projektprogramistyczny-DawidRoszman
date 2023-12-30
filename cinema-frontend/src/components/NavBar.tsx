"use client";
import axios from "axios";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { User } from "../../types/types";

function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    const fetchUser = async () => {
      if (token !== null) {
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
    <nav className="bg-neutral p-4 flex justify-between items-center">
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
                sessionStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Sign out
            </button>
          </div>
        </Suspense>
      ) : (
        <div className="flex space-x-4">
          <Link className="text-white" href="/login">
            Login
          </Link>
          <Link className="text-white" href="/register">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
