import React from "react";

import Link from "next/link";
import { agent } from "@/utils/httpsAgent";
import axios from "axios";

const navMenu = async () => {
  const token = sessionStorage.getItem("token");
  const user = await axios.get(
    "https://pi.dawidroszman.eu:8080/api/v1/user/get-info",
    { httpsAgent: agent },
  );
  return (
    <nav className="flex justify-between w-screen px-3 py-5 bg-gray-700">
      <div>
        <strong className="text-2xl">Cinema</strong>
      </div>
      <div className="flex gap-4">
        {user ? (
          <div></div>
        ) : (
          <>
            <Link className="btn btn-primary" href="/login">
              Log In
            </Link>
            <Link className="btn btn-primary" href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default navMenu;
