"use client";
import Link from "next/link";
import React from "react";

export default function GoHome() {
  return (
    <Link href="/explore" className="btn btn-primary w-24 absolute m-3">
      Go Home
    </Link>
  );
}
