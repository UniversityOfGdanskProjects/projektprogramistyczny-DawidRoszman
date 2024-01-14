"use client";
import { Screening } from "@/types/types";
import React from "react";
import { useScreening, useScreeningDispatch } from "./ScreeningContext";
import { Type } from "./screeningReducer";
import { formatDateForView } from "@/utils/formatDateForView";
import { removeScreening } from "./screeningUtils";
import Search from "../components/Search";
import { useToken } from "@/app/components/TokenContext";
import Sort from "./Sort";

const ScreeningList = ({
  setSelectedScreening: setSelectedMovie,
}: {
  setSelectedScreening: React.Dispatch<React.SetStateAction<Screening | null>>;
}) => {
  const screenings: Screening[] | null = useScreening();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sort, setSort] = React.useState<string>("asc");
  const dispatch = useScreeningDispatch();
  const token = useToken();
  if (!dispatch || !token) return null;
  const handleRemove = async (screening: Screening) => {
    const ans = prompt(
      `Are you sure you want to remove this screening? Type "yes" if you want to remove movie`,
    );
    if (ans !== "yes") return;
    try {
      await removeScreening({ screening: { id: screening.id }, token: token.token });
      dispatch({
        type: Type.REMOVE_SCREENING,
        payload: screening,
      });
      alert("Screening removed");
    } catch (err) {
      alert(err);
    }
  };
  if (!screenings) return <div>No screenings to show</div>;
  return (
    <div>
      <div className="flex">
      <Search  search={searchTerm} setSearch={setSearchTerm} />
      <Sort sort={sort} setSort={setSort} />
      </div>
      <div className="grid lg:grid-cols-2 gap-3 p-4">
        {screenings
          .filter((screening) => screening.movie.title.includes(searchTerm))
          .sort((a, b) => {
            if (sort === "asc") {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
          }
          )
          .map((screening) => {
            return (
              <div className="join" key={screening.id}>
                <div className="h-[3rem] border border-neutral-content p-2 grid place-items-center justify-center join-item">
                  <div>
                    {screening.movie.title}-
                    {formatDateForView(new Date(screening.date))}-
                    {screening.auditorium.number}
                  </div>
                </div>
                <button
                  className="join-item btn btn-outline btn-success"
                  onClick={() => {
                    setSelectedMovie(screening);
                  }}
                >
                  Modify
                </button>
                <button
                  className="join-item btn btn-outline btn-error"
                  onClick={() => handleRemove(screening)}
                >
                  Remove
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ScreeningList;
