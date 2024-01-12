"use client";
import { Screening } from "@/types/types";
import React from "react";
import { useScreening, useScreeningDispatch } from "./ScreeningContext";
import { Type } from "./screeningReducer";

const ScreeningList = ({
  setSelectedScreening: setSelectedMovie,
  token,
}: {
  setSelectedScreening: React.Dispatch<React.SetStateAction<Screening | null>>;
  token: string;
}) => {
  const screenings: Screening[] | null = useScreening();
  const dispatch = useScreeningDispatch();
  if (!dispatch) return null;
  const handleRemove = async (screening: Screening) => {
    const ans = prompt(
      `Are you sure you want to remove this screening? Type "yes" if you want to remove movie`,
    );
    if (ans !== "yes") return;
    try {
      // await removeMovie({ movie: movie, token });
      dispatch({
        type: Type.REMOVE_SCREENING,
        payload: {
          token: token,
          screening: screening,
        },
      });
      alert("Screening removed");
    } catch (err) {
      alert(err);
    }
  };
  if (!screenings) return <div>No movies to show</div>;
  return (
    <div className="grid lg:grid-cols-2 gap-3 p-4">
      {screenings.map((screening) => {
        return (
          <div className="join" key={screening.id}>
            <div className="h-[3rem] border border-neutral-content p-2 grid place-items-center justify-center join-item">
              <div>{screening.id}</div>
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
  );
};

export default ScreeningList;
