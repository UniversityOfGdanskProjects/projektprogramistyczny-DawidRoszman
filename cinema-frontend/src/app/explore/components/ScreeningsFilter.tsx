"use client";
import { formatDateForInput } from "@/utils/formatDateForInput";
import React from "react";

const ScreeningsFilter = ({
  filter,
  setFilter,
}: {
  filter: Date | null;
  setFilter: (filter: Date | null) => void;
}) => {
  return (
    <>
    <input
      className="m-3 input input-bordered"
      type="date"
      value={filter?.toISOString().slice(0, 10) ?? ""}
      onChange={(e) => setFilter(new Date(e.target.value))}
    />
    <input type="button" className="btn btn-primary" value="Clear" onClick={() => setFilter(null)} />
    </>
  );
};

export default ScreeningsFilter;
