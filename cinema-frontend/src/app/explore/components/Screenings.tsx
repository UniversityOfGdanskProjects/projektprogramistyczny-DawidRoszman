"use client";
import React from "react";
import ScreeningsView from "./ScreeningsView";
import { Screening } from "@/types/types";
import ScreeningsFilter from "./ScreeningsFilter";
import Pagination from "./Pagination";

export default function Screenings({
  screenings,
}: {
  screenings: Screening[];
}) {
  const [filter, setFilter] = React.useState<Date | null>(null);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(6);
  return (
    <>
      <ScreeningsFilter filter={filter} setFilter={setFilter} />
      <ScreeningsView screenings={screenings} filter={filter} page={page} limit={limit} />
      <Pagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} screeningsNum={screenings.length} />
    </>
  );
}
