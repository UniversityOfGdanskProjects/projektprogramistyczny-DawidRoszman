import {
  Dispatch,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import axios from "axios";
import { Action, ScreeningReducer, Type } from "./screeningReducer";
import { Screening } from "@/types/types";
import { api } from "@/utils/apiAddress";

export const ScreeningContext = createContext<Screening[] | null>(null);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function useScreening() {
  return useContext(ScreeningContext);
}
export function useScreeningDispatch() {
  return useContext(DispatchContext);
}

export function ScreeningProvider({ children }: any) {
  const [screening, dispatch] = useReducer(ScreeningReducer, []);

  useEffect(() => {
    if (screening.length !== 0) return;
    axios.get(api + "/api/v1/cinema/screenings").then((response) => {
      const screenings = response.data;
      dispatch({
        type: Type.SET_SCREENING,
        payload: screenings,
      });
    });
  }, [screening.length]);

  return (
    <ScreeningContext.Provider value={screening}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </ScreeningContext.Provider>
  );
}
