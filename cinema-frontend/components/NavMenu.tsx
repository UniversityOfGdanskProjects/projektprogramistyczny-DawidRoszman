import React from "react";

import Link from "next/link";

const navMenu = () => {
  return (
    <nav className="flex justify-between w-screen px-3 py-5 bg-gray-300">
      <div>
        <strong className="text-2xl">Cinema</strong>
      </div>
      <div className="flex gap-4">
        <Link className="btn btn-primary" href="/login">
          Log In
        </Link>
        <Link className="btn btn-primary" href="/register">Register</Link>
      </div>
    </nav>
  );
};

export default navMenu;
